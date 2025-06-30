
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/hooks/useFilteredProducts';
import brands from '@/data/brands.json';
import categories from '@/data/categories.json';

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSave: (productData: any) => void;
}

const ProductModal = ({ open, onOpenChange, product, onSave }: ProductModalProps) => {
  const [formData, setFormData] = useState({
    nombre: '',
    marcaId: '',
    categoriaId: '',
    precio: '',
    precioOferta: '',
    descuento: '',
    img: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        marcaId: product.marcaId?.toString() || '',
        categoriaId: product.categoriaId || '',
        precio: product.precio?.toString() || '',
        precioOferta: product.precioOferta?.toString() || '',
        descuento: product.descuento?.toString() || '',
        img: product.img || ''
      });
    } else {
      setFormData({
        nombre: '',
        marcaId: '',
        categoriaId: '',
        precio: '',
        precioOferta: '',
        descuento: '',
        img: ''
      });
    }
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      precio: parseFloat(formData.precio) || 0,
      precioOferta: formData.precioOferta ? parseFloat(formData.precioOferta) : null,
      descuento: parseInt(formData.descuento) || 0,
      marcaId: parseInt(formData.marcaId) || 1
    };

    onSave(productData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
              required
              minLength={4}
            />
          </div>

          <div>
            <Label htmlFor="marca">Marca</Label>
            <Select value={formData.marcaId} onValueChange={(value) => setFormData(prev => ({ ...prev, marcaId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar marca" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id.toString()}>
                    {brand.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="categoria">Categoría</Label>
            <Select value={formData.categoriaId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoriaId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="precio">Precio *</Label>
              <Input
                id="precio"
                type="number"
                step="0.01"
                min="0.01"
                value={formData.precio}
                onChange={(e) => setFormData(prev => ({ ...prev, precio: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="precioOferta">Precio Oferta</Label>
              <Input
                id="precioOferta"
                type="number"
                step="0.01"
                min="0"
                value={formData.precioOferta}
                onChange={(e) => setFormData(prev => ({ ...prev, precioOferta: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="img">URL Imagen</Label>
            <Input
              id="img"
              value={formData.img}
              onChange={(e) => setFormData(prev => ({ ...prev, img: e.target.value }))}
              placeholder="https://..."
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {product ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
