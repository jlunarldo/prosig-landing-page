import { useEffect, useRef } from "react";
import {
  getPalette,
  makeRng,
  drawPiece,
  sizeCanvas,
  startLoop,
  watchTheme,
  prefersReducedMotion,
} from "./mosaicUtils";

export default function TextureMosaic({ className, style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const host = cv.parentElement;
    const reduce = prefersReducedMotion();

    let W, H, S, ctx;
    let cells = [];
    let P = getPalette();
    let pointer = null;

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

      const R = (mob
        ? Math.min(W * 0.56, H * 0.32)
        : Math.min(W * 0.32, H * 0.6)) * 0.62;

      cells = [];

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * S + S / 2;
          const y = j * S + S / 2;

          const dx = x - cx;
          const dy = y - cy;

          const inStar =
            Math.pow(Math.abs(dx), 2 / 3) +
              Math.pow(Math.abs(dy), 2 / 3) <=
            Math.pow(R, 2 / 3);

          const quad =
            dy < 0
              ? dx < 0
                ? "indigo"
                : "teal"
              : dx < 0
                ? "cyan"
                : "navy";

          cells.push({
            x,
            y,
            kick: 0,
            seed: rnd() * 6.28,

            r:
              dy < 0
                ? dx < 0
                  ? 180
                  : 270
                : dx < 0
                  ? 90
                  : 0,

            c: quad,
            a: inStar ? 1 : 0.05,
            k: inStar ? 0.18 : 1,
          });
        }
      }
    }

    const setPointer = (e) => {
      const r = cv.getBoundingClientRect();

      pointer = {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
      };
    };

    const clearPointer = () => {
      pointer = null;
    };

    let resizeTimer;

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 120);
    };

    host.addEventListener("pointermove", setPointer);
    host.addEventListener("pointerdown", setPointer);
    host.addEventListener("pointerleave", clearPointer);
    window.addEventListener("resize", onResize);

    const stopTheme = watchTheme(() => {
      P = getPalette();
    });

    const t0 = performance.now();
    let lastNow = t0;

    const stopLoop = startLoop((now) => {
      const dt = (now - lastNow) / 1000;
      lastNow = now;

      const r = cv.getBoundingClientRect();

      if (r.bottom < 0 || r.top > window.innerHeight) {
        return;
      }

      const t = (now - t0) / 1000;

      ctx.fillStyle = P.bg;
      ctx.fillRect(0, 0, W, H);

      const s = S - S * 0.08;

      for (const c of cells) {
        let rot = c.r;

        if (!reduce) {
          rot += Math.sin(t * 0.6 + c.seed) * 2;
        }

        if (pointer && !reduce) {
          const d = Math.hypot(
            c.x - pointer.x,
            c.y - pointer.y
          );

          if (d < S * 3.2) {
            c.kick = Math.min(
              c.kick +
                (1 - d / (S * 3.2)) * 18,
              90
            );
          }
        }

        c.kick *= 0.94;
        rot += c.kick;

        const color = P[c.c];

        ctx.globalAlpha = Math.min(
          1,
          c.a +
            (c.kick / 90) * 0.8
        );

        ctx.fillStyle = `rgb(
          ${color[0] | 0},
          ${color[1] | 0},
          ${color[2] | 0}
        )`;

        drawPiece(
          ctx,
          c.x,
          c.y,
          s,
          rot,
          c.k
        );
      }

      ctx.globalAlpha = 1;
    });

    layout();

    return () => {
      stopLoop();
      stopTheme();

      clearTimeout(resizeTimer);

      host.removeEventListener("pointermove", setPointer);
      host.removeEventListener("pointerdown", setPointer);
      host.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        ...style,
      }}
    />
  );
}