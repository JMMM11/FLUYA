import { Link } from 'wouter';
import CabeceraPagina from '../components/ui/CabeceraPagina.jsx';
import simbolo from '../assets/marca/simbolo.svg';

export default function NoEncontrada() {
  return (
    <CabeceraPagina titulo="Esta página no existe" intro="Puede que el enlace esté mal escrito o que la página se haya movido.">
      <img src={simbolo} alt="" width="72" height="72" style={{ display: 'block', marginBottom: 'var(--s-4)' }} />
      <Link to="/" className="btn btn-accion">
        Volver al inicio
      </Link>
    </CabeceraPagina>
  );
}
