import axios from 'axios'

const BASE_URL =
  process.env.REACT_APP_SNAPSHOT_URL || 'https://hub.snapshot.page/api'
const INDEX_PROPOSALS_PATH = 'index/proposals'

export const fetchIndexProposals = () => {
  const indexProposalsUrl = `${BASE_URL}/${INDEX_PROPOSALS_PATH}`

  return axios
    .get(indexProposalsUrl)
    .then((response) => {
      return response
    })
    .catch((error) => console.log(error))
}
