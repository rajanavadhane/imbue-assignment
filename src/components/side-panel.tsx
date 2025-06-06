"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Candidate, CandidateFormData } from "../types/candidate"
import { X } from "lucide-react"

interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
  onSave: (candidate: CandidateFormData) => void
  candidate?: Candidate | null
  mode: "add" | "edit"
}

export default function SidePanel({
  isOpen,
  onClose,
  onSave,
  candidate,
  mode,
}: SidePanelProps) {
  const [formData, setFormData] = useState<CandidateFormData>({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: 0,
    position: "",
    status: "Active",
  })

  const [errors, setErrors] = useState<Partial<CandidateFormData>>({})

  useEffect(() => {
    if (mode === "edit" && candidate) {
      setFormData({
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        skills: candidate.skills.join(", "),
        experience: candidate.experience,
        position: candidate.position || "",
        status: candidate.status || "Active",
      })
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        skills: "",
        experience: 0,
        position: "",
        status: "Active",
      })
    }
    setErrors({})
  }, [mode, candidate, isOpen])

  const validateForm = (): boolean => {
    const newErrors: Partial<CandidateFormData> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.skills.trim()) newErrors.skills = "Skills are required"
    if (formData.experience < 0)
      newErrors.experience = "Experience must be positive"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
      onClose()
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]:
        name === "experience" ? (value === "" ? 0 : Number(value)) : value,
    }))
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-40"
          onClick={onClose}
        />
      )}

      {/* Side Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {mode === "add" ? "Add Candidate" : "Edit Candidate"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                    errors.name
                      ? "border-red-300 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                    errors.email
                      ? "border-red-300 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                    errors.phone
                      ? "border-red-300 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Skills * (comma-separated)
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="React, TypeScript, Node.js"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 ${
                    errors.skills
                      ? "border-red-300 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.skills && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.skills}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Experience (years) *
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                    errors.experience
                      ? "border-red-300 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.experience}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Interview">Interview</option>
                </select>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              {mode === "add" ? "Add Candidate" : "Update Candidate"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
