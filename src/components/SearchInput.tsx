import { startTransition } from 'react';

export interface ISearchInputProps {
  filter: string;
  setFilter: (e: string) => void;
}

const SearchInput = ({ filter, setFilter }: ISearchInputProps) => {
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    startTransition(() => {
      setFilter(e.target.value);
    });
  return (
    <div>
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-700"
      >
        Quick search
      </label>
      <div className="relative mt-1 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={filter}
          onChange={onChangeHandler}
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
