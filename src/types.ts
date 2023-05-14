import { colorSchemeMode } from './constants'

export type ColorSchemeMode =
  (typeof colorSchemeMode)[keyof typeof colorSchemeMode]
export type SystemColorSchemeMode = ColorSchemeMode | undefined

export type ActionType = 'set' | 'get' | 'remove'
