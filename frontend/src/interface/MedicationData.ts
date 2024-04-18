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
