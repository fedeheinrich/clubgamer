import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

import Welcome from './pages/Bienvenida';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Juegos from './pages/Juegos';
import Colecciones from './pages/Colecciones';
import NotFound from './pages/NotFound';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/inicio" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/juegos" element={<Juegos />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/colecciones" element={<Colecciones />} />
          </Routes>
        </div>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;