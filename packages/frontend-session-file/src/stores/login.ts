import { atomWithReset } from 'jotai/utils'

export const loginAtom = atomWithReset<string | null>(null)
