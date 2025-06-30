
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { formatPrice } from '@/lib/formatPrice';
import products from '@/data/products.json';
import brands from '@/data/brands.json';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === Number(id));
  const brand = product ? brands.find(b => b.id === product.marcaId) : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30 flex items-center justify-center">
        <Card className="max-w-md w-full bg-white/80 backdrop-blur-sm border border-blue-100">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">😿</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Producto no encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Este producto no existe o ha sido removido.
            </p>
            <Button onClick={() => navigate('/catalogo')}>
              Volver al catálogo
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    toast.success(`${quantity} × ${product.nombre} añadido al carrito`);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Botón volver */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-blue-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Imagen del producto */}
          <div className="space-y-4">
            <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border border-blue-100">
              <CardContent className="p-0">
                <img
                  src={product.img}
                  alt={product.nombre}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
              </CardContent>
            </Card>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              {brand && (
                <p className="text-sm text-gray-600 font-medium uppercase tracking-wide mb-2">
                  {brand.nombre}
                </p>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.nombre}
              </h1>
            </div>

            {/* Precio */}
            <div className="space-y-2">
              {product.precioOferta ? (
                <>
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(product.precioOferta)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.precio)}
                    </span>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold text-sm">
                    {product.descuento}% de descuento
                  </div>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.precio)}
                </span>
              )}
            </div>

            {/* Descripción */}
            <div className="prose prose-gray">
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>

            {/* Selector de cantidad */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={incrementQuantity}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-blue-700 text-white py-3"
                size="lg"
              >
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
