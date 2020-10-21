import React from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'

import {
  Box,
  Button,
  Card,
  CardContent,
} from 'react-neu'
import styled from 'styled-components'

import useFarming from 'hooks/useFarming'
import Dial from 'components/Dial'
import Label from 'components/Label'

const FarmingTimer: React.FC = () => {
  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span>{paddedHours}:{paddedMinutes}:{paddedSeconds}</span>
    )
  }

  const {
    countdown,
    farmingStartTime,
  } = useFarming()

  const releaseDate = new Date(farmingStartTime);
  const milliseconds = 1000;
  const seconds = 60;
  const minutes = 60;
  const hours = 24;
  const percentageMultiplier = 100;
  const isLaunched = countdown && countdown < 0;
  const labelText = isLaunched ? 'INDEX Farming Is Live!' : 'INDEX Farming Launch'

  // This will start counting down 24 hours before the release time
  const dialValue = (farmingStartTime - Date.now()) / (milliseconds * seconds * minutes * hours) * percentageMultiplier;

  return (
    <Card>
      <CardContent>
        <Box alignItems="center" column justifyContent="center">
          {isLaunched ? (
            <>
              <StyledIcon
                alt="Owl icon"
                src="https://index-dao.s3.amazonaws.com/farmer_owl.png"
              />
              <h3>🎉🌾 INDEX Farming Is Live! 🌾🎉</h3>
            </>
          ) : (
              <Dial size={196} value={dialValue}>
                <StyledCountdown>
                  <StyledCountdownText>
                    {isLaunched ? '🎉' : (
                      <Countdown date={releaseDate} renderer={renderer} />
                    )}
                  </StyledCountdownText>
                  <Label text={labelText} />
                </StyledCountdown>
              </Dial>
            )
          }
        </Box>
        <Button text='Start Farming' to='/farm' />

      </CardContent>
    </Card>
  )
}

const StyledCountdown = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCountdownText = styled.span`
  color: ${props => props.theme.colors.primary.light};
  font-size: 36px;
  font-weight: 700;
`

const StyledIcon = styled.img`
  height: 78px;
  text-align: center;
  min-width: 58px;
`

export default FarmingTimer
