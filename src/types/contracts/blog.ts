import type { BlogStatus } from './enums';
import type { ID, ISODateString } from './common';

export type BlogAuthorDto = {
  id: ID;
  fullName: string;
};

export type BlogSummaryDto = {
  id: ID;
  title: string;
  slug: string;
  excerpt?: string | null;
  thumbnailUrl?: string | null;
  publishedAt?: ISODateString | null;
};

export type BlogDto = BlogSummaryDto & {
  content?: string | null;
  status?: BlogStatus;
  author?: BlogAuthorDto | null;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
};
