
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import productsData from '../data/products.json';
import brandsData from '../data/brands.json';
import { Product, Brand } from '@/hooks/useFilteredProducts';

const Home = () => {
  const featuredProducts = (productsData as Product[]).filter(p => p.is_featured);
  const brands = brandsData as Brand[];

  return (
    <div className="min-h-screen">
      {/* Hero Section con fondo más cálido */}
      <section className="relative h-[500px] watercolor-hero overflow-hidden pet-texture-cotton">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/25 via-pink-400/20 to-yellow-400/25"></div>
        
        {/* Huellas flotantes más expresivas y animadas */}
        <div className="absolute top-16 left-8 text-orange-400/60 text-3xl floating-paw">🐾</div>
        <div className="absolute top-32 right-16 text-pink-400/60 text-2xl floating-paw" style={{animationDelay: '0.5s'}}>🐾</div>
        <div className="absolute bottom-24 left-1/4 text-yellow-400/70 text-2xl floating-paw" style={{animationDelay: '1s'}}>🐾</div>
        <div className="absolute top-20 right-1/3 text-blue-400/50 text-xl floating-paw" style={{animationDelay: '1.5s'}}>🐾</div>
        <div className="absolute bottom-16 right-12 text-green-400/60 text-2xl floating-paw" style={{animationDelay: '2s'}}>🐾</div>
        
        {/* Elementos decorativos adicionales */}
        <div className="absolute top-40 left-16 text-purple-400/40 text-lg animate-float">🏠</div>
        <div className="absolute bottom-32 right-24 text-red-400/40 text-lg animate-float-delayed">🦴</div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
            {/* Contenido de texto mejorado */}
            <div className="max-w-2xl">
              <div className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 animate-pulse pet-glow-red pet-button-particles">
                🔥 DÍAS PELUDOS 🔥
              </div>
              <div className="flex items-center mb-4">
                <span className="text-orange-500 mr-3 text-2xl animate-bounce">🐾</span>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                  Hasta <span className="text-blue-600 pet-glow-blue">50%</span> en alimentos
                </h1>
              </div>
              <div className="flex items-center mb-6">
                <span className="text-yellow-500 mr-3 text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>🐾</span>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                  y <span className="text-yellow-500 pet-glow-yellow">70%</span> en accesorios
                </h2>
              </div>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                🎉 Dale a tu mascota lo mejor con nuestras ofertas especiales. 
                Productos premium a precios increíbles. ¡Tu peludo amigo lo merece! 🐕🐱
              </p>
              <Link to="/catalogo?categoria=perros">
                <Button size="lg" className="pet-button-glow pet-button-particles group text-lg px-10 py-4">
                  🛍️ Ir a comprar ahora
                  <div className="paw-trail"></div>
                </Button>
              </Link>
            </div>
            
            {/* Imagen del gatito con efectos mejorados */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                <img
                  src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=400&h=400&q=80"
                  alt="Gatito adorable"
                  className="w-80 h-80 object-cover rounded-full shadow-2xl border-8 border-white/60 pet-image-glow relative z-10"
                />
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl animate-bounce pet-glow-orange z-20">
                  ¡Miau! 🐱💕
                </div>
                {/* Elementos decorativos alrededor de la imagen */}
                <div className="absolute -bottom-2 -left-2 text-pink-400 text-xl animate-float">🎀</div>
                <div className="absolute -top-2 left-8 text-blue-400 text-lg animate-float-delayed">⭐</div>
                <div className="absolute top-12 -right-4 text-green-400 text-lg animate-float">🌟</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías populares con colores más vibrantes */}
      <section className="py-16 bg-white pet-texture-fur">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <span className="text-orange-500 text-3xl mr-4 animate-bounce">🐾</span>
            <h2 className="text-4xl font-bold text-center text-gray-900 pet-glow-blue">
              Categorías populares
            </h2>
            <span className="text-pink-500 text-3xl ml-4 animate-bounce" style={{animationDelay: '0.3s'}}>🐾</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/catalogo?categoria=perros" className="group">
              <Card className="pet-card-glow pet-card-orange hover:shadow-xl transition-all duration-500 pet-texture-cotton">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-5xl group-hover:scale-125 transition-transform duration-500 pet-icon-glow shadow-lg">
                    🍖
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 pet-glow-orange">Nuevo Snack 🎉</h3>
                  <p className="text-gray-700 text-lg">¡Premios irresistibles para consentir a tu perrito! 🐕❤️</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <span className="text-orange-400 text-sm">🐾</span>
                    <span className="text-yellow-400 text-sm">🐾</span>
                    <span className="text-red-400 text-sm">🐾</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/catalogo?categoria=perros" className="group">
              <Card className="pet-card-glow pet-card-blue hover:shadow-xl transition-all duration-500 pet-texture-cotton">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-5xl group-hover:scale-125 transition-transform duration-500 pet-icon-glow shadow-lg">
                    🦴
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 pet-glow-blue">Productos Perros 🐕</h3>
                  <p className="text-gray-700 text-lg">Todo lo que tu fiel compañero necesita para ser feliz 🎾</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <span className="text-blue-400 text-sm">🐾</span>
                    <span className="text-purple-400 text-sm">🐾</span>
                    <span className="text-indigo-400 text-sm">🐾</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/catalogo?categoria=gatos" className="group">
              <Card className="pet-card-glow pet-card-pink hover:shadow-xl transition-all duration-500 pet-texture-cotton">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-5xl group-hover:scale-125 transition-transform duration-500 pet-icon-glow shadow-lg">
                    🐱
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 pet-glow-pink">Productos Gatos 😺</h3>
                  <p className="text-gray-700 text-lg">Cuidado especial para tus elegantes felinos 🎀✨</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <span className="text-pink-400 text-sm">🐾</span>
                    <span className="text-purple-400 text-sm">🐾</span>
                    <span className="text-rose-400 text-sm">🐾</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Marcas populares con efectos mejorados */}
      <section className="py-16 watercolor-section">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <span className="text-blue-500 text-3xl mr-4 animate-bounce">🐾</span>
            <h2 className="text-4xl font-bold text-center text-gray-900 pet-glow-yellow">
              Marcas populares
            </h2>
            <span className="text-green-500 text-3xl ml-4 animate-bounce" style={{animationDelay: '0.4s'}}>🐾</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                to={`/catalogo?marca=${brand.slug}`}
                className="group"
              >
                <Card className="pet-card-glow pet-card-subtle hover:shadow-lg transition-all duration-500 bg-white/90 backdrop-blur-sm pet-texture-cotton">
                  <CardContent className="p-4 text-center">
                    <img
                      src={brand.logo}
                      alt={brand.nombre}
                      className="w-full h-16 object-contain mb-2 group-hover:scale-125 transition-transform duration-500 filter group-hover:brightness-110"
                    />
                    <p className="text-sm font-semibold text-gray-800">{brand.nombre}</p>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                      <span className="text-green-400 text-xs">🐾</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos recomendados con wrapper mejorado */}
      <section className="py-16 bg-white pet-texture-fur">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <span className="text-green-500 text-3xl mr-4 animate-bounce">🐾</span>
            <h2 className="text-4xl font-bold text-center text-gray-900 pet-glow-orange">
              Productos recomendados ⭐
            </h2>
            <span className="text-purple-500 text-3xl ml-4 animate-bounce" style={{animationDelay: '0.5s'}}>🐾</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="pet-product-wrapper">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/catalogo">
              <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white pet-button-glow pet-button-particles px-8 py-4 text-lg font-semibold">
                Ver todos los productos 🎯
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;
