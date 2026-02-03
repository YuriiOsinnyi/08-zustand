'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './NotesPage.module.css';

interface Props {
   initialPage: number;
   tag: string | undefined;
}

export default function NotesPageClient({ initialPage, tag }: Props) {
   const [page, setPage] = useState(initialPage);
   const [query, setQuery] = useState<string | undefined>(undefined);

   const { data } = useQuery({
      queryKey: ['notes', page, tag, query],
      queryFn: () => fetchNotes(page, tag, query),
      refetchOnMount: false,
      placeholderData: keepPreviousData,
   });

   const handleSearch = useDebouncedCallback((query: string) => {
      setQuery(query);
      setPage(1);
   }, 300);

   return (
      <div className={css.app}>
         <div className={css.toolbar}>
            <SearchBox onSearch={(e) => handleSearch(e.target.value)} />
            <Link href="/notes/action/create" className={css.button}>
               Create note +
            </Link>
            {data && data.totalPages > 1 && (
               <Pagination
                  currentPage={page}
                  totalPages={data.totalPages ?? 1}
                  setPage={setPage}
               />
            )}
         </div>

         {data && data.notes.length >= 1 && <NoteList notes={data.notes} />}
      </div>
   );
}
