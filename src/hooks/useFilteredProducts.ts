
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import productsData from '../data/products.json';
import brandsData from '../data/brands.json';
import categoriesData from '../data/categories.json';

export interface Product {
  id: number;
  nombre: string;
  marcaId: number;
  categoriaId: string;
  precio: number;
  precioOferta: number | null;
  descuento: number;
  img: string;
  is_featured: boolean;
}

export interface Brand {
  id: number;
  nombre: string;
  slug: string;
  logo: string;
}

export interface Category {
  id: string;
  nombre: string;
  slug: string;
}

export const useFilteredProducts = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Intentar cargar desde localStorage primero (datos admin)
    const getProducts = () => {
      const savedProducts = localStorage.getItem('products_public');
      if (savedProducts) {
        try {
          return JSON.parse(savedProducts);
        } catch (error) {
          console.error('Error loading products from localStorage:', error);
        }
      }
      // Fallback a datos estáticos
      return productsData as Product[];
    };

    const categoria = searchParams.get('categoria');
    const marca = searchParams.get('marca');

    let filtered = getProducts();

    if (categoria) {
      filtered = filtered.filter((product: Product) => product.categoriaId === categoria);
    }

    if (marca) {
      const brand = (brandsData as Brand[]).find(b => b.slug === marca);
      if (brand) {
        filtered = filtered.filter((product: Product) => product.marcaId === brand.id);
      }
    }

    setFilteredProducts(filtered);
  }, [searchParams]);

  // Escuchar cambios en localStorage para sincronizar
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'products_public') {
        // Refrescar productos cuando cambien en admin
        const categoria = searchParams.get('categoria');
        const marca = searchParams.get('marca');
        
        let filtered = e.newValue ? JSON.parse(e.newValue) : productsData as Product[];

        if (categoria) {
          filtered = filtered.filter((product: Product) => product.categoriaId === categoria);
        }

        if (marca) {
          const brand = (brandsData as Brand[]).find(b => b.slug === marca);
          if (brand) {
            filtered = filtered.filter((product: Product) => product.marcaId === brand.id);
          }
        }

        setFilteredProducts(filtered);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [searchParams]);

  return {
    products: filteredProducts,
    brands: brandsData as Brand[],
    categories: categoriesData as Category[],
    totalProducts: filteredProducts.length
  };
};
