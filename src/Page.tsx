"use client"

import { useState } from "react"
import type { Candidate, CandidateFormData } from "./types/candidate"
import CandidateTable from "./components/candidate-table"
import CandidateGrid from "./components/candidate-grid"
import SidePanel from "./components/side-panel"
import { Plus, Table, Grid3X3 } from "lucide-react"
import ThemeToggle from "./components/theme-toggle"

// Sample data
const initialCandidates: Candidate[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    skills: ["React", "TypeScript", "Node.js"],
    experience: 5,
    position: "Frontend Developer",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1 (555) 987-6543",
    skills: ["Python", "Django", "PostgreSQL"],
    experience: 3,
    position: "Backend Developer",
    status: "Interview",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1 (555) 456-7890",
    skills: ["Java", "Spring Boot", "AWS"],
    experience: 7,
    position: "Full Stack Developer",
    status: "Active",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1 (555) 321-0987",
    skills: ["UI/UX Design", "Figma", "Adobe Creative Suite"],
    experience: 4,
    position: "UI/UX Designer",
    status: "Inactive",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1 (555) 654-3210",
    skills: ["DevOps", "Docker", "Kubernetes", "CI/CD"],
    experience: 6,
    position: "DevOps Engineer",
    status: "Active",
  },
]

export default function CandidateManagement() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [panelMode, setPanelMode] = useState<"add" | "edit">("add")
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  )

  const handleAddCandidate = () => {
    setPanelMode("add")
    setSelectedCandidate(null)
    setIsPanelOpen(true)
  }

  const handleEditCandidate = (candidate: Candidate) => {
    setPanelMode("edit")
    setSelectedCandidate(candidate)
    setIsPanelOpen(true)
  }

  const handleDeleteCandidate = (id: string) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      setCandidates(prev => prev.filter(candidate => candidate.id !== id))
    }
  }

  const handleSaveCandidate = (formData: CandidateFormData) => {
    if (panelMode === "add") {
      const newCandidate: Candidate = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        skills: formData.skills.split(",").map(skill => skill.trim()),
        experience: formData.experience,
        position: formData.position,
        status: formData.status,
      }
      setCandidates(prev => [...prev, newCandidate])
    } else if (panelMode === "edit" && selectedCandidate) {
      setCandidates(prev =>
        prev.map(candidate =>
          candidate.id === selectedCandidate.id
            ? {
                ...candidate,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                skills: formData.skills.split(",").map(skill => skill.trim()),
                experience: formData.experience,
                position: formData.position,
                status: formData.status,
              }
            : candidate
        )
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Candidate Management
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage your candidate database efficiently
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                viewMode === "table"
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              <Table size={16} />
              <span>Table View</span>
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                viewMode === "cards"
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              <Grid3X3 size={16} />
              <span>Card View</span>
            </button>
          </div>

          <button
            onClick={handleAddCandidate}
            className="flex cursor-pointer items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:ring-offset-gray-900 transition-colors"
          >
            <Plus size={16} />
            <span>Add Candidate</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {candidates.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Candidates
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {candidates.filter(c => c.status === "Active").length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Active
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {candidates.filter(c => c.status === "Interview").length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              In Interview
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
              {candidates.filter(c => c.status === "Inactive").length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Inactive
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === "table" ? (
          <CandidateTable
            candidates={candidates}
            onEdit={handleEditCandidate}
            onDelete={handleDeleteCandidate}
          />
        ) : (
          <CandidateGrid candidates={candidates} onEdit={handleEditCandidate} />
        )}

        {/* Side Panel */}
        <SidePanel
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          onSave={handleSaveCandidate}
          candidate={selectedCandidate}
          mode={panelMode}
        />
      </div>
    </div>
  )
}
