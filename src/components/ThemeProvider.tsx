import { Fragment } from 'react'
import type { ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <Fragment>{children}</Fragment>
}
