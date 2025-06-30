
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@/lib/formatPrice';
import products from '@/data/products.json';

const CartDrawer = () => {
  const { items, incrementItem, decrementItem, removeItem, getTotalItems } = useCart();
  const navigate = useNavigate();

  const cartProducts = items.map(item => {
    const product = products.find(p => p.id === item.id);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(Boolean);

  const getSubtotal = () => {
    return cartProducts.reduce((total, item) => {
      if (!item) return total;
      const price = item.precioOferta || item.precio;
      return total + (price * item.quantity);
    }, 0);
  };

  const totalItems = getTotalItems();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCart className="w-4 h-4" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-secondary text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium p-0">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Mi Carrito ({totalItems})</span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cartProducts.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Tu carrito está vacío</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => navigate('/catalogo')}
              >
                Ir a comprar
              </Button>
            </div>
          ) : (
            <>
              {/* Lista de productos */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {cartProducts.map((item) => {
                  if (!item) return null;
                  const price = item.precioOferta || item.precio;
                  const subtotal = price * item.quantity;

                  return (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.img}
                        alt={item.nombre}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.nombre}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {formatPrice(price)}
                        </p>
                        <p className="text-sm font-medium text-primary">
                          Subtotal: {formatPrice(subtotal)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => decrementItem(item.id)}
                            className="w-6 h-6 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => incrementItem(item.id)}
                            className="w-6 h-6 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total y botones */}
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(getSubtotal())}
                  </span>
                </div>
                
                <Button
                  onClick={() => navigate('/cart')}
                  className="w-full bg-primary hover:bg-blue-700 text-white"
                >
                  Ver carrito
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
