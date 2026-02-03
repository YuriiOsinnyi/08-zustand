'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';

export default function NoteForm() {
   const router = useRouter();
   const formRef = useRef<HTMLFormElement>(null);
   const { draft, setDraft, clearDraft } = useNoteStore();

   useEffect(() => {
      if (formRef.current) {
         const titleInput = formRef.current.querySelector<HTMLInputElement>(
            'input[name="title"]'
         );
         const contentInput =
            formRef.current.querySelector<HTMLTextAreaElement>(
               'textarea[name="content"]'
            );
         const tagInput =
            formRef.current.querySelector<HTMLInputElement>(
               'input[name="tag"]'
            );

         if (titleInput) titleInput.value = draft.title;
         if (contentInput) contentInput.value = draft.content;
         if (tagInput) tagInput.value = draft.tag;
      }
   }, [draft]);

   const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const { name, value } = e.target;
      setDraft({ [name]: value });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const title = formData.get('title') as string;
      const content = formData.get('content') as string;
      const tag = formData.get('tag') as string;

      if (!title.trim() || !content.trim()) {
         alert('Please fill in title and content');
         return;
      }

      try {
         const response = await fetch('/api/notes', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               title,
               content,
               tag,
            }),
         });

         if (!response.ok) {
            throw new Error('Failed to create note');
         }

         clearDraft();

         router.back();
      } catch (error) {
         console.error('Error creating note:', error);
         alert('Failed to create note');
      }
   };

   const handleCancel = () => {
      router.back();
   };

   return (
      <form ref={formRef} onSubmit={handleSubmit} className={css.form}>
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
               onChange={handleInputChange}
               required
            />
         </div>

         <div className={css.formGroup}>
            <label htmlFor="tag" className={css.label}>
               Tag
            </label>
            <input
               type="text"
               id="tag"
               name="tag"
               placeholder="Add a tag"
               className={css.input}
               onChange={handleInputChange}
            />
         </div>

         <div className={css.buttonGroup}>
            <button type="submit" className={css.submitBtn}>
               Create Note
            </button>
            <button
               type="button"
               onClick={handleCancel}
               className={css.cancelBtn}
            >
               Cancel
            </button>
         </div>
      </form>
   );
}
