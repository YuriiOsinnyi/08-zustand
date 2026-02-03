import type { Metadata } from 'next';
import {
   QueryClient,
   HydrationBoundary,
   dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

import NoteDetails from './NoteDetails.client';

type Props = {
   params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { id } = await params;

   try {
      const note = await fetchNoteById(id);

      const description = note.content
         ? note.content.substring(0, 160)
         : 'Read this note on NoteHub';

      return {
         title: `${note.title} | NoteHub`,
         description: description,
         openGraph: {
            title: `${note.title} | NoteHub`,
            description: description,
            url: `https://notehub.example.com/notes/${id}`,
            type: 'article',
            images: [
               {
                  url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                  width: 1200,
                  height: 630,
                  alt: note.title,
               },
            ],
         },
      };
   } catch {
      return {
         title: 'Note | NoteHub',
         description: 'Read this note on NoteHub',
         openGraph: {
            title: 'Note | NoteHub',
            description: 'Read this note on NoteHub',
            url: `https://notehub.example.com/notes/${id}`,
            type: 'article',
            images: [
               {
                  url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                  width: 1200,
                  height: 630,
                  alt: 'Note',
               },
            ],
         },
      };
   }
}

export default async function NoteDetailsPage({ params }: Props) {
   const { id } = await params;

   const queryClient = new QueryClient();

   await queryClient.prefetchQuery({
      queryKey: ['notes', 'detail', id],
      queryFn: () => fetchNoteById(id),
   });

   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <NoteDetails />
      </HydrationBoundary>
   );
}
