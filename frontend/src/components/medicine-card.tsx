import { generateBulaPDF } from "@/helpers/generate-pdf";
import MedicineInformation from "./medicine-information";
import Button from "./button";
import { IMedication } from "@/interface/MedicationData";
import { formatDate } from "@/helpers/format-date";
import { Download, FileText } from "lucide-react";

interface MedicineCardProps {
  medicineData: IMedication[];
}

const MedicineCard = ({ medicineData }: MedicineCardProps) => {
  return (
    <div className="medicine-container">
      {medicineData.map((medicine) => (
        <div className="card-container" key={medicine.id}>
          <h3>{medicine.name}</h3>

          <MedicineInformation
            dataName="Laboratório fabricante:"
            dataInformation={medicine.company}
          />

          <MedicineInformation
            dataName="Data de emissão:"
            dataInformation={formatDate(medicine.published_at)}
          />

          <MedicineInformation
            dataName="Ativo(os) principal(ais):"
            dataInformation={medicine.active_principles.map(
              (activePrinciple, index) =>
                index > 0 ? `, ${activePrinciple.name}` : activePrinciple.name
            )}
          />

          {medicine.documents.map((document) => (
            <div className="button-container" key={document.id}>
              <p>
                Bula para <span>{document.type}</span>
              </p>

              <div className="button-wrapper">
                <Button
                  icon={<Download size={16} />}
                  text={`Fazer download em PDF`}
                  onClick={() =>
                    generateBulaPDF(medicine, document.type, "download")
                  }
                />

                <Button
                  icon={<FileText size={16} />}
                  text={`Abrir bula em PDF`}
                  onClick={() =>
                    generateBulaPDF(medicine, document.type, "open")
                  }
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MedicineCard;
