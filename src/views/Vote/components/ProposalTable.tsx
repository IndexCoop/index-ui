import React from 'react'
import styled from 'styled-components'
import { Spacer } from 'react-neu'
import useSnapshotProposals from 'hooks/useSnapshotProposals'

const SNAPSHOT_INDEX_PROPOSAL_BASE = 'https://snapshot.page/#/index/proposal'

interface StyledButtonProps {
  readonly isActive: boolean
}

interface StyledColumnProps {
  readonly isActive?: boolean
}

const ProposalTable: React.FC = () => {
  const { indexProposals = {} } = useSnapshotProposals()
  const currentTime = Math.round(new Date().getTime() / 1000)
  const proposalIds = Object.keys(indexProposals)

  return (
    <div>
      <StyledTable>
        <StyledBackground />
        <StyledProposalTableHeader>
          <StyledColumnHeader style={{ width: '60%' }}>
            Description
          </StyledColumnHeader>
          <StyledColumnHeader style={{ width: '20%' }}>
            State
          </StyledColumnHeader>
          <StyledColumnHeader style={{ width: '20%' }}>
            Action
          </StyledColumnHeader>
        </StyledProposalTableHeader>
        <Spacer size='md' />
        {proposalIds.length === 0 && (
          <StyledEmptyMessage>No proposals yet</StyledEmptyMessage>
        )}
        {proposalIds.map((id, i) => {
          const isActive =
            indexProposals[id]?.msg?.payload?.start <= currentTime &&
            currentTime <= indexProposals[id]?.msg?.payload?.end
          const isExecuted = indexProposals[id]?.msg?.payload?.end < currentTime

          return (
            <>
              <StyledColumnRow>
                <StyledColumn style={{ width: '60%' }}>
                  {indexProposals[id].msg.payload.name}
                </StyledColumn>
                <StyledColumn style={{ width: '20%' }} isActive={isActive}>
                  {isActive && 'Active'}
                  {isExecuted && 'Executed'}
                </StyledColumn>
                <StyledColumn style={{ width: '20%' }}>
                  <StyledButton
                    onClick={() => {
                      window.open(
                        `${SNAPSHOT_INDEX_PROPOSAL_BASE}/${id}`,
                        '_blank'
                      )
                    }}
                    isActive={isActive}
                  >
                    View
                  </StyledButton>
                </StyledColumn>
              </StyledColumnRow>
              {i !== proposalIds.length - 1 ? (
                <StyledDivider />
              ) : (
                <Spacer size='md' />
              )}
            </>
          )
        })}
      </StyledTable>
    </div>
  )
}

const StyledEmptyMessage = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledButton = styled.div<StyledButtonProps>`
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.green : props.theme.colors.grey[500]};
  border-radius: 15px;
  height: 30px;
  width: 80%;
  font-size: 12px;
  max-width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.colors.green};
  }
`

const StyledDivider = styled.hr`
  width: 90%;
  background-color: ${(props) => props.theme.colors.grey[500]};
  height: 1px;
  border: none;
`

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.2;
  z-index: -1000;
  background-color: ${(props) => props.theme.colors.grey[500]};
`

const StyledProposalTableHeader = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.colors.grey[500]};
  width: 100%;
  display: flex;
`

const StyledColumnHeader = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.textColor};
  padding: 10px 10px 10px 30px;
`

const StyledColumn = styled.div<StyledColumnProps>`
  font-size: 14px;
  font-weight: ${(props) => (props.isActive ? '600' : '400')};
  color: ${(props) =>
    props.isActive ? props.theme.colors.green : props.theme.textColor};
  padding: 5px 10px 5px 30px;
  align-items: center;
  display: flex;
`

const StyledColumnRow = styled.div`
  width: 100%;
  display: flex;
  font-weight: 400;
`

const StyledTable = styled.div`
  color: ${(props) => props.theme.textColor};
  position: relative;
  font-size: 48px;
  font-weight: 700;
  border: 2px solid ${(props) => props.theme.colors.grey[500]};
  border-radius: 8px;
  width: 100%;
  min-height: 100px;
`

export default ProposalTable
