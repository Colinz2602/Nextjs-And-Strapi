'use client'
import Link from "next/link";
import ProductCard from "./component/ProductCard";
import { Review, GetReviewsData } from './Interface/Interface'
import ReviewCut from "./component/ReviewCut";
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { GetCategoriesData, Category } from './Interface/Interface'
import { useState } from "react";

const CATEGORIES = gql`
  query GetCategories {
    categories {
      documentId
      Name
    }
  }
`;

const REVIEWS = gql`
  query GetReview($filters: ReviewFiltersInput) {
    reviews(filters: $filters) {
      documentId
      Title
      rating
      body
      categories {
        documentId
        Name
      }
    }
  }
`;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { loading, error, data, refetch } = useQuery<GetReviewsData>(REVIEWS, {
    variables: { filters: null }
  })

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError
  } = useQuery<GetCategoriesData>(CATEGORIES);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    if (categoryId === 'all') {
      refetch({ filters: null });
    } else {
      refetch({ filters: { categories: { documentId: { eq: categoryId } } } });
    }
  };

  if (loading || categoriesLoading) return <p>Loading...</p>
  if (error) return <p>Error loading reviews: {error.message}</p>
  if (categoriesError) return <p>Error loading categories: {categoriesError.message}</p>

  return (
    <main>
      <>
        <div className="filter-container ml-20 mt-4 mb-4">
          <label htmlFor="category-select" className="mr-2 font-medium">
            Filter by Category:
          </label>
          <select
            id="category-select"
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="all">All Categories</option>
            {categoriesData?.categories.map((category: Category) => (
              <option key={category.documentId} value={category.documentId}>
                {category.Name}
              </option>
            ))}
          </select>
        </div>

        {data?.reviews.map((review: Review) => (
          <div key={review.documentId} className="review-card ml-20 mt-4">
            <ReviewCut review={review} />
            <Link href="/ReviewDetail" className="text-purple-600 underline hover:text-purple-400 transiton-colors">Read more</Link>
          </div>
        ))}

        <ProductCard />
      </>
    </main>
  );
}