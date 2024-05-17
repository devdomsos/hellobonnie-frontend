import { Nunito } from 'next/font/google'

import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';

import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css'
import ClientOnly from './components/ClientOnly';

export const metadata = {
  title: 'HelloBonnie',
  description: 'HelloBonnie Postal Code Finder',
}

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <Navbar  />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
