import { IDocument, IMedication } from "@/interface/MedicationData";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { formatDate } from "./format-date";

// Define as fontes necessárias
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const filterExpedientNumber = (
  documents: IDocument[],
  documentType: string
) => {
  const filteredType = documents.filter(
    (document) => document.type === documentType
  );

  return filteredType.map((documentExpedient) => documentExpedient.expedient);
};

export const generateBulaPDF = (
  medicationData: IMedication,
  documentsType: string,
  openOrDownload: "open" | "download"
) => {
  //leaflet content
  const documentDefinition: TDocumentDefinitions = {
    content: [
      { text: `${medicationData.name} ®`, style: "header" },

      {
        text: [
          { text: "Laboratório fabricante:".toUpperCase(), style: "name" },
          { text: ` ${medicationData.company}`, style: "data" },
        ],
        marginBottom: 15,
      },

      {
        text: [
          { text: "Número de Registro: ".toUpperCase(), style: "name" },
          {
            text: `${filterExpedientNumber(
              medicationData.documents,
              documentsType
            )}`,
            style: "data",
          },
        ],
        marginBottom: 15,
      },

      {
        text: [
          { text: "Data de emissão:".toUpperCase(), style: "name" },
          {
            text: ` ${formatDate(medicationData.published_at)}`,
            style: "data",
          },
        ],
        marginBottom: 15,
      },

      {
        text: [
          { text: "Ativo(s) Principal(ais):".toUpperCase(), style: "name" },
          {
            text: ` ${medicationData.active_principles.map(
              (activePrinciple, index) =>
                index > 0 ? ` ${activePrinciple.name}` : activePrinciple.name
            )}`,
            style: "data",
          },
        ],
        marginBottom: 15,
      },

      {
        text: [
          { text: "Tipo da bula:".toUpperCase(), style: "name" },
          { text: ` ${documentsType}`, style: "data" },
        ],
      },
    ],
    styles: {
      header: {
        fontSize: 30,
        alignment: "center",
        decoration: "underline",
        lineHeight: 1.5,
        bold: true,
        margin: [0, 0, 0, 50],
      },
      name: {
        fontSize: 16,
        margin: [0, 0, 0, 50],
        bold: true,
      },
      data: {
        fontSize: 14,
        color: "#444141",
        lineHeight: 1.2,
      },
    },
  };

  // generate pdf
  openOrDownload === "open"
    ? pdfMake.createPdf(documentDefinition).open()
    : pdfMake.createPdf(documentDefinition).download();
};
