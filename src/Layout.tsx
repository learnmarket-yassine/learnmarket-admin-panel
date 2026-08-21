import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import SideBar from './components/ui/SideBar/SideBar'
import Footer from './components/ui/Footer'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block md:w-64 md:flex-shrink-0">
        <SideBar />
      </div>
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out md:hidden ${
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div
          className={`absolute left-0 top-0 h-full w-64 transform bg-background transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <button
            className="absolute right-4 top-4 text-gray-500"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <SideBar />
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-grow flex-col overflow-hidden">
        {/* Mobile header with menu button */}
        <header className="border-b bg-white p-4 md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-grow overflow-x-hidden p-4">
          <Outlet />
        </main>

        <footer className="flex-shrink-0 border-t bg-white">
          <Footer />
        </footer>
      </div>
    </div>
  )
}

export default Layout
