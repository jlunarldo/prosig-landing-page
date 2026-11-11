export const LOGO = [
  "M0 120V61.9A137 137 0 0 1 22 32.3V0H120A128 128 0 0 0 30 37V120Z",
  "M120 0V80H42A82 82 0 0 0 120 0Z",
];

export const KEYS = ["indigo", "navy", "teal", "cyan"];

const hex = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

export const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

const isDark = () => {
  const t = document.documentElement.getAttribute("data-theme");
  return (
    t === "dark" ||
    (t !== "light" && matchMedia("(prefers-color-scheme: dark)").matches)
  );
};

export const getPalette = () =>
  isDark()
    ? {
        bg: "#0B0C2A",
        indigo: hex("#7C79FF"),
        navy: hex("#B4B2FF"),
        teal: hex("#00DCB8"),
        cyan: hex("#00BEC2"),
      }
    : {
        bg: "#FFFFFF",
        indigo: hex("#5653FF"),
        navy: hex("#000392"),
        teal: hex("#00DCB8"),
        cyan: hex("#00BEC2"),
      };

export const makeRng = (seed) => {
  let s = seed;
  return () => (s = (s * 9301 + 49297) % 233280) / 233280;
};

export const mix = (a, b, t) => a + (b - a) * t;

export const ease = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function drawPiece(ctx, x, y, s, rot, k) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rot * Math.PI) / 180);
  ctx.translate(-s / 2, -s / 2);
  const r = Math.max(0.001, k * s);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(s, 0);
  ctx.lineTo(s, s - r);
  ctx.arc(s, s, r, -Math.PI / 2, Math.PI, true);
  ctx.lineTo(0, s);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function sizeCanvas(cv) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const r = cv.getBoundingClientRect();
  cv.width = Math.max(1, r.width * dpr);
  cv.height = Math.max(1, r.height * dpr);
  const ctx = cv.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, W: r.width, H: r.height, dpr };
}

export function startLoop(fn) {
  let id;
  const tick = (now) => {
    fn(now);
    id = requestAnimationFrame(tick);
  };
  id = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(id);
}

export function watchTheme(cb) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const mq = matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => {
    mo.disconnect();
    mq.removeEventListener("change", cb);
  };
}