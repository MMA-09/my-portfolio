import { useProgress } from '../store/useProgress';
import { chapterVisibility, chapterLocalProgress } from '../config/scenes';

export function useChapterVisibility(span) {
  const offset = useProgress((s) => s.offset);
  const visibility = chapterVisibility(offset, span);
  const local = chapterLocalProgress(offset, span);
  return { visibility, local, offset };
}
