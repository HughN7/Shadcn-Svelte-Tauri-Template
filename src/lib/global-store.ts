import { persisted } from "svelte-persisted-store"
import { writable } from "svelte/store"

export const MIDBREAKPOINTPX: number = 1024

export const appWidth = persisted<number>('app-width', 0)
export const leftSideBarWidth = persisted<number>('left-sidebar-width', 256)
export const leftSideBarWidthBeforeCollapse = persisted<number>('left-sidebar-width-before-collapse', 220)
export const leftSideBarHandleDrag = writable<boolean>(false)

export const leftSideBarSheetSmallWindow = persisted<boolean>('left-sidebar-sheet-small-window', false)
export const leftSideBarSheetLargeWindow = persisted<boolean>('left-sidebar-sheet-large-window', false)


//macOS specific
export const appMaximized = persisted<boolean>('app-fullscreened', false) 