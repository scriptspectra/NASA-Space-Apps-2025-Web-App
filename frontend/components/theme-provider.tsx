'use client'

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      {...props}
      enableSystem={false}              // disable automatic system theme detection script
      disableTransitionOnChange         // prevent theme flash
      attribute="class"
    >
      {children}
    </NextThemesProvider>
  )
}
