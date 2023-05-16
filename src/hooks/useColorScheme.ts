import { useEffect, useState } from 'react'
import { colorSchemeMode, localStorageKey } from '../lib/constants'
import type { ActionType, ColorSchemeMode } from '../types'
import useMediaColorScheme from './useMediaColorScheme'

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
