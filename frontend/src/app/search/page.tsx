"use client";

import Container from "@/components/container";
import MedicineCard from "@/components/medicine-card";
import Search from "@/components/search";
import { IMedication } from "@/interface/MedicationData";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Loading from "../loading";
import ErrorMessage from "@/components/error-message";
import OrderBy from "@/components/order-by";
import { orderBy } from "../(home)/helpers/order-by";
import { accentsRemover, textMatchesQuery } from "./helpers/text-matches-query";
import useFetchMedicine from "@/hooks/useFetchMedicine";

const SearchPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  const url = "http://localhost:3000/data";

  const { error, loading, data } = useFetchMedicine(url, query as string);
  const medicineData = data as IMedication[];

  // checks whether the query is valid, that is, it is not null and has a length greater than zero
  const isQueryValid = query !== null && query.length > 0;

  // if the query is valid, convert it to lowercase and remove accents
  const lowercaseQuery = isQueryValid
    ? accentsRemover(query.toLowerCase())
    : null;

  // if the query is valid, filters the drugs that match the query
  const filteredData =
    isQueryValid && medicineData
      ? medicineData.filter(
          (item) =>
            textMatchesQuery(item.name.toLowerCase(), lowercaseQuery) ||
            textMatchesQuery(item.company.toLowerCase(), lowercaseQuery)
        )
      : [];

  const orderByDate = (order: string) => setSelectedOption(order);

  return (
    <Container>
      <Search />

      <p className="results">
        Resultados encontrados com <span>{query}</span>: {filteredData.length}
      </p>

      <OrderBy handleOrder={orderByDate} />

      {filteredData && !loading && !error && (
        <MedicineCard medicineData={orderBy(filteredData, selectedOption)} />
      )}

      {loading && <Loading />}

      {error && <ErrorMessage error={error} />}
    </Container>
  );
};

export default SearchPage;
