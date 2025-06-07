import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}


export class ResettableTimeout {
	private timeoutId: number | null = null; // Use number for browser timeouts
	private callback: () => void;
	private delay: number;
  
	constructor(callback: () => void, delay: number) {
	  this.callback = callback;
	  this.delay = delay;
	}
  
	start(): void {
	  this.clear();
  
	  this.timeoutId = window.setTimeout(() => { // Use window.setTimeout
		this.timeoutId = null;
		this.callback();
	  }, this.delay);
	}
  
	reset(): void {
	  this.clear();
	  this.start();
	}
  
	clear(): void {
	  if (this.timeoutId) {
		window.clearTimeout(this.timeoutId); // Use window.clearTimeout
		this.timeoutId = null;
	  }
	}
  
	isRunning(): boolean {
		return this.timeoutId !== null;
	}
}