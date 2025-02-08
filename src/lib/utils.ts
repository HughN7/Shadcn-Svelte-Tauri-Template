import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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