import { colorSchemeMode } from '../lib/constants'
import { useEffect, useState } from 'react'
import type { SystemColorSchemeMode } from '../types'

/**
 * Custom hook for detecting the system color scheme in a React component.
 *
 * @returns {Object} An object containing the current system color scheme.
 *
 * @example
 * // Usage
 * function MyComponent() {
 *   const { systemScheme } = useMediaColorScheme();
 *
 *   return (
 *     <div>
 *       <p>System color scheme: {systemScheme}</p>
 *     </div>
 *   );
 * }
 */
export default function useMediaColorScheme() {
  const [systemScheme, setSystemScheme] =
    useState<SystemColorSchemeMode>(undefined)

  useEffect(() => {
    // Run once on mount
    const systemValueIsDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    const colorSchemeOutcome = systemValueIsDark
      ? colorSchemeMode.dark
      : colorSchemeMode.light
    setSystemScheme(colorSchemeOutcome)
  }, [])

  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      e.matches
        ? setSystemScheme(colorSchemeMode.dark)
        : setSystemScheme(colorSchemeMode.light)
    }
    const colorSchemeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    )
    colorSchemeMediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => {
      colorSchemeMediaQuery.removeEventListener(
        'change',
        handleSystemThemeChange
      )
    }
  }, [])

  return { systemScheme }
}
