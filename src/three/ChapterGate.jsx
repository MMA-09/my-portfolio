import { useProgress } from '../store/useProgress';
import { chapterVisibility } from '../config/scenes';

export default function ChapterGate({ span, fadeFrac = 0.45, children }) {
  const active = useProgress((s) => chapterVisibility(s.offset, span, fadeFrac) > 0.002);
  return active ? children : null;
}
