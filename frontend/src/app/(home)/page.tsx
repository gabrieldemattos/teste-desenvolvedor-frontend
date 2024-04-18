"use client";

import { useEffect, useState } from "react";
import Loading from "../loading";

const Home = () => {
  const [medicineData, setMedicineData] = useState<any[]>([]);
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

      {loading && !error && (
        <div className="loading">
          <Loading />
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {!loading &&
        !error &&
        medicineData.length > 0 &&
        medicineData.map((medicine) => (
          <div>
            <h1>{medicine.name}</h1>
            <p>Laboratório fabricante: {medicine.company}</p>
            <p>Data de emissão: {medicine.published_at}</p>
            <p>
              Principais ativos:{" "}
              {medicine.active_principles.map(
                (activePrinciple: any) => activePrinciple.name
              )}
            </p>
            <p>
              Documentos:{" "}
              {medicine.documents.map((document: any) => document.type)}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Home;
