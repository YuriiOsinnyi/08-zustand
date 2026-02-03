import type { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
   title: '404 - Page Not Found | NoteHub',
   description:
      'Sorry, the page you are looking for does not exist. This page is not available on NoteHub.',
   openGraph: {
      title: '404 - Page Not Found | NoteHub',
      description:
         'Sorry, the page you are looking for does not exist. This page is not available on NoteHub.',
      url: 'https://notehub.example.com/not-found',
      type: 'website',
      images: [
         {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: '404 - Page Not Found',
         },
      ],
   },
};

const NotFound = () => {
   return (
      <>
         <h1 className={css.title}>404 - Page not found</h1>
         <p className={css.description}>
            Sorry, the page you are looking for does not exist.
         </p>
      </>
   );
};

export default NotFound;
