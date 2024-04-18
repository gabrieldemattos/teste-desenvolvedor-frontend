import { FormEvent, useState } from "react";
import Button from "./button";
import { useRouter } from "next/navigation";
import { SearchSlash } from "lucide-react";

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

      <Button
        icon={<SearchSlash size={16} />}
        text="Buscar"
        onClick={handleSearch}
      />
    </form>
  );
};

export default Search;
