import "@/styles/globals.css"
import Link from "next/link"
import Image from "next/image"
const App = ({ Component, pageProps }) => (
  <main className="flex flex-col">
    <header className="border-b-2 border-b-stone-200 bg-stone-100">
      <div className="mx-auto max-w-5xl p-4 flex justify-between items-center">
        <Link href="/" className="text-gray-500 text-xl font-serif">
          LOCATIONS
        </Link>
        <Image src="/Location.jpg" alt="Logo" width={60} height={40} />
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link
                href="/locations/create"
                className="text-gray-500 text-xl font-serif"
              >
                CREATE
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <section>
      <div className="mx-auto max-w-5xl p-4">
        <Component {...pageProps} />
      </div>
    </section>
  </main>
)

export default App
