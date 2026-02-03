import type { Metadata } from 'next';
import { Geist, Geist_Mono, Roboto } from 'next/font/google';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin'],
});

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin'],
});

const roboto = Roboto({
   weight: ['300', '400', '500', '700'],
   variable: '--font-roboto',
   display: 'swap',
   subsets: ['latin', 'latin-ext', 'cyrillic'],
});

export const metadata: Metadata = {
   title: 'NoteHub - Your Personal Note Manager',
   description:
      'A modern, intuitive note-taking application to capture, organize, and manage your ideas with ease.',
   openGraph: {
      title: 'NoteHub - Your Personal Note Manager',
      description:
         'A modern, intuitive note-taking application to capture, organize, and manage your ideas with ease.',
      url: 'https://08-zustand-iota-black.vercel.app',
      type: 'website',
      images: [
         {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'NoteHub - Your Personal Note Manager',
         },
      ],
   },
};

export default function RootLayout({
   children,
   modal,
}: Readonly<{
   children: React.ReactNode;
   modal?: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}
         >
            <TanStackProvider>
               <Header />
               {children}
               {modal}
               <Footer />
            </TanStackProvider>
         </body>
      </html>
   );
}
