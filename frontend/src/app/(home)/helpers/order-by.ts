import { IMedication } from "@/interface/MedicationData";

export const orderBy = (medicationData: IMedication[], order: string) => {
  const copyMedicationData = [...medicationData];

  switch (order) {
    case "newest":
      return copyMedicationData.toSorted(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
      );
    case "oldest":
      return copyMedicationData.toSorted(
        (a, b) =>
          new Date(a.published_at).getTime() -
          new Date(b.published_at).getTime()
      );
    default:
      return copyMedicationData;
  }
};
