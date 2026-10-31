// Wave field on the home page: a family of curves through a Gaussian window.
// Shared by the server render (phase 0) and the client animation.
export const WAVE_ROWS = 22;

export function wavePath(row: number, phase = 0) {
  // Breathe by at most ±8% so the outer curves stay inside the frame.
  const amplitude = (23 + 17 * Math.sin(row / 7)) * (1 + .08 * Math.sin(phase * .5) * Math.cos(row * .2));
  return Array.from({ length: 101 }, (_, col) => {
    const x = col * 4.4;
    const envelope = Math.exp(-Math.pow((x - 234) / 124, 2));
    const y = 54 + row * 6.8 + Math.sin(x / 39 + row * .19 - phase) * envelope * amplitude;
    return `${col === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

export const waveOpacity = (row: number) => .22 + .64 * Math.sin((row + 1) / (WAVE_ROWS + 2) * Math.PI);
