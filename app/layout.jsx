import '@styles/globals.css'
import Navbar from '@components/Navbar'
import { Footer } from '@components/Footer'

export const metadata = {
  metadataBase: new URL(`${process.env.METADATABASE}`),
  title: {
    default: 'TechyStuff Blogs: Your One-Stop Shop for Tech News and Tutorials',
    template: `%s | TechyStuff Blogs`
  },
  description: "Get the most out of [software or app name] with our tips and tricks. We'll show you how to do things like customize your settings, troubleshoot problems, and more.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
      <body>
        <main className='app min-h-screen'>
          <Navbar />
          {children}
          <Footer/>
        </main>
      </body>
    </html>
  )
}
