import axios from 'axios';
import type { Note } from '@/types/note';
import { NoteFormValues } from '@/types/NoteFormValues';
interface FetchNotesResponse {
   notes: Note[];
   totalPages: number;
}

const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

if (!NEXT_PUBLIC_NOTEHUB_TOKEN) {
   console.warn('NEXT_PUBLIC_NOTEHUB_TOKEN is not set');
}

export async function fetchNotes(page: number, tag?: string, query?: string) {
   const response = await axios.get<FetchNotesResponse>('/notes', {
      headers: {
         Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
      params: {
         tag,
         search: query,
         page,
         perPage: 12,
      },
   });

   return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
   const response = await axios.get<Note>(`/notes/${id}`, {
      headers: {
         Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
   });

   return response.data;
}

export type CreateNotePayload = {
   title: string;
   tag: string;
   content: string;
};

export async function createNote(note: NoteFormValues) {
   const response = await axios.post<Note>('/notes', note, {
      headers: {
         Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
   });
   return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
   const response = await axios.delete<Note>(`/notes/${id}`, {
      headers: {
         Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
   });

   return response.data;
}
