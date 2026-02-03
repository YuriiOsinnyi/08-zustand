import type { Metadata } from 'next';
import {
   QueryClient,
   HydrationBoundary,
   dehydrate,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import NotesPageClient from './Notes.client';

type Props = {
   params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { slug } = await params;
   const filterName =
      slug[0] === 'all'
         ? 'All Notes'
         : slug[0].charAt(0).toUpperCase() + slug[0].slice(1);

   return {
      title: `${filterName} | NoteHub`,
      description: `Browse and manage your notes filtered by ${filterName.toLowerCase()}. Organize your ideas with NoteHub.`,
      openGraph: {
         title: `${filterName} | NoteHub`,
         description: `Browse and manage your notes filtered by ${filterName.toLowerCase()}. Organize your ideas with NoteHub.`,
         url: `https://notehub.example.com/notes/filter/${slug.join('/')}`,
         type: 'website',
         images: [
            {
               url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
               width: 1200,
               height: 630,
               alt: `${filterName} - NoteHub`,
            },
         ],
      },
   };
}

export default async function NotesPage({ params }: Props) {
   const { slug } = await params;

   const page = 1;
   const category = slug[0] === 'all' ? undefined : slug[0];
   const query = undefined;

   const queryClient = new QueryClient();

   await queryClient.prefetchQuery({
      queryKey: ['notes', page, category, query],
      queryFn: () => fetchNotes(page, category ?? ''),
   });

   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <NotesPageClient initialPage={page} tag={category} />
      </HydrationBoundary>
   );
}
