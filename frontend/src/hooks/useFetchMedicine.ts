import {
  IMedication,
  IMedicationDataWithPagination,
} from "@/interface/MedicationData";
import { useEffect, useState } from "react";

type FetchResult = {
  loading: boolean;
  error: string;
  data?: IMedication[] | IMedicationDataWithPagination;
};

const useFetchMedicine = (url: string, query?: string): FetchResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<
    IMedicationDataWithPagination | IMedication[]
  >();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
        setError("");
      } catch (error) {
        setError("Erro ao carregar os dados, tente novamente!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, query]);

  return { loading, error, data };
};

export default useFetchMedicine;
