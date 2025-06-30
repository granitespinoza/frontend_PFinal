
import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useSearchSuggestions } from '@/hooks/useSearchSuggestions';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@/lib/formatPrice';
import AddToCartModal from './AddToCartModal';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { suggestions, isLoading } = useSearchSuggestions(query);

  useEffect(() => {
    if (query.length >= 2 && suggestions.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
    setSelectedIndex(-1);
  }, [suggestions, query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        navigate(`/catalogo?q=${encodeURIComponent(query.trim())}`);
        setShowSuggestions(false);
        inputRef.current?.blur();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        } else if (query.trim()) {
          navigate(`/catalogo?q=${encodeURIComponent(query.trim())}`);
          setShowSuggestions(false);
          inputRef.current?.blur();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionSelect = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
    setShowSuggestions(false);
    setQuery('');
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <>
      <div className="relative w-full max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            ref={inputRef}
            placeholder="Busca productos, marcas..."
            className="pl-10 bg-gray-50/50 border-gray-200 focus:border-primary"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length >= 2 && setShowSuggestions(true)}
            onBlur={handleBlur}
          />
        </div>

        {showSuggestions && (
          <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-y-auto">
            <CardContent className="p-0">
              <ul role="listbox" className="py-2">
                {isLoading ? (
                  <li className="px-4 py-2 text-gray-500 text-sm">
                    Buscando...
                  </li>
                ) : suggestions.length > 0 ? (
                  suggestions.map((product, index) => (
                    <li
                      key={product.id}
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                        selectedIndex === index ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleSuggestionSelect(product)}
                      role="option"
                      aria-selected={selectedIndex === index}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.img}
                          alt={product.nombre}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.nombre}
                          </p>
                          <p className="text-sm text-primary font-semibold">
                            {product.precioOferta 
                              ? formatPrice(product.precioOferta)
                              : formatPrice(product.precio)
                            }
                          </p>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500 text-sm">
                    Sin coincidencias
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      <AddToCartModal
        product={selectedProduct}
        open={showModal}
        onOpenChange={setShowModal}
      />
    </>
  );
};

export default SearchBar;
