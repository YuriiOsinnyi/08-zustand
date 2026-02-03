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
