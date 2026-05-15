import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import TopNavBar from '@/components/TopNavBar';
import { AuthProvider } from '@/context/AuthContext';
import PageTransition from '@/components/PageTransition';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'NestKnot Marketplace',
  description: 'Post a service request and connect with trusted local professionals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body-md min-h-screen flex flex-col antialiased selection:bg-primary selection:text-on-primary">
        <AuthProvider>
          <TopNavBar />

          <main className="flex-grow py-xl px-margin-mobile md:px-margin-desktop w-full max-w-5xl mx-auto flex flex-col">
            <PageTransition>{children}</PageTransition>
          </main>

          <footer className="bg-surface-container text-primary full-width border-t border-outline-variant w-full py-xl px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-md mt-auto">
          <div className="font-title-md text-title-md font-black text-primary">
            NestKnot
          </div>
          <nav className="flex flex-wrap justify-center gap-md font-label-sm text-label-sm">
            <a
              href="#"
              className="text-on-surface-variant hover:text-secondary transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-on-surface-variant hover:text-secondary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-on-surface-variant hover:text-secondary transition-colors"
            >
              Contact Support
            </a>
            <a
              href="#"
              className="text-on-surface-variant hover:text-secondary transition-colors"
            >
              About Us
            </a>
          </nav>
          <div className="font-body-md text-body-md text-on-surface-variant text-center md:text-right">
            © {new Date().getFullYear()} NestKnot Marketplace. All rights reserved.
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
