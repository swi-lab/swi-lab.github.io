// Wave field on the home page, read left to right: sparse noisy samples (observations),
// the smooth curves they come from (representation), and those curves rolled forward
// in time (dynamics). Shared by the server render (an SVG at phase 0) and the client
// animation (drawn on a canvas, which browsers repaint far more cheaply than SVG paths).
export const WAVE_ROWS = 22;

// Every layer is stroked along one colour ramp (#d4b16c → #ecdcad at x 242 → #73afbc) and
// fades in or out over a short stretch through stop opacity. Stops are [x, colour on the
// ramp, opacity]; x runs over the 440-unit width of the field.
export const WAVE_LAYERS = {
  data: { width: 2.4, stops: [[0, '#d4b16c', 1], [120, '#e0c68c', 1], [184, '#e6d29d', 0]] },
  future: { width: 1, stops: [[282, '#d4d3b0', 0], [346, '#acc4b5', 1], [440, '#73afbc', 1]] },
  model: { width: 1.25, stops: [[120, '#e0c68c', 0], [176, '#e5d09b', 1], [242, '#ecdcad', 1], [440, '#73afbc', 1]] },
} as const;

type Point = [number, number];

function waveY(row: number, x: number, phase: number) {
  // Breathe by at most ±8% so the outer curves stay inside the frame.
  const amplitude = (23 + 17 * Math.sin(row / 7)) * (1 + .08 * Math.sin(phase * .5) * Math.cos(row * .2));
  const envelope = Math.exp(-Math.pow((x - 220) / 170, 2));
  return 54 + row * 6.8 + Math.sin(x / 39 + row * .19 - phase) * envelope * amplitude;
}

// Deterministic pseudo-random number in [0, 1), so the server and client agree.
function hash(row: number, col: number, salt: number) {
  const s = Math.sin(row * 127.1 + col * 311.7 + salt * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

// Observations: about half of the samples on each curve, each nudged by noise.
export function observationPoints(row: number, phase = 0) {
  const points: Point[] = [];
  for (let col = 0, x = 6; x <= 184; col++, x += 8.8) {
    if (hash(row, col, 1) < .45) continue;
    points.push([x, waveY(row, x, phase) + (hash(row, col, 2) - .5) * 7]);
  }
  return points;
}

// Representation and dynamics: the smooth curve between `from` and `to`; `ahead`
// shifts it forward in time.
export function curvePoints(row: number, phase = 0, from = 120, to = 440, ahead = 0) {
  const points: Point[] = [];
  for (let x = from; x <= to + .01; x += 4.4) points.push([x, waveY(row, x, phase + ahead)]);
  return points;
}

// In SVG every observation is a zero-length segment drawn as a dot by the round line cap.
export const observationPath = (row: number) =>
  observationPoints(row).map(([x, y]) => `M${x.toFixed(1)},${y.toFixed(1)}h0`).join('');

export const curvePath = (...args: Parameters<typeof curvePoints>) =>
  curvePoints(...args).map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

// Future states drawn behind the curve on the right, fainter the further ahead.
export const FUTURE_STEPS = [{ ahead: .5, opacity: .4 }, { ahead: 1, opacity: .2 }];

export const waveOpacity = (row: number) => .22 + .64 * Math.sin((row + 1) / (WAVE_ROWS + 2) * Math.PI);
