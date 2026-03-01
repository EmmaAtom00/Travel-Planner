import { Search } from "lucide-react";
import Input from "./Input";
import { useRef, useState } from "react";

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim() === "") return;
    console.log("Searching for:", value);
    // You can navigate or fetch results here
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className=" lg:max-w-2/4 max-w-3/4 mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className=""
      >
        <Input
          type="text"
          placeholder="Search cities or countries..."
          value={value}
          setValue={setValue}
          ref={inputRef}
          icon={<Search color="grey" />}
          onIconClick={handleSubmit} // icon triggers search
        />
        <button type="submit" className="hidden" aria-hidden="true" />
        <button
          type="button"
          className="hidden px-4 py-2 bg-gray-200 rounded"
          onClick={focusInput}
        >
          Focus
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
