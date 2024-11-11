'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Button
      className="fixed bottom-4 right-4 rounded-full p-3 z-50"
      variant={darkMode ? 'outline' : 'default'}
      size="icon"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  )
}