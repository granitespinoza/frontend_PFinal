
import { useState, useEffect } from 'react';
import { Product } from './useFilteredProducts';
import products from '@/data/products.json';

export const useSearchResults = (query: string) => {
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setTotalResults(0);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      // Get products from localStorage first (admin data) or fallback to static data
      const getProducts = () => {
        const savedProducts = localStorage.getItem('products_public');
        if (savedProducts) {
          try {
            return JSON.parse(savedProducts);
          } catch (error) {
            console.error('Error loading products from localStorage:', error);
          }
        }
        return products as Product[];
      };

      const filtered = getProducts()
        .filter((product: Product) => {
          const searchTerm = query.toLowerCase();
          const productName = product.nombre.toLowerCase();
          
          // Multi-match logic (name has higher weight)
          if (productName.includes(searchTerm)) {
            return true;
          }
          
          // Brand match (lower weight)
          // Note: We'd need to join with brands data in a real implementation
          
          // Fuzzy match for typos
          const words = productName.split(' ');
          return words.some(word => {
            if (searchTerm.length > 3) {
              let differences = 0;
              const minLength = Math.min(word.length, searchTerm.length);
              
              for (let i = 0; i < minLength; i++) {
                if (word[i] !== searchTerm[i]) {
                  differences++;
                }
              }
              
              return differences <= 2 && minLength >= searchTerm.length - 1;
            }
            
            return word.includes(searchTerm);
          });
        })
        .slice(0, 20);
      
      setResults(filtered);
      setTotalResults(filtered.length);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, isLoading, totalResults };
};
