"use client";

import MedicineCard from "@/components/medicine-card";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { IMedication } from "@/interface/MedicationData";
import Search from "@/components/search";

const Home = () => {
  const [medicineData, setMedicineData] = useState<IMedication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/data");
        const data = await response.json();
        setMedicineData(data);
        setError("");
      } catch (error) {
        setError("Erro ao carregar os dados, tente novamente!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Consulta de Medicamentos</h1>

      <Search />

      {!loading && !error && medicineData.length > 0 && (
        <MedicineCard medicineData={medicineData} />
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
