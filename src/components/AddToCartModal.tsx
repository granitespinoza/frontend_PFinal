
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { formatPrice } from '@/lib/formatPrice';

interface AddToCartModalProps {
  product: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddToCartModal = ({ product, open, onOpenChange }: AddToCartModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    toast.success(`${quantity} × ${product.nombre} añadido al carrito`);
    onOpenChange(false);
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Añadir al carrito</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={product.img}
              alt={product.nombre}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{product.nombre}</h3>
              <p className="text-lg font-bold text-primary">
                {product.precioOferta 
                  ? formatPrice(product.precioOferta)
                  : formatPrice(product.precio)
                }
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
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

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddToCart} className="bg-primary hover:bg-blue-700">
              Agregar al carrito
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
