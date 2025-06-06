"use client"

import type { Candidate } from "../types/candidate"
import { Edit, Mail, Phone, User } from "lucide-react"

interface CandidateCardProps {
  candidate: Candidate
  onEdit: (candidate: Candidate) => void
}

export default function CandidateCard({
  candidate,
  onEdit,
}: CandidateCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg dark:hover:shadow-xl transition-shadow border dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {candidate.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {candidate.position}
            </p>
          </div>
        </div>
        <button
          onClick={() => onEdit(candidate)}
          className="text-gray-400 cursor-pointer hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400 p-1 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
        >
          <Edit size={16} />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Mail size={14} />
          <span>{candidate.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Phone size={14} />
          <span>{candidate.phone}</span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">Experience:</span>{" "}
          {candidate.experience} years
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            candidate.status === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : candidate.status === "Interview"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {candidate.status}
        </span>
      </div>
    </div>
  )
}
