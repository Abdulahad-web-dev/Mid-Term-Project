'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] text-white p-6">
      <div className="max-w-xl w-full p-8 border border-red-500/20 bg-red-500/10 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-400">Something went wrong!</h2>
        <p className="text-white/70 mb-6 font-mono bg-black/50 p-4 rounded text-left overflow-auto whitespace-pre-wrap">
          {error.message || "Unknown error occurred"}
          {'\n\n'}
          {error.stack}
        </p>
        <button
          onClick={() => reset()}
          className="bg-primary px-6 py-2 rounded-lg font-bold hover:bg-primary/80 transition-colors pointer-events-auto"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
