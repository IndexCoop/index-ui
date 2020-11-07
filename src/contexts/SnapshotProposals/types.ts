export type SnapshotPayload = {
  end: number
  body: string
  name: string
  start: number
  choices: string[]
  metadata: any
  snapshot: string
}

export type SnapshotMessage = {
  version: string
  timestamp: string // unix timestamp
  space: string
  type: string
  payload: SnapshotPayload
}

export type SnapshotProposal = {
  address: string
  msg: SnapshotMessage
  sig: string
  authorIpfsHash: string
  relayerIpfsHash: string
}

export interface SnapshotProposalsContextValues {
  indexProposals: { [proposalId: string]: SnapshotProposal }
}
