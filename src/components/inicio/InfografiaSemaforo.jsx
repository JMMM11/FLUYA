import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { CheckLg, PatchCheckFill } from 'react-bootstrap-icons';
import { NIVELES } from '../../data/semaforo.js';
import EstadoBadge from '../ui/EstadoBadge.jsx';
import css from './InfografiaSemaforo.module.css';

// Infografía animada del semáforo, dibujada con el símbolo de la marca:
// el punto coral es el reporte, las dos corrientes son los vecinos que lo
// confirman y, al unirse, la información sigue su curso hasta la fuente oficial.
// Recorre los 4 niveles mientras está en pantalla; con "reducir movimiento"
// se muestra completa y quieta.
const CONFIRMACIONES = [0, 2, 3, 3];
const DURACION = 2600;

const trazo = (visible, retraso = 0) => ({
  initial: false,
  animate: { pathLength: visible ? 1 : 0 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: visible ? retraso : 0 },
});

const aparece = (visible, retraso = 0) => ({
  initial: false,
  animate: { scale: visible ? 1 : 0, opacity: visible ? 1 : 0 },
  transition: { type: 'spring', stiffness: 320, damping: 18, delay: visible ? retraso : 0 },
});

export default function InfografiaSemaforo() {
  const raiz = useRef(null);
  const enVista = useInView(raiz, { amount: 0.4 });
  const reducir = useReducedMotion();
  const [paso, setPaso] = useState(reducir ? 3 : 0);

  useEffect(() => {
    if (reducir || !enVista) return;
    const t = setInterval(() => setPaso((p) => (p + 1) % 4), DURACION);
    return () => clearInterval(t);
  }, [enVista, reducir]);

  const nivel = NIVELES[paso];

  return (
    <figure ref={raiz} className={css.infografia}>
      <div className={css.cabecera}>
        <p className={css.titulo}>Así sube una alerta</p>
        <EstadoBadge nivel={nivel.nivel} />
      </div>

      <svg viewBox="0 0 300 330" className={css.dibujo} aria-hidden="true">
        {/* Cauce de fondo: el símbolo de FLUYA */}
        <g className={css.cauce}>
          <path d="M60 40 C60 120 150 130 150 200" />
          <path d="M240 40 C240 120 150 130 150 200" />
          <path d="M150 196 L150 286" />
        </g>
        {/* Corrientes que se llenan con cada nivel */}
        <g className={css.corriente}>
          <motion.path d="M60 40 C60 120 150 130 150 200" {...trazo(paso >= 1)} />
          <motion.path d="M240 40 C240 120 150 130 150 200" {...trazo(paso >= 1, 0.15)} />
          <motion.path d="M150 196 L150 286" {...trazo(paso >= 2, 0.1)} />
        </g>

        {/* El reporte: punto coral que late mientras espera confirmación */}
        <motion.circle
          cx="150"
          cy="58"
          r="17"
          className={css.reporte}
          animate={paso === 0 && !reducir ? { scale: [1, 1.18, 1] } : { scale: 1 }}
          transition={{ duration: 1.2, repeat: paso === 0 ? Infinity : 0 }}
          style={{ transformOrigin: '150px 58px' }}
        />

        {/* Vecinos que confirman */}
        {[
          [60, 40, 0],
          [240, 40, 0.15],
        ].map(([x, y, r]) => (
          <motion.g key={x} {...aparece(paso >= 1, r)} style={{ transformOrigin: `${x}px ${y}px` }}>
            <circle cx={x} cy={y} r="20" className={css.vecino} />
            <CheckLg x={x - 10} y={y - 10} width="20" height="20" className={css.check} />
          </motion.g>
        ))}

        {/* Tercera confirmación: llega por el tronco */}
        <motion.g {...aparece(paso >= 2, 0.3)} style={{ transformOrigin: '150px 200px' }}>
          <circle cx="150" cy="200" r="16" className={css.vecino} />
          <CheckLg x="141" y="191" width="18" height="18" className={css.check} />
        </motion.g>

        {/* Fuente oficial al final del cauce */}
        <motion.g {...aparece(paso >= 3, 0.2)} style={{ transformOrigin: '150px 292px' }}>
          <circle cx="150" cy="292" r="28" className={css.sello} />
          <PatchCheckFill x="134" y="276" width="32" height="32" className={css.selloIcono} />
        </motion.g>
      </svg>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={paso}
          className={css.explicacion}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <p className={css.cuenta}>
            {paso === 3 ? 'SINAPROC · IDAAN · Municipio' : `${CONFIRMACIONES[paso]} de 3 confirmaciones`}
          </p>
          <p>{nivel.regla}</p>
        </motion.div>
      </AnimatePresence>

      {/* Pasos: también sirven para saltar a un nivel */}
      <ol className={css.pasos}>
        {NIVELES.map((n, i) => (
          <li key={n.id}>
            <button
              type="button"
              className={css.paso}
              aria-current={i === paso ? 'step' : undefined}
              onClick={() => setPaso(i)}
            >
              {i === paso && <motion.span layoutId="info-paso" className={css.marca} />}
              <span className={css.numero}>{n.nivel}</span>
              <span className={css.nombrePaso}>{n.corto}</span>
            </button>
          </li>
        ))}
      </ol>

      <figcaption className="visualmente-oculto">
        Infografía: un reporte de un vecino pasa a En confirmación con dos confirmaciones de vecinos distintos, a
        Confirmado con tres, y a Oficial cuando un moderador lo respalda con SINAPROC, el IDAAN o el Municipio.
      </figcaption>
    </figure>
  );
}
