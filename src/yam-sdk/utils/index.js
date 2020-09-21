import {ethers} from 'ethers'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  }
};

export const getPoolStartTime = async (poolContract) => {
  return await poolContract.methods.starttime().call()
}

export const stake = async (yam, amount, account, onTxHash) => {
  const poolContract = yam.contracts.yycrv_pool
  let now = new Date().getTime() / 1000;
  // const gas = GAS_LIMIT.STAKING[tokenName.toUpperCase()] || GAS_LIMIT.STAKING.DEFAULT;
  const gas = GAS_LIMIT.STAKING.DEFAULT
  if (now >= 1597172400) {
    return poolContract.methods
      .stake((new BigNumber(amount).times(new BigNumber(10).pow(18))).toString())
      .send({ from: account, gas }, async (error, txHash) => {
        if (error) {
            onTxHash && onTxHash('')
            console.log("Staking error", error)
            return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(yam.web3.eth, txHash)
        if (!status) {
          console.log("Staking transaction failed.")
          return false
        }
        return true
      })
  } else {
    alert("pool not active");
  }
}

export const unstake = async (yam, amount, account, onTxHash) => {
  const poolContract = yam.contracts.yycrv_pool
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .withdraw((new BigNumber(amount).times(new BigNumber(10).pow(18))).toString())
      .send({ from: account, gas: 200000 }, async (error, txHash) => {
        if (error) {
            onTxHash && onTxHash('')
            console.log("Unstaking error", error)
            return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(yam.web3.eth, txHash)
        if (!status) {
          console.log("Unstaking transaction failed.")
          return false
        }
        return true
      })
  } else {
    alert("pool not active");
  }
}

export const harvest = async (yam, account, onTxHash) => {
  const poolContract = yam.contracts.yycrv_pool
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .getReward()
      .send({ from: account, gas: 200000 }, async (error, txHash) => {
        if (error) {
            onTxHash && onTxHash('')
            console.log("Harvest error", error)
            return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(yam.web3.eth, txHash)
        if (!status) {
          console.log("Harvest transaction failed.")
          return false
        }
        return true
      })
  } else {
    alert("pool not active");
  }
}

export const redeem = async (yam, account, onTxHash) => {
  const poolContract = yam.contracts.yycrv_pool
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .exit()
      .send({ from: account, gas: 400000 }, async (error, txHash) => {
        if (error) {
            onTxHash && onTxHash('')
            console.log("Redeem error", error)
            return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(yam.web3.eth, txHash)
        if (!status) {
          console.log("Redeem transaction failed.")
          return false
        }
        return true
      })
  } else {
    alert("pool not active");
  }
}

export const approve = async (tokenContract, poolContract, account) => {
  return tokenContract.methods
    .approve(poolContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account, gas: 80000 })
}

export const getPoolContracts = async (yam) => {
  const pools = Object.keys(yam.contracts)
    .filter(c => c.indexOf('_pool') !== -1)
    .reduce((acc, cur) => {
      const newAcc = { ...acc }
      newAcc[cur] = yam.contracts[cur]
      return newAcc
    }, {})
  return pools
}

export const getEarned = async (yam, pool, account) => {
  const scalingFactor = new BigNumber(await yam.contracts.yamV3.methods.yamsScalingFactor().call())
  const earned = new BigNumber(await pool.methods.earned(account).call())
  return earned.multipliedBy(scalingFactor.dividedBy(new BigNumber(10).pow(18)))
}

export const getStaked = async (yam, pool, account) => {
  return yam.toBigN(await pool.methods.balanceOf(account).call())
}

export const getCurrentPrice = async (yam) => {
  // FORBROCK: get current YAM price
  return new BigNumber(await yam.contracts.rebaser.methods.getCurrentTWAP().call())
}

export const getTargetPrice = async (yam) => {
  return yam.toBigN(1).toFixed(2);
}

export const getCirculatingSupply = async (yam) => {
  let now = await yam.web3.eth.getBlock('latest');
  let scalingFactor = yam.toBigN(await yam.contracts.yamV3.methods.yamsScalingFactor().call());
  let starttime = yam.toBigN(await yam.contracts.eth_pool.methods.starttime().call()).toNumber();
  let timePassed = now["timestamp"] - starttime;
  if (timePassed < 0) {
    return 0;
  }
  let yamsDistributed = yam.toBigN(8 * timePassed * 250000 / 625000); //yams from first 8 pools
  let starttimePool2 = yam.toBigN(await yam.contracts.ycrv_pool.methods.starttime().call()).toNumber();
  timePassed = now["timestamp"] - starttime;
  let pool2Yams = yam.toBigN(timePassed * 1500000 / 625000); // yams from second pool. note: just accounts for first week
  let circulating = pool2Yams.plus(yamsDistributed).times(scalingFactor).dividedBy(10**36).toFixed(2)
  return circulating
}

export const getNextRebaseTimestamp = async (yam) => {
  try {
    let now = await yam.web3.eth.getBlock('latest').then(res => res.timestamp);
    let interval = 43200; // 12 hours
    let offset = 28800; // 8am/8pm utc
    let secondsToRebase = 0;
    if (await yam.contracts.rebaser.methods.rebasingActive().call()) {
      if (now % interval > offset) {
          secondsToRebase = (interval - (now % interval)) + offset;
       } else {
          secondsToRebase = offset - (now % interval);
      }
    } else {
      let twap_init = yam.toBigN(await yam.contracts.rebaser.methods.timeOfTWAPInit().call()).toNumber();
      if (twap_init > 0) {
        let delay = yam.toBigN(await yam.contracts.rebaser.methods.rebaseDelay().call()).toNumber();
        let endTime = twap_init + delay;
        if (endTime % interval > offset) {
            secondsToRebase = (interval - (endTime % interval)) + offset;
         } else {
            secondsToRebase = offset - (endTime % interval);
        }
        return endTime + secondsToRebase;
      } else {
        return now + 13*60*60; // just know that its greater than 12 hours away
      }
    }
    return secondsToRebase
  } catch (e) {
    console.log(e)
  }
}

export const getTotalSupply = async (yam) => {
  return await yam.contracts.yam.methods.totalSupply().call();
}

export const getStats = async (yam) => {
  const curPrice = await getCurrentPrice(yam)
  const circSupply = await getCirculatingSupply(yam)
  const nextRebase = await getNextRebaseTimestamp(yam)
  const targetPrice = await getTargetPrice(yam)
  const totalSupply = await getTotalSupply(yam)
  return {
    circSupply,
    curPrice,
    nextRebase,
    targetPrice,
    totalSupply
  }
}

export const vote = async (yam, account) => {
  return yam.contracts.gov.methods.castVote(0, true).send({ from: account })
}

export const delegate = async (yam, account) => {
  return yam.contracts.yam.methods.delegate("0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84").send({from: account, gas: 320000 })
}

export const didDelegate = async (yam, account) => {
  return await yam.contracts.yam.methods.delegates(account).call() === '0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84'
}

export const getVotes = async (yam) => {
  const votesRaw = new BigNumber(await yam.contracts.yam.methods.getCurrentVotes("0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84").call()).dividedBy(10**24)
  return votesRaw
}

export const getScalingFactor = async (yam) => {
  return new BigNumber(await yam.contracts.yamV3.methods.yamsScalingFactor().call())
}

export const getDelegatedBalance = async (yam, account) => {
  return new BigNumber(await yam.contracts.yam.methods.balanceOfUnderlying(account).call()).dividedBy(10**24)
}

export const migrate = async (yam, account) => {
  return yam.contracts.yamV2migration.methods.migrate().send({ from: account, gas: 320000 })
}

export const getMigrationEndTime = async (yam) => {
  return yam.toBigN(await yam.contracts.yamV2migration.methods.startTime().call()).plus(yam.toBigN(86400*3)).toNumber()
}

export const getV2Supply = async (yam) => {
  return new BigNumber(await yam.contracts.yamV2.methods.totalSupply().call())
}

export const migrationStarted = async (yam) => {
  let now = new Date().getTime() / 1000; // get current time
  let startTime = await yam.contracts.migrator.methods.startTime().call();
  let token_initialized = await yam.contracts.migrator.methods.token_initialized().call();
  let delegatorRewardsSet = await yam.contracts.migrator.methods.delegatorRewardsSet().call();
  if (now >= startTime && token_initialized && delegatorRewardsSet) {
    return true;
  }
  return false;
}

export const currVested = async (yam, account) => {
  let BASE = new BigNumber(10).pow(24);

  let vested = new BigNumber(await yam.contracts.migrator.methods.vested(account).call()).dividedBy(BASE);
  return vested;
}

export const currUnclaimedDelegatorRewards = async (yam, account) => {
  let BASE = new BigNumber(10).pow(24);

  let start = new BigNumber(1600444800);
  let duration = new BigNumber(90 * 86400);
  let now = new BigNumber(new Date().getTime() / 1000);
  let percDone = now.minus(start).dividedBy(duration);
  if (percDone.gt(1)) {
    percDone = new BigNumber(1)
  }
  let totalVesting = new BigNumber(await yam.contracts.migrator.methods.delegator_vesting(account).call());
  let claimed = new BigNumber(await yam.contracts.migrator.methods.delegator_claimed(account).call());
  let unclaimed = ((totalVesting.multipliedBy(percDone)).minus(claimed)).dividedBy(BASE);
  return unclaimed;
}

export const currUnclaimedMigratorVesting = async (yam, account) => {
  let BASE = new BigNumber(10).pow(24);

  let start = new BigNumber(1600444800);
  let duration = new BigNumber(30 * 86400);
  let now = new BigNumber(new Date().getTime() / 1000);
  let percDone = now.minus(start).dividedBy(duration);
  if (percDone.gt(1)) {
    percDone = new BigNumber(1)
  }
  let totalVesting = new BigNumber(await yam.contracts.migrator.methods.vesting(account).call());
  let claimed = new BigNumber(await yam.contracts.migrator.methods.claimed(account).call());
  let unclaimed = ((totalVesting.multipliedBy(percDone)).minus(claimed)).dividedBy(BASE);
  return unclaimed;
}

export const delegatorRewards = async (yam, account) => {
  let BASE = new BigNumber(10).pow(24);

  let rewards = new BigNumber(await yam.contracts.migrator.methods.delegator_vesting(account).call()).dividedBy(BASE);
  return rewards;
}

export const migrateV3 = async (yam, account, onTxHash) => {
    return await yam.contracts.migrator.methods.migrate()
      .send({from: account, gas: 200000}, async (error, txHash) => {
        if (error) {
            onTxHash && onTxHash('')
            console.log("Migration error", error)
            return false
        }
        onTxHash && onTxHash(txHash)
        const status = await waitTransaction(yam.web3.eth, txHash)
        if (!status) {
          console.log("Migration transaction failed.")
          return false
        }
        return true
      })
}

export const claimVested = async (yam, account, onTxHash) => {
  return await yam.contracts.migrator.methods.claimVested().send({from: account, gas: 140000});
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const waitTransaction = async (provider, txHash) => {
  const web3 = new Web3(provider)
  let txReceipt = null
  while (txReceipt === null) {
    const r = await web3.eth.getTransactionReceipt(txHash)
    txReceipt = r
    await sleep(2000)
  }
  return (txReceipt.status)
}
