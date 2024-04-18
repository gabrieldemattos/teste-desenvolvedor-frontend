"use client";

import MedicineCard from "@/components/medicine-card";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { IMedication } from "@/interface/MedicationData";
import Button from "@/components/button";
import { orderBy } from "./helpers/order-by";
import Search from "@/components/search";
import Container from "@/components/container";
import ErrorMessage from "@/components/error-message";
import OrderBy from "@/components/order-by";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const orderByDate = (order: string) => setSelectedOption(order);

  return (
    <Container>
      <div className="home-container">
        <h1>Consulta de Medicamentos</h1>

        <Search />

        <OrderBy handleOrder={orderByDate} />

        {!loading && !error && medicineData.length > 0 && (
          <div>
            <MedicineCard
              medicineData={orderBy(medicineData, selectedOption)}
            />

            <div className="buttons-container">
              <Button
                icon={<ChevronLeft size={20} />}
                disabled={paginationData.prev === null}
                onClick={() => setPagination((prev) => prev - 1)}
              />

              <Button
                icon={<ChevronRight size={20} />}
                disabled={paginationData.next === null}
                onClick={() => setPagination((prev) => prev + 1)}
              />
            </div>
          </div>
        )}

        {loading && !error && <Loading />}

        {error && <ErrorMessage error={error} />}
      </div>
    </Container>
  );
};

export default Home;
