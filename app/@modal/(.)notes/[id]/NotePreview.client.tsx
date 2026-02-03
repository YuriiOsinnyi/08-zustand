'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';
import Modal from '@/components/Modal/Modal';

export default function NoteDetailsClient() {
   const { id } = useParams<{ id: string }>();
   const { data, isLoading, isError, isSuccess } = useQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteById(id),
      refetchOnMount: false,
   });

   const router = useRouter();

   return (
      <Modal onClose={() => router.back()}>
         <div className={css.container}>
            <button className={css.backBtn} onClick={() => router.back()}>
               Go back
            </button>

            {isLoading && <p>Loading note details...</p>}

            {isError && (
               <div>
                  <p>Failed to load note details.</p>
               </div>
            )}

            {isSuccess && (
               <div className={css.item}>
                  <div className={css.header}>
                     <h2>{data?.title}</h2>
                     {data.tag && <span className={css.tag}>{data.tag}</span>}
                  </div>
                  <p className={css.content}>{data?.content}</p>
                  {data && (
                     <p className={css.date}>
                        {' '}
                        Created:{' '}
                        {new Date(data?.createdAt).toLocaleString()}{' '}
                     </p>
                  )}
               </div>
            )}
         </div>
      </Modal>
   );
}
