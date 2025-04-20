import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC } from "react";

interface SearchFormProps {
  searchQuery: string;
  resultsNumber: number;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResultsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchForm: FC<SearchFormProps> = ({
  searchQuery,
  resultsNumber,
  onQueryChange,
  onResultsChange,
  onSearch,
}) => {
  return (
    <div className="flex w-full gap-4 items-end">
      <div className="w-28 flex flex-col">
        <label htmlFor="resultsNumber" className="text-sm font-medium mb-1">
          Results
        </label>
        <Input
          id="resultsNumber"
          type="number"
          className="h-9"
          value={resultsNumber}
          onChange={onResultsChange}
          min={1}
          max={20}
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <label htmlFor="searchQuery" className="text-sm font-medium">
          Search
        </label>
        <div className="flex gap-2">
          <Input
            id="searchQuery"
            placeholder="Find books..."
            value={searchQuery}
            onChange={onQueryChange}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
          />
          <Button onClick={onSearch}>Search</Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
