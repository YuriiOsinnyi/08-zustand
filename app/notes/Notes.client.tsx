'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import NotesList from '@/components/NoteList/NoteList';
import css from './Notes.client.module.css';

interface NotesClientProps {
   initialPage?: number;
   tag?: string;
}

export default function NotesClient({
   initialPage = 1,
   tag,
}: NotesClientProps) {
   const [page, setPage] = useState(initialPage);

   const handlePageChange = useCallback((newPage: number) => {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
   }, []);

   return (
      <main className={css.main}>
         <div className={css.header}>
            <h1 className={css.title}>Notes</h1>
            <Link href="/notes/action/create" className={css.createBtn}>
               Create note +
            </Link>
         </div>

         <NotesList
            page={page}
            category={tag}
            onPageChange={handlePageChange}
         />
      </main>
   );
}
