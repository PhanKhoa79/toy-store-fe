import type { ID, ISODateString } from './common';

export type HomepageSlideDto = {
  id: ID;
  title: string;
  subtitle?: string | null;
  imageUrl: string;
  linkUrl?: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
};
