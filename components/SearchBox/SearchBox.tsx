import css from './SearchBox.module.css';

interface SearchBoxProps {
   onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
   return (
      <input
         className={css.input}
         type="text"
         placeholder="Search notes"
         onChange={onSearch}
      />
   );
}
