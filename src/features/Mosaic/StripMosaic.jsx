import { useEffect, useRef } from "react";

import {
  KEYS,
  getPalette,
  makeRng,
  drawPiece,
  sizeCanvas,
  startLoop,
  watchTheme,
  prefersReducedMotion,
} from "./mosaicUtils";

export default function StripMosaic({
  className = "",
  style,
  seed = 3,
  rows = 2,
  density = 0.55,
  alpha = 1,
  canvasId,
  canvasRef
}) {
  

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const host = cv.parentElement;
    const reduce = prefersReducedMotion();

    let ctx;
    let W;
    let H;
    let cells = [];
    let P = getPalette();

    function layout() {
      P = getPalette();

      ({ ctx, W, H } = sizeCanvas(cv));

      const rnd = makeRng(seed);

      const S = H / rows;
      const cols = Math.ceil(W / S);

      cells = [];

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          cells.push({
            x: i * S + S / 2,
            y: j * S + S / 2,
            s: S * 0.9,
            r: Math.floor(rnd() * 4) * 90,
            c: KEYS[Math.floor(rnd() * 4)],
            on: rnd() < density,
            d: i / cols,
          });
        }
      }
    }

    let resizeTimer;

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 120);
    }

    window.addEventListener("resize", onResize);

    const stopTheme = watchTheme(() => {
      P = getPalette();
    });

    layout();

    const stopLoop = startLoop(() => {
      const r = cv.getBoundingClientRect();

      if (
        r.bottom < -50 ||
        r.top > window.innerHeight + 50
      ) {
        return;
      }

      const p = reduce
        ? 0.5
        : Math.max(
            0,
            Math.min(
              1,
              1 -
                (r.top + r.height / 2) /
                  window.innerHeight
            )
          );

      ctx.clearRect(0, 0, W, H);

      for (const c of cells) {
        if (!c.on) continue;

        const local = Math.max(
          0,
          Math.min(
            1,
            p * 1.6 - c.d * 0.6
          )
        );

        const col = P[c.c];

        ctx.globalAlpha = alpha;

        ctx.fillStyle = `rgb(
          ${col[0]},
          ${col[1]},
          ${col[2]}
        )`;

        drawPiece(
          ctx,
          c.x,
          c.y,
          c.s,
          c.r + ease(local) * 180,
          1
        );
      }

      ctx.globalAlpha = 1;
    });

    return () => {
      stopLoop();
      stopTheme();

      clearTimeout(resizeTimer);

      window.removeEventListener("resize", onResize);
    };
  }, [seed, rows, density, alpha, canvasRef]);

  return null;
}

const ease = (x) => {
  x = Math.max(0, Math.min(1, x));
  return x * x * (3 - 2 * x);
};