import type { Candidate } from "../types/candidate"
import CandidateCard from "./candidate-card"

interface CandidateGridProps {
  candidates: Candidate[]
  onEdit: (candidate: Candidate) => void
}

export default function CandidateGrid({
  candidates,
  onEdit,
}: CandidateGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidates.map(candidate => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
