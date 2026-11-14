
import { useEffect, useRef } from "react";

import {
  KEYS,
  LOGO,
  getPalette,
  makeRng,
  drawPiece,
  sizeCanvas,
  startLoop,
  watchTheme,
  prefersReducedMotion,
} from "./mosaicUtils";



const PHASES = [
  [0, "F"],
  [0.18, "F"],
  [0.4, "P"],
  [0.56, "P"],
  [0.78, "Z"],
  [1, "Z"],
];

const mix = (a, b, f) => a + (b - a) * f;

const ease = (x) => {
  x = Math.max(0, Math.min(1, x));
  return x * x * (3 - 2 * x);
};

export default function HeroMosaic({
  progress = 0,
  logoPaths = LOGO,
  className,
  style, canvasId
}) {
  const canvasRef = useRef(null);
  const progressRef = useRef(progress);

 
  progressRef.current = progress;

  useEffect(() => {
    const cv = document.getElementById(canvasId);

    if (!cv) return;
    const host = cv.parentElement;

    const reduce = prefersReducedMotion();

    let W, H, S, ctx;
    let cells = [];
    let P = getPalette();
    let pointer = null;
    let shown = 0;

    const phases = PHASES;

    function stateAt(p) {
      for (let n = 0; n < phases.length - 1; n++) {
        const [a, A] = phases[n];
        const [b, B] = phases[n + 1];

        if (p <= b) {
          return [A, B, ease((p - a) / (b - a || 1))];
        }
      }

      const last = phases[phases.length - 1][1];

      return [last, last, 1];
    }

    function layout() {
      P = getPalette();

      ({ ctx, W, H } = sizeCanvas(cv));

      const rnd = makeRng(11);

      S = W < 861 ? 18 : 26;

      const cols = Math.ceil(W / S) + 1;
      const rows = Math.ceil(H / S) + 1;
      const mob = W < 861;

      const cx = mob ? W / 2 : W * 0.74;
      const cy = mob ? H * 0.3 : H * 0.5;

      const B = mob
        ? Math.min(W * 0.56, H * 0.32)
        : Math.min(W * 0.32, H * 0.6);

      const dpr = cv.width / W;

      const matrix = new DOMMatrix()
        .translate(cx - B / 2, cy - B / 2)
        .scale(B / 120);

      const path = new Path2D();

      logoPaths.forEach((d) => {
        path.addPath(new Path2D(d), matrix);
      });

      const R = B * 0.62;

      cells = [];

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * S + S / 2;
          const y = j * S + S / 2;

          const dx = x - cx;
          const dy = y - cy;

          const inP = ctx.isPointInPath(
            path,
            x * dpr,
            y * dpr
          );

          const inStar =
            Math.pow(Math.abs(dx), 2 / 3) +
            Math.pow(Math.abs(dy), 2 / 3) <=
            Math.pow(R, 2 / 3);

          const quad =
            dy < 0
              ? dx < 0 ? "indigo" : "teal"
              : dx < 0 ? "cyan" : "navy";

          const quiet = mob
            ? Math.max(0.06, Math.min(1, (H * 0.5 - y) / (H * 0.08)))
            : Math.max(0.05, Math.min(1, (x - W * 0.5) / (W * 0.08)));

          cells.push({
            x,
            y,
            kick: 0,
            seed: rnd() * 6.28,
            quiet,

            F: {
              r: Math.floor(rnd() * 4) * 90,
              c: KEYS[Math.floor(rnd() * 4)],
              a: rnd() < 0.62 ? 1 : 0,
              k: 1,
            },

            W: {
              r: ((i + j) % 4) * 90,
              c: KEYS[Math.floor((i + j) / 3) % 4],
              a: 0.95,
              k: 1,
            },

            P: {
              r: 0,
              c: "navy",
              a: inP ? 1 : 0.07,
              k: inP ? 0.12 : 1,
            },

            Z: {
              r: dy < 0
                ? dx < 0 ? 180 : 270
                : dx < 0 ? 90 : 0,
              c: quad,
              a: inStar ? 1 : 0.05,
              k: inStar ? 0.18 : 1,
            },
          });
        }
      }
    }

    function setPointer(e) {
      const r = cv.getBoundingClientRect();

      pointer = {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
      };
    }

    function clearPointer() {
      pointer = null;
    }

    function onPointerUp() {
      if (window.matchMedia("(pointer: coarse)").matches) {
        setTimeout(clearPointer, 140);
      }
    }

    let resizeTimer;

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 120);
    }

    host.addEventListener("pointermove", setPointer);
    host.addEventListener("pointerdown", setPointer);
    host.addEventListener("pointerleave", clearPointer);

    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", onResize);

    const stopTheme = watchTheme(() => {
      P = getPalette();
    });

    layout();

    const t0 = performance.now();

    const stopLoop = startLoop((now) => {
      const r = cv.getBoundingClientRect();

      if (r.bottom < 0 || r.top > window.innerHeight) {
        return;
      }

      const t = (now - t0) / 1000;

      const target = Math.max(
        0,
        Math.min(1, progressRef.current)
      );

      shown += (target - shown) * (reduce ? 1 : 0.09);

      const [A, B, f] = stateAt(shown);

      ctx.fillStyle = P.bg;
      ctx.fillRect(0, 0, W, H);

      const s = S - S * 0.08;

      for (const c of cells) {
        const a = c[A];
        const b = c[B];

        const alpha = mix(a.a, b.a, f);

        if (alpha < 0.01) continue;

        let rot = mix(a.r, b.r, f);

        const loose =
          (A === "F" ? 1 - f : 0) +
          (A === "W" && B === "W" ? 0.35 : 0);

        if (!reduce) {
          rot += Math.sin(t * 0.6 + c.seed) * 6 * loose;
        }

        if (pointer && !reduce) {
          const d = Math.hypot(
            c.x - pointer.x,
            c.y - pointer.y
          );

          if (d < S * 3.2) {
            c.kick = Math.min(
              c.kick + (1 - d / (S * 3.2)) * 18,
              90
            );
          }
        }

        c.kick *= 0.94;
        rot += c.kick;

        const ca = P[a.c];
        const cb = P[b.c];

        ctx.globalAlpha = Math.min(
          1,
          alpha * c.quiet +
            (c.kick / 90) * 0.8 * (alpha > 0 ? 1 : 0)
        );

        ctx.fillStyle = `rgb(
          ${mix(ca[0], cb[0], f) | 0},
          ${mix(ca[1], cb[1], f) | 0},
          ${mix(ca[2], cb[2], f) | 0}
        )`;

        drawPiece(
          ctx,
          c.x,
          c.y,
          s,
          rot,
          mix(a.k, b.k, f)
        );
      }

      ctx.globalAlpha = 1;
    });

    return () => {
      stopLoop();
      stopTheme();

      clearTimeout(resizeTimer);

      host.removeEventListener("pointermove", setPointer);
      host.removeEventListener("pointerdown", setPointer);
      host.removeEventListener("pointerleave", clearPointer);

      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
    };
  }, [logoPaths, canvasId]);

  return null;
}
