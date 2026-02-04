'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';

const TAG_OPTIONS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
   const router = useRouter();
   const queryClient = useQueryClient();
   const { draft, setDraft, clearDraft } = useNoteStore();

   const mutation = useMutation({
      mutationFn: async (data: {
         title: string;
         content: string;
         tag: string;
      }) => {
         const response = await fetch('/api/notes', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         });

         if (!response.ok) {
            throw new Error('Failed to create note');
         }

         return response.json();
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['notes'] });

         clearDraft();

         router.back();
      },
      onError: (error) => {
         console.error('Error creating note:', error);
         alert('Failed to create note');
      },
   });

   const handleInputChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
   ) => {
      const { name, value } = e.target;
      setDraft({ [name]: value });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!draft.title.trim() || !draft.content.trim()) {
         alert('Please fill in title and content');
         return;
      }

      mutation.mutate({
         title: draft.title,
         content: draft.content,
         tag: draft.tag,
      });
   };

   const handleCancel = () => {
      router.back();
   };

   return (
      <form onSubmit={handleSubmit} className={css.form}>
         <div className={css.formGroup}>
            <label htmlFor="title" className={css.label}>
               Title
            </label>
            <input
               type="text"
               id="title"
               name="title"
               placeholder="Enter note title"
               className={css.input}
               value={draft.title}
               onChange={handleInputChange}
               required
            />
         </div>

         <div className={css.formGroup}>
            <label htmlFor="content" className={css.label}>
               Content
            </label>
            <textarea
               id="content"
               name="content"
               placeholder="Enter note content"
               className={css.textarea}
               rows={8}
               value={draft.content}
               onChange={handleInputChange}
               required
            />
         </div>

         <div className={css.formGroup}>
            <label htmlFor="tag" className={css.label}>
               Tag
            </label>
            <select
               id="tag"
               name="tag"
               className={css.select}
               value={draft.tag}
               onChange={handleInputChange}
            >
               {TAG_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                     {option}
                  </option>
               ))}
            </select>
         </div>

         <div className={css.buttonGroup}>
            <button
               type="submit"
               className={css.submitBtn}
               disabled={mutation.isPending}
            >
               {mutation.isPending ? 'Creating...' : 'Create Note'}
            </button>
            <button
               type="button"
               onClick={handleCancel}
               className={css.cancelBtn}
               disabled={mutation.isPending}
            >
               Cancel
            </button>
         </div>

         {mutation.isError && (
            <p className={css.error}>
               Failed to create note. Please try again.
            </p>
         )}
      </form>
   );
}
