import { LoginResponse } from "../AuthType/LoginResponse";
import { PaginationType } from "../CommonType";

export type NoteType = LoginResponse & {
  id: string;
  title: string;
  content: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
};

export type FilterNoteType = {
  userId?: string;
  title?: string;
  pageNumber: number;
  pageSize: number;
};

export type NoteResponse = {
  code: number
  message?: string
  pagination: PaginationType
  result: NoteType[];
};
