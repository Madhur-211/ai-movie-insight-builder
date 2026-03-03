"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (id: string) => void;
  disabled?: boolean;
}

export default function SearchBar({
  onSearch,
  disabled = false,
}: SearchBarProps) {
  const [id, setId] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  function validateImdbId(value: string) {
    const regex = /^tt\d{7,8}$/;
    return regex.test(value);
  }

  function handleSearch() {
    if (!id.trim()) {
      setLocalError("IMDb ID is required.");
      return;
    }

    if (!validateImdbId(id.trim())) {
      setLocalError("Invalid IMDb ID format. Example: tt0133093");
      return;
    }

    setLocalError(null);
    onSearch(id.trim());
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <label
        htmlFor="imdb-id"
        className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
      >
        Enter IMDb ID
      </label>

      <div className="flex gap-3">
        <input
          id="imdb-id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="tt0133093"
          disabled={disabled}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                     bg-white dark:bg-gray-800 
                     focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                     transition-all duration-200 disabled:opacity-50"
        />

        <button
          onClick={handleSearch}
          disabled={disabled}
          className="px-5 py-2 rounded-lg bg-black text-white 
                     hover:bg-gray-800 active:scale-95 
                     transition-all duration-200 
                     disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {disabled ? "Loading..." : "Search"}
        </button>
      </div>

      {localError && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {localError}
        </p>
      )}
    </div>
  );
}
