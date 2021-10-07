import { createContext, useState, useContext } from 'react'

const DarkModeContext = createContext()

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)
  const value = { darkMode, setDarkMode };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  )
}

function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
}

export { DarkModeProvider, useDarkMode }