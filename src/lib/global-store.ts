import { persisted } from "svelte-persisted-store"

export const MIDBREAKPOINTPX: number = 1024

export const appWidth = persisted<number>('app-width', 0)
export const leftSideBarWidth = persisted<number>('left-sidebar-width', 256)
export const leftSideBarWidthBeforeCollapse = persisted<number>('left-sidebar-width-before-collapse', 220)
export const leftSideBarSheet = persisted<boolean>('left-sidebar-sheet', false)


//macOS specific
export const appMaximized = persisted<boolean>('app-fullscreened', false) 