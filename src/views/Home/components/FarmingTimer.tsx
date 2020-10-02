import React from 'react'
import Countdown, { CountdownRenderProps} from 'react-countdown'

import {
  Box,
  Card,
  CardContent,
} from 'react-neu'
import styled from 'styled-components'

import Dial from 'components/Dial'
import Label from 'components/Label'

const FarmingTimer: React.FC = () => {
  const isLaunched = false;

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span>{paddedHours}:{paddedMinutes}:{paddedSeconds}</span>
    )
  }

  const releaseTime = 1602010800000; // Oct 6th, 12pm PDT
  const releaseDate = new Date(releaseTime);
  const milliseconds = 1000;
  const seconds = 60;
  const minutes = 60;
  const hours = 24;
  const percentageMultiplier = 100;

  // This will start counting down 24 hours before the release time
  const dialValue = (releaseTime - Date.now()) / (milliseconds * seconds * minutes * hours) * percentageMultiplier;

  return (
    <Card>
      <CardContent>
        <Box>
          <Dial size={196} value={dialValue}>
            <StyledCountdown>
              <StyledCountdownText>
                {isLaunched ? '--' : (
                  <Countdown date={releaseDate} renderer={renderer} />
                )}
              </StyledCountdownText>
              <Label text="INDEX Farming Launch" />
            </StyledCountdown>
          </Dial>
        </Box>
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

export default FarmingTimer