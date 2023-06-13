import type { ReactNode } from 'react'
import classNames from '../lib/classNames'
import type { ColorSchemeMode, SystemColorSchemeMode } from '../types'
import useColorScheme from '../hooks/useColorScheme'
import useMediaColorScheme from '../hooks/useMediaColorScheme'
import { colorSchemeMode } from '../lib/constants'
import { MoonIcon, SunIcon } from './icons'

const schemeToDisplay: Record<ColorSchemeMode, Record<string, ReactNode>> = {
  auto: {
    icon: null,
    before: 'hover:before:content-["system"]',
  },
  dark: {
    icon: <MoonIcon />,
    before: 'hover:before:content-["dark"]',
  },
  light: {
    icon: <SunIcon />,
    before: 'hover:before:content-["light"]',
  },
}

const getActiveIcon = (
  colorScheme: ColorSchemeMode,
  systemScheme: SystemColorSchemeMode
): ReactNode => {
  if (colorScheme === 'auto') {
    return systemScheme === 'dark'
      ? schemeToDisplay.dark.icon
      : schemeToDisplay.light.icon
  }
  return schemeToDisplay[colorScheme].icon
}

/**
* Represents a mode switch component.
* @returns {JSX.Element} The mode switch button.
*
* export default function ModeSwitch() {
*/
export default function ModeSwitch() {
  const { colorScheme, setColorScheme } = useColorScheme()
  const { systemScheme } = useMediaColorScheme()

  const toggleSchemeMode = () => {
    const schemes = Object.values(colorSchemeMode)
    const currentIndex = schemes.indexOf(colorScheme)
    const nextIndex = (currentIndex + 1) % schemes.length
    setColorScheme(schemes[nextIndex])
  }

  const activeIcon = getActiveIcon(colorScheme, systemScheme)
  const before = schemeToDisplay[colorScheme].before

  return (
    <button
      onClick={toggleSchemeMode}
      className={classNames(`${before}`,
        'flex gap-2 items-center before:text-zinc-400 before:text-[12px] before:font-mono min-h-[32px]'
      )}
    >
      <span
        className={classNames(
          'p-2 rounded-sm transition',
          'text-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800 dark:text-zinc-100'
        )}
      >
        {activeIcon}
      </span>
    </button>
  )
}
