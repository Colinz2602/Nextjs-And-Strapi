import type { BlocksContent } from '@strapi/blocks-react-renderer';

export interface Review {
    id: number;
    documentId: string;
    Title: string;
    rating: number;
    body: BlocksContent;
}

export interface ApiResponse {
    data: Review[];
}

export interface GetReviewsData {
    reviews: Review[];
}

export interface Category {
    documentId: string;
    Name: string;
}

export interface GetCategoriesData {
    categories: Category[];
}