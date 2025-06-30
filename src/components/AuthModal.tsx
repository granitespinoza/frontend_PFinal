
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nextRoute?: string;
  message?: string;
}

const AuthModal = ({ open, onOpenChange, nextRoute, message }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    direccion: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login(loginData.email, loginData.password);
      
      if (result.success) {
        toast.success('¡Bienvenido de vuelta!');
        onOpenChange(false);
        
        if (nextRoute) {
          window.location.href = nextRoute;
        }
      } else {
        if (result.error === 'no-user') {
          toast.error('Este correo no está registrado. ¿Quieres crear tu cuenta?');
          // Precargar email en registro y cambiar a tab de registro
          setRegisterData(prev => ({ ...prev, email: loginData.email }));
          setActiveTab('register');
        } else if (result.error === 'bad-pass') {
          toast.error('Contraseña incorrecta');
        } else {
          toast.error('Error al iniciar sesión');
        }
      }
    } catch (error) {
      toast.error('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password.length < 5) {
      toast.error('La contraseña debe tener al menos 5 caracteres');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await register(registerData);
      
      if (result.success) {
        toast.success(`¡Bienvenido, ${registerData.nombre}!`);
        onOpenChange(false);
        
        if (nextRoute) {
          window.location.href = nextRoute;
        }
      } else {
        if (result.error === 'email-exists') {
          toast.error('Este correo ya está registrado');
        } else {
          toast.error('Error al crear la cuenta');
        }
      }
    } catch (error) {
      toast.error('Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginInputChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegisterInputChange = (field: string, value: string) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Acceso a GO Pet
          </DialogTitle>
          <DialogDescription className="text-center">
            {message || 'Inicia sesión o crea tu cuenta para continuar'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Correo electrónico *</Label>
                <Input
                  id="login-email"
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => handleLoginInputChange('email', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="login-password">Contraseña *</Label>
                <Input
                  id="login-password"
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => handleLoginInputChange('password', e.target.value)}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="register-nombre">Nombre *</Label>
                  <Input
                    id="register-nombre"
                    required
                    value={registerData.nombre}
                    onChange={(e) => handleRegisterInputChange('nombre', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="register-apellidos">Apellidos *</Label>
                  <Input
                    id="register-apellidos"
                    required
                    value={registerData.apellidos}
                    onChange={(e) => handleRegisterInputChange('apellidos', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="register-email">Correo electrónico *</Label>
                <Input
                  id="register-email"
                  type="email"
                  required
                  value={registerData.email}
                  onChange={(e) => handleRegisterInputChange('email', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="register-direccion">Dirección *</Label>
                <Input
                  id="register-direccion"
                  required
                  value={registerData.direccion}
                  onChange={(e) => handleRegisterInputChange('direccion', e.target.value)}
                  placeholder="Ej: Av. Arequipa 123, San Isidro, Lima"
                />
              </div>
              
              <div>
                <Label htmlFor="register-password">Contraseña *</Label>
                <Input
                  id="register-password"
                  type="password"
                  required
                  minLength={5}
                  value={registerData.password}
                  onChange={(e) => handleRegisterInputChange('password', e.target.value)}
                  placeholder="Mínimo 5 caracteres"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
