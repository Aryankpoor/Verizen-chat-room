'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
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
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  return (
    <div className="relative">
      <Select
        open={isOpen}
        onOpenChange={setIsOpen}
        value={value}
        onValueChange={(newValue) => {
          onValueChange(newValue)
          setIsOpen(false)
          setSearchTerm('')
        }}
      >
        <SelectTrigger className="w-full" onClick={() => setIsOpen(true)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <Input
              ref={inputRef}
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="mb-2"
              onKeyDown={(e) => e.stopPropagation()}
            />
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <SelectItem key={option.id} value={option.name}>
                {option.name}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-sm text-gray-500">Whoops! Nothing found....</div>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}