// Wave field on the home page, read left to right: sparse noisy samples (observations),
// the smooth curves they come from (representation), and those curves rolled forward
// in time (dynamics). Shared by the server render (phase 0) and the client animation.
export const WAVE_ROWS = 22;

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
// Every sample is a zero-length segment drawn as a dot by the round line cap.
export function observationPath(row: number, phase = 0) {
  const dots = [];
  for (let col = 0, x = 6; x <= 184; col++, x += 8.8) {
    if (hash(row, col, 1) < .45) continue;
    const y = waveY(row, x, phase) + (hash(row, col, 2) - .5) * 7;
    dots.push(`M${x.toFixed(1)},${y.toFixed(1)}h0`);
  }
  return dots.join('');
}

// Representation and dynamics: the smooth curve between `from` and `to`; `ahead`
// shifts it forward in time.
export function curvePath(row: number, phase = 0, from = 120, to = 440, ahead = 0) {
  const points = [];
  for (let x = from; x <= to + .01; x += 4.4) {
    points.push(`${points.length === 0 ? 'M' : 'L'}${x.toFixed(1)},${waveY(row, x, phase + ahead).toFixed(1)}`);
  }
  return points.join(' ');
}

// Future states drawn behind the curve on the right, fainter the further ahead.
export const FUTURE_STEPS = [{ ahead: .5, opacity: .4 }, { ahead: 1, opacity: .2 }];

export const waveOpacity = (row: number) => .22 + .64 * Math.sin((row + 1) / (WAVE_ROWS + 2) * Math.PI);
