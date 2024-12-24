export type Document = {
  id: string;
  name: string;
  title: string;
  createdAt: Date;
  ocrResultId: string | null;
  format: string;
  url: string;
  userId: string;
};
