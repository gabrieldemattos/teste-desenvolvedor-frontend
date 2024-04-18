export interface IMedicationDataWithPagination {
  first?: number | null;
  prev?: number | null;
  next?: number | null;
  last?: number | null;
  pages?: number | null;
  data: IMedication[];
}

export interface IMedication {
  id: string;
  name: string;
  published_at: string;
  company: string;
  documents: IDocument[];
  active_principles: IActivePrinciple[];
}

export interface IActivePrinciple {
  id: string;
  name: string;
}

export interface IDocument {
  id: string;
  expedient: string;
  type: string;
  url: string;
}
