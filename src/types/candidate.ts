export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  skills: string[]
  experience: number
  position?: string
  status?: "Active" | "Inactive" | "Interview"
}

export interface CandidateFormData {
  name: string
  email: string
  phone: string
  skills: string
  experience: number
  position: string
  status: "Active" | "Inactive" | "Interview"
}
