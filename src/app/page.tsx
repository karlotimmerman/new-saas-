import Link from 'next/link'
import { Inter } from 'next/font/google'
import { Button } from "@/components/ui/button"

// Initialize the Inter font
const inter = Inter({ subsets: ['latin'] })

export default function LandingPage() {
  return (
    <div className={`flex flex-col min-h-screen ${inter.className}`}>
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold">SKY DUST AI</div>
          <Link href="/login" passHref>
            <Button variant="outline">Login</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          SKY DUST
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          SKY DUST CSRD AI PLATFORM
        </h2>
        <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl">
         CSRD Reporting in a whole new way
        </p>
        <div className="flex space-x-4">
          <Link href="/login" passHref>
            <Button size="lg" className="text-lg px-8 py-3">
              Get Started
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Sign Up
            </Button>
          </Link>
        </div>
      </main>

      <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        © {new Date().getFullYear()} SKY DUST. All rights reserved.
      </footer>
    </div>
  )
}
