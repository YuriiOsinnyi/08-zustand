import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Draft {
   title: string;
   content: string;
   tag: string;
}

export const initialDraft: Draft = {
   title: '',
   content: '',
   tag: 'Todo',
};

interface NoteStore {
   draft: Draft;
   setDraft: (draft: Partial<Draft>) => void;
   clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
   persist(
      (set) => ({
         draft: initialDraft,

         setDraft: (updatedDraft: Partial<Draft>) => {
            set((state) => ({
               draft: {
                  ...state.draft,
                  ...updatedDraft,
               },
            }));
         },

         clearDraft: () => {
            set({ draft: initialDraft });
         },
      }),
      {
         name: 'note-store',
      }
   )
);
