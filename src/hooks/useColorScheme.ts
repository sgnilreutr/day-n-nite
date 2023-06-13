import { useEffect, useState } from 'react'
import { colorSchemeMode, localStorageKey } from '../lib/constants'
import type { ActionType, ColorSchemeMode } from '../types'
import useMediaColorScheme from './useMediaColorScheme'

/**
 * Handles the localStorage operations for storing and retrieving color scheme.
 *
 * @param {ActionType} actionType - The type of action to perform (set, get, remove).
 * @param {ColorSchemeMode} [scheme] - The color scheme value to store (only used for "set" action).
 * @returns {void|ColorSchemeMode} - Returns nothing for "set" and "remove" actions, and the stored color scheme value for "get" action.
 *
 * @example
 * // Set color scheme
 * handleLocalStorage('set', 'dark');
 *
 * // Get color scheme
 * const storedScheme = handleLocalStorage('get');
 * console.log(storedScheme); // Output: 'dark'
 *
 * // Remove color scheme
 * handleLocalStorage('remove');
 */
const handleLocalStorage = (actionType: ActionType, scheme?: ColorSchemeMode) => {
  try {
    switch (actionType) {
      case 'set': {
        if (!scheme) {
          return
        }
        localStorage.setItem(localStorageKey, scheme)
        return
      }
      case 'get': {
        const value = localStorage.getItem(localStorageKey)
        if (colorSchemeMode[value as keyof typeof colorSchemeMode]) {
          return value as keyof typeof colorSchemeMode
        }
        return undefined
      }
      case 'remove': {
        localStorage.removeItem(localStorageKey)
        return
      }
    }
  } catch (e) {
    // Unsupported
  }
}

/**
 * Custom hook for managing the color scheme in a React component.
 *
 * @returns {Object} An object containing the current color scheme and a function to update it.
 *
 * @example
 * // Usage
 * function MyComponent() {
 *   const { colorScheme, setColorScheme } = useColorScheme();
 *
 *   const handleChangeColorScheme = (newScheme) => {
 *     setColorScheme(newScheme);
 *   };
 *
 *   return (
 *     <div>
 *       <p>Current color scheme: {colorScheme}</p>
 *       <button onClick={() => handleChangeColorScheme('dark')}>Set Dark</button>
 *       <button onClick={() => handleChangeColorScheme('light')}>Set Light</button>
 *     </div>
 *   );
 * }
 */
export default function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<ColorSchemeMode>(
    colorSchemeMode.auto
  )
  const { systemScheme } = useMediaColorScheme()

  useEffect(() => {
    const storedSchemeValue = handleLocalStorage('get') || colorSchemeMode.auto
    setColorScheme(storedSchemeValue)
  }, [])

  useEffect(() => {
    if (!systemScheme) {
      return
    }

    switch (colorScheme) {
      case 'auto': {
        const autoSchemeDark = systemScheme === colorSchemeMode.dark
        handleLocalStorage('remove')

        document.documentElement.classList.add('theme-system')
        if (autoSchemeDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return
      }
      case 'dark': {
        document.documentElement.classList.remove('theme-system')
        document.documentElement.classList.add('dark')
        handleLocalStorage('set', 'dark')
        return
      }
      case 'light': {
        document.documentElement.classList.remove('dark', 'theme-system')
        handleLocalStorage('set', 'light')
        return
      }
    }
  }, [colorScheme, systemScheme])

  return {
    colorScheme,
    setColorScheme,
  }
}
