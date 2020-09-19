import React from 'react'

import Countdown, { CountdownRenderProps} from 'react-countdown'
import {
  Box,
  Button,
  Notice,
  NoticeContent,
  NoticeIcon,
  Spacer,
} from 'react-neu'

import useFarming from 'hooks/useFarming'

const FarmingNotice: React.FC = () => {
  const { countdown } = useFarming()
  const renderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span>{paddedHours}:{paddedMinutes}:{paddedSeconds}</span>
    )
  }

  const canFarm = countdown && countdown <= 0
  let NoticeText: React.ReactNode
  if (canFarm) {
    NoticeText = (
      <span>Farming is now live!</span>
    )
  } else {
    NoticeText = (
      <>
        Farming begins in
        <Spacer size="sm" />
        <Countdown date={1600545600 * 1000} renderer={renderer} />
      </>
    )
  }
  return (
    <Notice>
      <NoticeIcon>🧑‍🌾</NoticeIcon>
      <NoticeContent>
        <Box
          alignItems="center"
          row
          flex={1}
        >
          {NoticeText}
        </Box>
        <Button
          text="Farm"
          to="/farm"
          variant={canFarm ? 'default' : 'secondary'}
        />
      </NoticeContent>
    </Notice>
  )
}

export default FarmingNotice