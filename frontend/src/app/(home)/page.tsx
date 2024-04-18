"use client";

import MedicineCard from "@/components/medicine-card";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { IMedication } from "@/interface/MedicationData";
import Button from "@/components/button";
import { orderBy } from "./helpers/order-by";

interface Pagination {
  prev: number | null;
  next: number | null;
}

const Home = () => {
  const [medicineData, setMedicineData] = useState<IMedication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const [paginationData, setPaginationData] = useState<Pagination>({
    prev: null,
    next: 2,
  });

  const [pagination, setPagination] = useState<number>(1);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/data?_page=${pagination}`
        );
        const json = await response.json();

        setPaginationData({
          prev: json.prev,
          next: json.next,
        });
        setMedicineData(json.data);
        setError("");
      } catch (error) {
        setError("Erro ao carregar os dados, tente novamente!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pagination]);

  console.log(medicineData);

  const filteredData =
    search.length > 0
      ? medicineData.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.company.toLowerCase().includes(search.toLowerCase())
        )
      : medicineData;

  return (
    <div className="container">
      <h1>Consulta de Medicamentos</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Busque pelo nome do medicamento ou laboratório.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button text="Buscar" />
      </div>

      <div className="order-container">
        <label>Ordenar por data de emissão: </label>
        <select
          className="order-select"
          name="order"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Escolha uma opção</option>
          <option value="newest">Mais novas</option>
          <option value="oldest">Mais antigas</option>
        </select>
      </div>

      {!loading && !error && medicineData.length > 0 && (
        <div className="medicines-container">
          <MedicineCard medicineData={orderBy(filteredData, selectedOption)} />

          <div className="buttons">
            <Button
              text="<"
              disabled={paginationData.prev === null}
              onClick={() => setPagination((prev) => prev - 1)}
            />

            <Button
              text=">"
              disabled={paginationData.next === null}
              onClick={() => setPagination((prev) => prev + 1)}
            />
          </div>
        </div>
      )}

      {loading && !error && (
        <div className="loading">
          <Loading />
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Home;
