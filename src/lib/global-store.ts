import { persisted } from "svelte-persisted-store"
import { writable } from "svelte/store"

export const MIDBREAKPOINTPX: number = 1024

export const appWidth = persisted<number>('app-width', 0)
export const leftSideBarWidth = persisted<number>('left-sidebar-width', 256)
export const leftSideBarWidthBeforeCollapse = persisted<number>('left-sidebar-width-before-collapse', 220)
export const leftSideBarSheet = persisted<boolean>('left-sidebar-sheet', false) // Using a single sheet variable
export const leftSideBarDragHandle = writable<boolean>(false)


//macOS specific
export const appMaximized = persisted<boolean>('app-fullscreened', false)

export const tabs = persisted<{ id: number; title: string }[]>('tabs', [
	{ id: 1, title: "Tab 1" },
	{ id: 2, title: "Tab 2" },
	{ id: 3, title: "Tab 3" }
]);

export const activeTab = persisted<number>('active-tab', 1);