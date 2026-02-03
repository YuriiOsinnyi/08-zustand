'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import css from './Notes.client.module.css';
import type { Note } from '@/types/note';

interface NotesClientProps {
   initialPage?: number;
   tag?: string;
   notes?: Note[];
   totalPages?: number;
}

export default function NotesClient({
   initialPage = 1,
   notes = [],
   totalPages = 1,
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

         {notes.length > 0 ? (
            <>
               <NoteList notes={notes} />
               {totalPages > 1 && (
                  <Pagination
                     currentPage={page}
                     totalPages={totalPages}
                     setPage={handlePageChange}
                  />
               )}
            </>
         ) : (
            <p className={css.emptyMessage}>
               No notes found. Create your first note!
            </p>
         )}
      </main>
   );
}
