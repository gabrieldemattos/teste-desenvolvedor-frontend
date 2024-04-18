import { useState } from "react";
import Button from "./button";

const Search = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Busque pelo nome do medicamento ou laboratório.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button text="Buscar" />
    </div>
  );
};

export default Search;
