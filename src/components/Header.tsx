
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/contexts/UserContext';
import CartDrawer from './CartDrawer';
import AuthModal from './AuthModal';
import SearchBar from './SearchBar';

const Header = () => {
  const { user, logout } = useUser();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleAuthClick = () => {
    if (!user) {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 border-b border-blue-100">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="text-primary font-medium">
              🐾 Envío gratis desde S/ 100.00
            </div>
            <div className="hidden md:flex items-center space-x-4 text-gray-600">
              <span>📞 +51 930224945</span>
              <span>📧 Proyecto_Grupo_06@gmail.com</span>
              {!user && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAuthClick}
                  className="text-primary hover:text-blue-700"
                >
                  Recibir <span className="ml-1">›</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🐾</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                GO Pet
              </span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden md:flex">
                      <User className="w-4 h-4 mr-2" />
                      👤 {user.profile.nombre}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" className="hidden md:flex" onClick={handleAuthClick}>
                  <User className="w-4 h-4 mr-2" />
                  Mi cuenta
                </Button>
              )}
              
              <CartDrawer />
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="bg-white/90 backdrop-blur-sm border-t border-blue-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center md:justify-start space-x-1 py-3 overflow-x-auto">
              <Link 
                to="/catalogo?marca=canbo"
                className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"
              >
                Marcas
              </Link>
              <Link 
                to="/catalogo?categoria=perros"
                className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"
              >
                Perros
              </Link>
              <Link 
                to="/catalogo?categoria=gatos"
                className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"
              >
                Gatos
              </Link>
              <Link 
                to="/catalogo?categoria=otras-mascotas"
                className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"
              >
                Otras Mascotas
              </Link>
              <Link 
                to="/catalogo?categoria=liquidacion"
                className="whitespace-nowrap px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-semibold"
              >
                🔥 Liquidación
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
      />
    </>
  );
};

export default Header;
