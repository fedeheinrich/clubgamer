import PlaceholderPage from '../components/common/PlaceholderPage';

function NotFound() {
  return (
    <PlaceholderPage
      title="Página no encontrada"
      description="La ruta que intentaste abrir no existe dentro de la aplicación."
      backLabel="Ir al inicio"
    />
  );
}

export default NotFound;