
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 via-white to-yellow-50 border-t border-blue-100 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center pet-icon-glow">
                <span className="text-white font-bold">🐾</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                GO Pet
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tu tienda online de confianza para el cuidado y bienestar de tus mascotas. 
              Productos de calidad, precios justos y envío a todo Perú.
            </p>
            <div className="flex space-x-4">
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📘</span>
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📷</span>
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">🐦</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-orange-400 mr-2">🐾</span>
              <h3 className="font-semibold text-gray-900">Enlaces rápidos</h3>
            </div>
            <div className="space-y-2">
              <Link to="/catalogo?categoria=perros" className="block text-gray-600 hover:text-primary transition-colors text-sm">
                Productos para Perros
              </Link>
              <Link to="/catalogo?categoria=gatos" className="block text-gray-600 hover:text-primary transition-colors text-sm">
                Productos para Gatos
              </Link>
              <Link to="/catalogo?categoria=liquidacion" className="block text-gray-600 hover:text-primary transition-colors text-sm">
                Ofertas y Liquidación
              </Link>
              <Link to="#" className="block text-gray-600 hover:text-primary transition-colors text-sm">
                Sobre Nosotros
              </Link>
              <Link to="#" className="block text-gray-600 hover:text-primary transition-colors text-sm">
                Términos y Condiciones
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">🐾</span>
              <h3 className="font-semibold text-gray-900">Contacto</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <span>📞</span>
                <span>+51 930224945</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>📧</span>
                <span>Proyecto_Grupo_06@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>📍</span>
                <span>Lima, Perú</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>🕒</span>
                <span>Lun - Vie: 9:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-100 mt-8 pt-8 text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-yellow-400">🐾</span>
            <p className="text-gray-500 text-sm">
              © 2024 GO Pet. Todos los derechos reservados. Desarrollado con ❤️ para las mascotas uwu.
            </p>
            <span className="text-blue-400">🐾</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
