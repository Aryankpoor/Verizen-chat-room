'use client'

import React, { useState, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SearchableSelectProps {
  options: { id: string; name: string }[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
}

export default function SearchableSelect({ options, value, onValueChange, placeholder = "Select an option" }: SearchableSelectProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  return (
    <div className="relative">
      <Select
        open={isOpen}
        onOpenChange={setIsOpen}
        value={value}
        onValueChange={(newValue) => {
          onValueChange(newValue)
          setIsOpen(false)
        }}
      >
        <SelectTrigger className="w-full" onClick={() => setIsOpen(true)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="mb-2"
            />
          </div>
          {filteredOptions.map((option) => (
            <SelectItem key={option.id} value={option.name}>
              {option.name}
            </SelectItem>
          ))}
          {filteredOptions.length === 0 && (
            <div className="p-2 text-sm text-gray-500">No options found</div>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}