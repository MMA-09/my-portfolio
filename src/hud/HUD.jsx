import { useEffect, useState } from 'react';
import { useProgress } from '../store/useProgress';
import { CHAPTERS, TOTAL_FRAMES, currentChapterIndex } from '../config/scenes';
import './hud.css';

export default function HUD({ ready }) {
  const offset = useProgress((s) => s.offset);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (ready) {
      const t = setTimeout(() => setShow(true), 200);
      return () => clearTimeout(t);
    }
  }, [ready]);

  const frame = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(offset * TOTAL_FRAMES) + 1));
  const chapterIdx = currentChapterIndex(offset);
  const chapter = CHAPTERS[chapterIdx];

  return (
    <div className={`hud ${show ? 'show' : ''}`}>
      <div className="hud-corner hud-tl">
        <span className="dot" />
        M.A. · BUILDER
      </div>

      <div className="hud-corner hud-tr">
        <div className="frame-num">FRAME {String(frame).padStart(3, '0')}</div>
        <div>/ {TOTAL_FRAMES}</div>
      </div>

      <div className="hud-progress">
        {CHAPTERS.map((ch, i) => (
          <div key={ch.id} className={`hud-progress-item ${i === chapterIdx ? 'active' : i < chapterIdx ? 'done' : ''}`}>
            <span className="hud-progress-label">{ch.label}</span>
            <span className="hud-progress-dot" />
          </div>
        ))}
      </div>

      <div className="hud-corner hud-bl" style={{ opacity: offset < 0.03 ? 1 : 0 }}>
        SCROLL TO PLAY →
      </div>

      <div className="hud-corner hud-br">
        <div className="chapter-name">{chapter.mono} — {chapter.label}</div>
      </div>
    </div>
  );
}
