"use client";

import MedicineCard from "@/components/medicine-card";
import { useState } from "react";
import Loading from "../loading";
import Button from "@/components/button";
import { orderBy } from "./helpers/order-by";
import Search from "@/components/search";
import Container from "@/components/container";
import ErrorMessage from "@/components/error-message";
import OrderBy from "@/components/order-by";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import useFetchMedicine from "@/hooks/useFetchMedicine";
import { IMedicationDataWithPagination } from "@/interface/MedicationData";

const Home = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const url = `http://localhost:3000/data?_page=${currentPage}`;

  const { error, loading, data } = useFetchMedicine(url);

  const medicineData = data as IMedicationDataWithPagination;

  const [selectedOption, setSelectedOption] = useState<string>("");

  const orderByDate = (order: string) => setSelectedOption(order);

  return (
    <Container>
      <div className="home-container">
        <h1>Consulta de Medicamentos</h1>

        <Search />

        <OrderBy handleOrder={orderByDate} />

        {!loading && !error && medicineData && (
          <div>
            <MedicineCard
              medicineData={orderBy(medicineData.data, selectedOption)}
            />

            {medicineData && (
              <div className="buttons-container">
                <Button
                  className="button"
                  icon={<ChevronsLeft size={20} />}
                  disabled={currentPage === medicineData.first}
                  onClick={() => setCurrentPage(medicineData.first!)}
                />
                <Button
                  className="button"
                  icon={<ChevronLeft size={20} />}
                  disabled={medicineData.prev === null}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                />

                <p className="current-page">{currentPage}</p>

                <Button
                  className="button"
                  icon={<ChevronRight size={20} />}
                  disabled={medicineData.next === null}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                />
                <Button
                  className="button"
                  icon={<ChevronsRight size={20} />}
                  disabled={currentPage === medicineData.last}
                  onClick={() => setCurrentPage(medicineData.last!)}
                />
              </div>
            )}
          </div>
        )}

        {loading && !error && <Loading />}

        {error && <ErrorMessage error={error} />}
      </div>
    </Container>
  );
};

export default Home;
