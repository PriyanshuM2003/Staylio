// This file contains utility functions for using Zustand with Next.js

// Helper to safely use Zustand stores on the client side only
export const createClientSideStore = <T, F>(useStore: (selector: (state: T) => F) => F) => {
  if (typeof window === "undefined") {
    return () => {
      throw new Error("Cannot access client store from server components. Use a Client Component instead.")
    }
  }
  return useStore
}
