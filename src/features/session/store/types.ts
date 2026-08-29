export interface DisputeParticipant {
  id: string
  firstname: string
  lastname: string
  avatar: string | null
}

export type DisputeOutcome = 'REFUNDED' | 'RELEASED'

export interface SessionDispute {
  id: string
  sessionId: string
  reason: string
  raisedAt: string
  outcome: DisputeOutcome | null
  reviewedAt: string | null
  reviewNote: string | null
}

export interface DisputedAmount {
  amount: number
  currency: string
}

export interface DisputedSessionBooking {
  startTime: string
  endTime: string
}

export interface DisputedSession {
  id: string
  proposalId: string
  sessionNumber: number
  title: string
  objective: string | null
  status: string
  createdAt: string
  updatedAt: string
  dispute: SessionDispute | null
  booking: DisputedSessionBooking | null
  proposal: {
    tutor: DisputeParticipant
    learnRequest: {
      title: string
      learner: DisputeParticipant
    }
  }
  disputedAmount: DisputedAmount | null
}
