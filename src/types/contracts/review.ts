import type { ReviewStatus } from './enums';
import type { ID, ISODateString } from './common';

export type ReviewDto = {
  id: ID;
  productId: ID;
  userId: ID;
  orderId: ID;
  rating: number;
  content: string;
  status: ReviewStatus;
  createdAt: ISODateString;
  user?: {
    id: ID;
    fullName: string;
  } | null;
};

export type CreateReviewRequest = {
  orderId?: ID;
  rating: number;
  content: string;
};
