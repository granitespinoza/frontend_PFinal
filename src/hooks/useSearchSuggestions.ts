
import { useState, useEffect } from 'react';
import { Product } from './useFilteredProducts';
import products from '@/data/products.json';

export const useSearchSuggestions = (query: string) => {
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
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
          
          // Prefix match (higher priority)
          if (productName.startsWith(searchTerm)) {
            return true;
          }
          
          // Fuzzy match - allow 1-2 character differences
          const words = productName.split(' ');
          return words.some(word => {
            if (word.includes(searchTerm)) return true;
            
            // Simple fuzzy logic for typos
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
            
            return false;
          });
        })
        .slice(0, 5);
      
      setSuggestions(filtered);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  return { suggestions, isLoading };
};
