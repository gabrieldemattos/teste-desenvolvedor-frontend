import { FormEvent, useState } from "react";
import Button from "./button";
import { useRouter } from "next/navigation";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (search) router.push(`/search?q=${search}`);
  };

  return (
    <form className="search-container">
      <input
        type="text"
        placeholder="Busque pelo nome do medicamento ou laboratório.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button text="Buscar" type="submit" onClick={handleSearch} />
    </form>
  );
};

export default Search;
