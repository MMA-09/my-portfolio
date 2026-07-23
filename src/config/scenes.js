// Palette carried over from the original identity.
export const GRIP = '#ff5a36';
export const LANE = '#ffcc33';
export const TEAL = '#4fd1c5';
export const ASPHALT = '#0d0f13';

// 11 camera keyframes = 10 scroll segments. Camera flies in -Z through a
// sequence of "worlds" that sit at fixed Z stations; each world's content is
// static in space, the camera moves through it. Projects share one station
// with the camera panning sideways between three nodes instead of diving deeper.
export const KEYFRAMES = [
  { key: 'board', worldZ: 0, pos: [0, 0.6, 5.6], look: [0, -0.4, 0], fov: 42, accent: GRIP, fog: 0.032 },
  { key: 'origin', worldZ: -16, pos: [2.1, 0.4, -10.6], look: [0, -0.1, -16], fov: 36, accent: TEAL, fog: 0.045 },
  { key: 'learning', worldZ: -32, pos: [-2.6, 1.3, -26], look: [0, 0.35, -32], fov: 40, accent: LANE, fog: 0.04 },
  { key: 'build', worldZ: -48, pos: [2.6, 0.7, -42], look: [0, 0, -48], fov: 40, accent: GRIP, fog: 0.045 },
  { key: 'proj-1', worldZ: -64, pos: [-7, 0.6, -58], look: [-7, 0, -64], fov: 38, accent: TEAL, fog: 0.04 },
  { key: 'proj-2', worldZ: -64, pos: [0, 0.6, -58], look: [0, 0, -64], fov: 38, accent: LANE, fog: 0.04 },
  { key: 'proj-3', worldZ: -64, pos: [7, 0.6, -58], look: [7, 0, -64], fov: 38, accent: GRIP, fog: 0.04 },
  { key: 'toolkit', worldZ: -80, pos: [0, 1.0, -74], look: [0, 0.2, -80], fov: 42, accent: TEAL, fog: 0.04 },
  { key: 'journey', worldZ: -96, pos: [0, 1.2, -90], look: [0, 0, -96], fov: 44, accent: GRIP, fog: 0.05 },
  { key: 'current', worldZ: -112, pos: [0, 0.7, -107], look: [0, 0, -112], fov: 38, accent: TEAL, fog: 0.04 },
  { key: 'final', worldZ: -128, pos: [0, 0.5, -122], look: [0, -0.1, -128], fov: 40, accent: GRIP, fog: 0.06 },
];

export const SEGMENTS = KEYFRAMES.length - 1; // 10
export const PAGES = SEGMENTS;

// Chapters group keyframes for the HUD + text overlays.
// span = inclusive [fromKeyframe, toKeyframe] index range.
export const CHAPTERS = [
  { id: 'board', label: 'THE BOARD', mono: 'CH.01', span: [0, 0] },
  { id: 'origin', label: 'ORIGIN', mono: 'CH.02', span: [1, 1] },
  { id: 'learning', label: 'LEARNING', mono: 'CH.03', span: [2, 2] },
  { id: 'build', label: 'BUILD', mono: 'CH.04', span: [3, 3] },
  { id: 'projects', label: 'PROJECTS', mono: 'CH.05', span: [4, 6] },
  { id: 'toolkit', label: 'TOOLKIT', mono: 'CH.06', span: [7, 7] },
  { id: 'journey', label: 'JOURNEY', mono: 'CH.07', span: [8, 8] },
  { id: 'current', label: 'CURRENT POSITION', mono: 'CH.08', span: [9, 9] },
  { id: 'final', label: 'NEXT LINE', mono: 'CH.09', span: [10, 10] },
];

export const TOTAL_FRAMES = 120;

// Pad point-spans (most chapters own a single keyframe) out to a full
// keyframe-unit-wide hold range so text has a comfortable read window
// instead of only being at full opacity for a single instant of scroll.
export function chapterOffsetRange(span) {
  const from = Math.max(span[0] - 0.5, 0) / SEGMENTS;
  const to = Math.min(span[1] + 0.5, SEGMENTS) / SEGMENTS;
  return [from, to];
}

// Smooth 0..1..0 visibility for a chapter given the global scroll offset,
// with an ease-in/out margin bleeding into neighboring transitions.
export function chapterVisibility(offset, span, fadeFrac = 0.14) {
  const [from, to] = chapterOffsetRange(span);
  const span_ = Math.max(to - from, 1 / SEGMENTS);
  const fade = Math.max(span_ * fadeFrac, 0.03);
  if (offset < from - fade || offset > to + fade) return 0;
  if (offset < from) return (offset - (from - fade)) / fade;
  if (offset > to) return 1 - (offset - to) / fade;
  return 1;
}

// Local 0..1 progress across a chapter's own span (for internal animation,
// e.g. which project node is focused, or path travel within Journey).
export function chapterLocalProgress(offset, span) {
  const [from, to] = chapterOffsetRange(span);
  if (to <= from) return offset >= from ? 1 : 0;
  return Math.min(Math.max((offset - from) / (to - from), 0), 1);
}

export function currentChapterIndex(offset) {
  const scaled = offset * SEGMENTS;
  let idx = 0;
  for (let i = 0; i < CHAPTERS.length; i++) {
    const [from, to] = CHAPTERS[i].span;
    if (scaled >= from - 0.5 && scaled <= to + 0.5) idx = i;
  }
  return idx;
}
