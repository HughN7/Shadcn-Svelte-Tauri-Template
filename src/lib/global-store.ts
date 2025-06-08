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

//Tabs Management
/**
 * This store manages the tabs in the application.
 * Each tab is represented by an object with an `id` and a `title`.
 * Ideally to expand on this, you could add more properties like `url`, `icon`, etc.
 * You'll likely need to basically treat the array of objects as your single source of truth for tabs 
 * and the page content displayed in each tab. so a more complex tab.
 */
export const tabs = persisted<{ id: number; title: string }[]>('tabs', [
	{ id: 1, title: "Tab 1" },
	{ id: 2, title: "Tab 2" },
	{ id: 3, title: "Tab 3" }
]);

export const activeTab = persisted<number>('active-tab', 1);