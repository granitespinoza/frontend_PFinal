
import { useSearchParams } from 'react-router-dom';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import { useSearchResults } from '@/hooks/useSearchResults';
import ProductCard from '@/components/ProductCard';
import { Card, CardContent } from '@/components/ui/card';

const Catalogo = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  
  // Use search results if query exists, otherwise use filtered products
  const searchResults = useSearchResults(searchQuery || '');
  const filteredProducts = useFilteredProducts();
  
  const isSearchMode = !!searchQuery;
  const products = isSearchMode ? searchResults.results : filteredProducts.products;
  const totalProducts = isSearchMode ? searchResults.totalResults : filteredProducts.totalProducts;
  const isLoading = isSearchMode ? searchResults.isLoading : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSearchMode ? `Resultados para "${searchQuery}"` : 'Catálogo de productos'}
          </h1>
          <p className="text-gray-600">
            {isLoading ? 'Buscando...' : `${totalProducts} producto${totalProducts !== 1 ? 's' : ''} encontrado${totalProducts !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse bg-white/80 backdrop-blur-sm border border-blue-100">
                <CardContent className="p-4">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-gray-600">
                {isSearchMode 
                  ? `No encontramos productos para "${searchQuery}". Intenta con otros términos.`
                  : 'Intenta cambiar los filtros o busca otros productos.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Catalogo;
