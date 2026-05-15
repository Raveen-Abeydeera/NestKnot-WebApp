'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function TopNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="relative bg-surface-container-lowest/60 backdrop-blur-xl text-primary top-4 md:top-6 border border-outline-variant/40 flex justify-between items-center w-[calc(100%-2rem)] max-w-5xl mx-auto sticky z-50 rounded-2xl md:rounded-full px-md py-sm shadow-md transition-all duration-300">
        <div className="flex items-center gap-md">
          <Link
            href="/"
            onClick={closeMenu}
            className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary hover:opacity-80 transition-opacity"
          >
            NestKnot
          </Link>
          <nav className="hidden md:flex gap-md ml-lg">
            <Link
              href="/"
              className={`font-medium transition-colors duration-200 ${
                pathname === '/' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Browse Jobs
            </Link>
            <Link
              href="/jobs/new"
              className={`font-medium transition-colors duration-200 ${
                pathname === '/jobs/new' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Post a Job
            </Link>
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-md">
          {isAuthenticated ? (
            <>
              <div className="flex items-center text-on-surface-variant font-label-md gap-xs bg-surface-container py-xs px-sm rounded-full">
                <User size={16} />
                {user?.email}
              </div>
              <button 
                onClick={logout}
                className="font-label-md text-label-md text-error hover:text-error/80 transition-colors duration-200 flex items-center gap-xs"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200">
                Login
              </Link>
              <Link href="/register" className="bg-primary text-on-primary font-label-md text-label-md px-md py-sm rounded-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-primary p-xs hover:bg-surface-container-low rounded-lg transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 right-4 top-[80px] md:hidden bg-surface-container-lowest/95 backdrop-blur-xl border border-outline-variant/50 shadow-lg z-40 px-margin-mobile py-md flex flex-col gap-md rounded-2xl"
          >
            <nav className="flex flex-col gap-sm">
              <Link
                href="/"
                onClick={closeMenu}
                className={`font-title-md py-sm px-sm rounded-lg transition-colors duration-200 ${
                  pathname === '/' ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                Browse Jobs
              </Link>
              <Link
                href="/jobs/new"
                onClick={closeMenu}
                className={`font-title-md py-sm px-sm rounded-lg transition-colors duration-200 ${
                  pathname === '/jobs/new' ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                Post a Job
              </Link>
            </nav>
            <div className="border-t border-outline-variant/50 pt-md flex flex-col gap-sm">
              {isAuthenticated ? (
                <>
                  <div className="font-title-md text-on-surface-variant py-sm px-sm flex items-center gap-xs">
                    <User size={18} /> {user?.email}
                  </div>
                  <button 
                    onClick={() => { logout(); closeMenu(); }}
                    className="text-error font-title-md text-left py-sm px-sm flex items-center gap-xs"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={closeMenu} className="font-title-md text-on-surface-variant hover:text-primary transition-colors duration-200 text-left py-sm px-sm">
                    Login
                  </Link>
                  <Link href="/register" onClick={closeMenu} className="bg-primary text-on-primary font-title-md py-sm rounded-lg hover:opacity-90 transition-opacity shadow-md text-center block">
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
