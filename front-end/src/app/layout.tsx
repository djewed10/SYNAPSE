import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { Header } from "@/components/layouts";
import { MyDrawer } from "./vaul";
import { DrawerProvider } from "@/contexts/drawer-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { LanguageProvider } from "@/contexts/language-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SYNAPSE - Learn & Master",
  description: "A comprehensive learning platform with interactive QCMs, gamification, and progress tracking",
};
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                const lang = localStorage.getItem('language') || 'fr';
                document.documentElement.classList.toggle('dark', theme === 'dark');
                document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
                document.documentElement.setAttribute('lang', lang);
              })()
            `,
          }}
        />
      </head>
      <body className="transition-colors duration-300 bg-[var(--background)] dark:bg-gray-950 text-gray-900 dark:text-white">
        <ThemeProvider>
          <LanguageProvider>
            <DrawerProvider>
              <AuthProvider>
                <QueryProvider>
                  <div id="app-shell" className="relative min-h-screen">
                    <Header />
                    {children}
                    <MyDrawer />
                  </div>
                </QueryProvider>
              </AuthProvider>
            </DrawerProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
   
