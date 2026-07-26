import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

import Welcome from './pages/Bienvenida';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Juegos from './pages/Juegos';
import Coleccion from './pages/Coleccion';
import Detalles from './pages/Detalles';
import Inicio from './pages/Inicio';
import NotFound from './pages/NotFound';
import './App.css';
import ProtectedRoute from './components/common/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos - evita refetches innecesarios
      refetchOnWindowFocus: false, // evita re-renders al volver a la pestaña
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<Welcome />} />

            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/detalles/:id" element={<Detalles />} />
            <Route path="/juegos" element={<Juegos />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/coleccion" element={<ProtectedRoute><Coleccion /></ProtectedRoute>} />
            <Route path="/inicio" element={<Inicio />} />
          </Routes>
        </div>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
