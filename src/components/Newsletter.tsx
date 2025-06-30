
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';
import AuthModal from './AuthModal';

const Newsletter = () => {
  const { user } = useUser();
  const [email, setEmail] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user) {
      // Usuario logueado
      toast.success('¡Suscripción exitosa! Te mantendremos informado de nuestras ofertas 🐾');
      setEmail('');
    } else {
      // Usuario guest - abrir modal de login
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-yellow-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-white/85 backdrop-blur-sm border border-blue-100 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  🐾 ¡No te pierdas nuestras ofertas!
                </h3>
                <p className="text-gray-600">
                  Suscríbete y recibe descuentos exclusivos, tips de cuidado y las mejores ofertas para tus mascotas.
                </p>
              </div>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder={user?.email || "tu-email@ejemplo.com"}
                  value={user?.email || email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border-gray-200 focus:border-primary"
                  disabled={!!user}
                />
                <Button type="submit" className="bg-primary hover:bg-blue-700 text-white px-6">
                  Suscribirme
                </Button>
              </form>
              
              <p className="text-xs text-gray-500 mt-4">
                No spam, solo amor perruno y gatuno 💕
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        message="Inicia sesión para suscribirte al newsletter"
      />
    </>
  );
};

export default Newsletter;
