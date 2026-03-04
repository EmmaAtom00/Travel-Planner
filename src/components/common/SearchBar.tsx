import { Search } from "lucide-react";
import Input from "./Input";
import { useRef, useState } from "react";

interface SearchBarProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search cities or countries..." }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim() === "") return;
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className=""
      >
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          setValue={setValue}
          ref={inputRef}
          icon={<Search color="grey" />}
          onIconClick={handleSubmit}
        />
        <button type="submit" className="hidden" aria-hidden="true" />
      </form>
    </div>
  );
};

export default SearchBar;
