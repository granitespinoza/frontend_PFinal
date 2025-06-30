
import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@/lib/formatPrice';
import products from '@/data/products.json';
import AuthModal from '@/components/AuthModal';

const Cart = () => {
  const { items, incrementItem, decrementItem, removeItem, clearCart, getTotalItems } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);

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

  const subtotal = getSubtotal();
  const shipping = subtotal >= 100 ? 0 : 10; // Envío gratis si subtotal >= S/ 100.00
  const total = subtotal + shipping;

  const handleQuantityChange = (productId: number, newQuantity: string) => {
    const qty = parseInt(newQuantity);
    if (qty >= 1) {
      const currentItem = items.find(item => item.id === productId);
      if (currentItem) {
        const difference = qty - currentItem.quantity;
        if (difference > 0) {
          for (let i = 0; i < difference; i++) {
            incrementItem(productId);
          }
        } else if (difference < 0) {
          for (let i = 0; i < Math.abs(difference); i++) {
            decrementItem(productId);
          }
        }
      }
    }
  };

  const handleCheckout = () => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      navigate('/checkout');
    }
  };

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-8 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-600 mb-6">
                ¡Agrega algunos productos y vuelve aquí para finalizar tu compra!
              </p>
              <Button
                onClick={() => navigate('/catalogo')}
                className="bg-primary hover:bg-blue-700 text-white"
              >
                Ir a comprar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Mi Carrito ({getTotalItems()} productos)
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tabla de productos */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm border border-blue-100">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Productos</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Vaciar carrito
                  </Button>
                </CardHeader>
                <CardContent>
                  {/* Vista móvil */}
                  <div className="block md:hidden space-y-4">
                    {cartProducts.map((item) => {
                      if (!item) return null;
                      const price = item.precioOferta || item.precio;
                      const itemSubtotal = price * item.quantity;

                      return (
                        <div key={item.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-start space-x-3">
                            <img
                              src={item.img}
                              alt={item.nombre}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 line-clamp-2">
                                {item.nombre}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {formatPrice(price)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => decrementItem(item.id)}
                                className="w-8 h-8 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                className="w-16 text-center"
                                min="1"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => incrementItem(item.id)}
                                className="w-8 h-8 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary">
                                {formatPrice(itemSubtotal)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Vista desktop */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Producto</TableHead>
                          <TableHead className="text-center">Cantidad</TableHead>
                          <TableHead className="text-right">Precio</TableHead>
                          <TableHead className="text-right">Subtotal</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartProducts.map((item) => {
                          if (!item) return null;
                          const price = item.precioOferta || item.precio;
                          const itemSubtotal = price * item.quantity;

                          return (
                            <TableRow key={item.id}>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={item.img}
                                    alt={item.nombre}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                  <div>
                                    <h4 className="font-medium text-gray-900 line-clamp-2">
                                      {item.nombre}
                                    </h4>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => decrementItem(item.id)}
                                    className="w-8 h-8 p-0"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <Input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                    className="w-16 text-center"
                                    min="1"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => incrementItem(item.id)}
                                    className="w-8 h-8 p-0"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                {formatPrice(price)}
                              </TableCell>
                              <TableCell className="text-right font-semibold text-primary">
                                {formatPrice(itemSubtotal)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border border-blue-100 sticky top-8">
                <CardHeader>
                  <CardTitle>Resumen del pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({getTotalItems()} productos)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Envío</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {shipping === 0 ? 'GRATIS' : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  {shipping > 0 && (
                    <p className="text-xs text-gray-500">
                      Envío gratis en compras sobre {formatPrice(100)}
                    </p>
                  )}
                  
                  <hr />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                  
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-primary hover:bg-blue-700 text-white py-3"
                  >
                    Pagar 💳
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/catalogo')}
                  >
                    Seguir comprando
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <AuthModal
          open={authModalOpen}
          onOpenChange={setAuthModalOpen}
          nextRoute="/checkout"
          message="Inicia sesión para finalizar tu compra"
        />
      </div>
    </div>
  );
};

export default Cart;
