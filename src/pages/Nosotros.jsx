import { ALIADOS, EQUIPO } from '../data/secciones.js';
import { SITIO } from '../data/sitio.js';
import CabeceraPagina from '../components/ui/CabeceraPagina.jsx';
import logoVertical from '../assets/marca/logo-vertical.svg';
import simbolo from '../assets/marca/simbolo.svg';
import { Escalonado, ItemEscalonado } from '../components/ui/Escalonado.jsx';
import css from './Nosotros.module.css';

// Del manual de marca: qué significa el símbolo.
const SIGNIFICADO = [
  { titulo: 'Dos corrientes', texto: 'Dos vecinos distintos que confirman lo mismo.' },
  { titulo: 'Se unen en una sola', texto: 'La información confirmada sigue su curso hacia toda la comunidad.' },
  { titulo: 'El punto coral', texto: 'El reporte. Visto completo, el símbolo es una persona con los brazos en alto, y también la Y de FLUYA.' },
];

export default function Nosotros() {
  return (
    <>
      <CabeceraPagina
        titulo="Nosotros"
        intro="Somos estudiantes de la Universidad Tecnológica de Panamá. FLUYA nació para mostrar cómo el trabajo en equipo y la tecnología pueden proteger a un barrio."
      />

      <section className="contenedor" aria-labelledby="equipo">
        <div className={css.rejillaEquipo}>
          <div>
            <h2 id="equipo" className="titulo-seccion">
              El equipo
            </h2>
            <Escalonado as="ul" className={css.equipo}>
              {EQUIPO.map((p) => (
                <ItemEscalonado as="li" key={p.id} className={css.persona}>
                  <span className={css.iniciales} aria-hidden="true">
                    {p.iniciales}
                  </span>
                  <div>
                    <h3>{p.nombre}</h3>
                    <p>{p.rol}</p>
                  </div>
                </ItemEscalonado>
              ))}
            </Escalonado>
          </div>
          <figure className={css.logo}>
            <img src={logoVertical} alt="Logo de FLUYA" width="706" height="426" />
            <figcaption>Identidad visual: Josh Amaya.</figcaption>
          </figure>
        </div>
      </section>

      <section className={`seccion ${css.marca}`} aria-labelledby="simbolo">
        <div className={`contenedor ${css.rejillaMarca}`}>
          <img src={simbolo} alt="" width="240" height="240" className={css.simbolo} />
          <div>
            <h2 id="simbolo" className="titulo-seccion">
              La confluencia: dos corrientes que se vuelven una
            </h2>
            <ol className={css.significado}>
              {SIGNIFICADO.map((s) => (
                <li key={s.titulo}>
                  <h3>{s.titulo}</h3>
                  <p>{s.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={`seccion ${css.aliados}`} aria-labelledby="aliados">
        <div className="contenedor">
          <h2 id="aliados" className="titulo-seccion">
            Relación con las instituciones
          </h2>
          <p className="intro">
            Es una propuesta: FLUYA no tiene convenio con estas entidades ni habla en su nombre. Planteamos cómo podría complementarlas.
          </p>
          <ul className={css.listaAliados}>
            {ALIADOS.map((a) => (
              <li key={a.id}>
                <h3>{a.nombre}</h3>
                <p>{a.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="seccion" aria-labelledby="proyecto">
        <div className="contenedor">
          <h2 id="proyecto" className="titulo-seccion">
            El proyecto
          </h2>
          <p className="intro">{SITIO.proyecto}</p>
          <p className="intro">{SITIO.ideaClave}</p>
        </div>
      </section>
    </>
  );
}
