import type { Metadata } from 'next';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
   title: 'Create Note | NoteHub',
   description:
      'Create a new note and save it to your NoteHub collection. Organize your thoughts and ideas.',
   openGraph: {
      title: 'Create Note | NoteHub',
      description:
         'Create a new note and save it to your NoteHub collection. Organize your thoughts and ideas.',
      url: 'https://08-zustand-iota-black.vercel.app/notes/action/create',
      type: 'website',
      images: [
         {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'Create Note - NoteHub',
         },
      ],
   },
};

export default function CreateNote() {
   return (
      <main className={css.main}>
         <div className={css.container}>
            <h1 className={css.title}>Create note</h1>
            <NoteForm />
         </div>
      </main>
   );
}
