
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full bg-white/80 backdrop-blur-sm border border-blue-100 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            ¡Ups! Página no encontrada
          </h2>
          <p className="text-gray-600 mb-8">
            Parece que esta página se fue a pasear como un perrito travieso. 
            ¡Volvamos a casa!
          </p>
          <Link to="/">
            <Button className="bg-primary hover:bg-blue-700 text-white">
              🏠 Volver al inicio
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
