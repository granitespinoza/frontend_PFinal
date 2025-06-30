
import { useState, useEffect } from 'react';
import { Product } from './useFilteredProducts';
import { toast } from 'sonner';

export interface AdminProduct extends Product {
  deleted?: boolean;
}

export const useAdminProducts = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCode, setSearchCode] = useState('');
  const productsPerPage = 20;

  // Cargar productos del localStorage o usar datos iniciales
  useEffect(() => {
    const savedProducts = localStorage.getItem('products_admin');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Error loading admin products:', error);
        loadInitialProducts();
      }
    } else {
      loadInitialProducts();
    }
  }, []);

  const loadInitialProducts = async () => {
    try {
      const response = await import('../data/products.json');
      const initialProducts = response.default.map(product => ({
        ...product,
        deleted: false
      }));
      setProducts(initialProducts);
      localStorage.setItem('products_admin', JSON.stringify(initialProducts));
    } catch (error) {
      console.error('Error loading initial products:', error);
    }
  };

  // Guardar en localStorage cada vez que cambien los productos
  const saveProducts = (updatedProducts: AdminProduct[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('products_admin', JSON.stringify(updatedProducts));
    // También actualizar la vista pública
    const publicProducts = updatedProducts.filter(p => !p.deleted);
    localStorage.setItem('products_public', JSON.stringify(publicProducts));
  };

  // Filtrar productos según búsqueda
  const filteredProducts = searchCode
    ? products.filter(product => product.id.toString() === searchCode)
    : products;

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const createProduct = (productData: Omit<AdminProduct, 'id' | 'deleted'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct: AdminProduct = {
      ...productData,
      id: newId,
      deleted: false
    };
    
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    toast.success('Producto creado exitosamente');
    return newProduct;
  };

  const updateProduct = (id: number, productData: Partial<AdminProduct>) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...productData } : product
    );
    saveProducts(updatedProducts);
    toast.success('Producto actualizado exitosamente');
  };

  const deleteProduct = (id: number) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, deleted: true } : product
    );
    saveProducts(updatedProducts);
    toast.success('Producto eliminado exitosamente');
  };

  const restoreProduct = (id: number) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, deleted: false } : product
    );
    saveProducts(updatedProducts);
    toast.success('Producto restaurado exitosamente');
  };

  return {
    products: paginatedProducts,
    totalProducts: filteredProducts.length,
    currentPage,
    totalPages,
    searchCode,
    setCurrentPage,
    setSearchCode,
    createProduct,
    updateProduct,
    deleteProduct,
    restoreProduct
  };
};
