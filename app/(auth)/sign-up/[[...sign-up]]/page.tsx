'use client'

import { SignUp } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="flex w-full flex-grow items-center px-4 sm:justify-center">
      <div className="flex w-full sm:w-96 items-center justify-center rounded-2xl  p-8 shadow-lg">
        <SignUp
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{
            baseTheme: 'dark',
            elements: {
              card: 'bg-neutral-900',
              headerTitle: 'text-neutral-100',
              headerSubtitle: 'text-neutral-400',
              input: 'bg-neutral-800 text-neutral-100 placeholder:text-neutral-500 border-b border-neutral-700',
              button: 'bg-neutral-700 text-white hover:bg-neutral-600',
            },
          }}
        />
      </div>
    </div>
  )
}
