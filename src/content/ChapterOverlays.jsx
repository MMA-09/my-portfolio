import { useChapterVisibility } from './useChapterVisibility';
import Headline from './Headline';
import { HERO, ORIGIN, LEARNING, BUILD, PROJECTS, TOOLKIT, JOURNEY, CURRENT, FINAL } from './sceneContent';
import './overlays.css';

const PROJECT_SPANS = [
  [4, 4],
  [5, 5],
  [6, 6],
];
const PROJECT_POS = ['pos-left-bottom', 'pos-bottom-center', 'pos-right-bottom'];

function Panel({ span, position, children, rise = 26 }) {
  const { visibility } = useChapterVisibility(span);
  if (visibility <= 0.001) return null;
  return (
    <div
      className={`scene-panel ${position}`}
      style={{
        opacity: visibility,
        transform: `${position.includes('center') && !position.includes('bottom') ? 'translate(-50%,-50%)' : position.includes('center') ? 'translateX(-50%)' : 'none'} translateY(${(1 - visibility) * rise}px)`,
        filter: `blur(${(1 - visibility) * 6}px)`,
      }}
    >
      {children}
    </div>
  );
}

export default function ChapterOverlays() {
  return (
    <>
      <Panel span={[0, 0]} position="pos-bottom-center">
        <div className="scene-mono">{HERO.kicker}</div>
        <Headline lines={HERO.headline} />
        <p className="scene-body">{HERO.body}</p>
        <div className="scene-cue">{HERO.scrollCue}</div>
        <div className="scene-cue" style={{ marginTop: 10, opacity: 0.75 }}>
          <span style={{ color: 'var(--grip)' }}>◆</span> {HERO.tapHint}
        </div>
      </Panel>

      <Panel span={[1, 1]} position="pos-left-center">
        <div className="scene-mono" style={{ color: 'var(--teal)' }}>
          {ORIGIN.mono}
        </div>
        <Headline lines={ORIGIN.headline} />
        <p className="scene-body">{ORIGIN.body}</p>
      </Panel>

      <Panel span={[2, 2]} position="pos-right-center">
        <div className="scene-mono" style={{ color: 'var(--lane)' }}>
          {LEARNING.mono}
        </div>
        <Headline lines={LEARNING.headline} />
        <p className="scene-body">{LEARNING.body}</p>
        <div className="scene-blocks">
          {LEARNING.blocks.map((b) => (
            <div key={b.tag}>
              <div className="scene-block-tag">{b.tag}</div>
              <div className="scene-block-title">{b.title}</div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel span={[3, 3]} position="pos-left-center">
        <div className="scene-mono">{BUILD.mono}</div>
        <Headline lines={BUILD.headline} />
        <p className="scene-body">{BUILD.body}</p>
        <div className="scene-blocks">
          {BUILD.blocks.map((b) => (
            <div key={b.tag}>
              <div className="scene-block-tag" style={{ color: 'var(--grip)' }}>
                {b.tag}
              </div>
              <div className="scene-block-title">{b.title}</div>
            </div>
          ))}
        </div>
      </Panel>

      {PROJECTS.map((p, i) => (
        <Panel key={p.name} span={PROJECT_SPANS[i]} position={PROJECT_POS[i]}>
          <div className="project-frame mono">{p.frame}</div>
          <div className="project-number">{p.number}</div>
          <div className="project-name">{p.name}</div>
          <p className="project-desc">{p.description}</p>
          <div className="project-meta">
            <div>
              <b>ROLE</b> — {p.role}
            </div>
            <div>
              <b>TECH</b> — {p.tech}
            </div>
            <div>
              <b>STATUS</b> — {p.status}
            </div>
          </div>
          <a className="project-view" href="#">
            VIEW PROJECT →
          </a>
        </Panel>
      ))}

      <Panel span={[7, 7]} position="pos-top-center">
        <div className="scene-mono" style={{ color: 'var(--teal)' }}>
          {TOOLKIT.mono}
        </div>
        <Headline lines={TOOLKIT.headline} />
        <p className="scene-body">{TOOLKIT.body}</p>
      </Panel>

      <Panel span={[8, 8]} position="pos-top-center">
        <div className="scene-mono">{JOURNEY.mono}</div>
        <Headline lines={JOURNEY.headline} />
        <p className="scene-body">{JOURNEY.body}</p>
      </Panel>

      <Panel span={[9, 9]} position="pos-center">
        <div className="scene-mono" style={{ color: 'var(--teal)' }}>
          {CURRENT.mono}
        </div>
        <Headline lines={CURRENT.headline} />
        <div className="status-rows">
          {CURRENT.status.map((s) => (
            <div className="status-row" key={s.label}>
              <span className="label">{s.label}</span>
              <span className="value">{s.value}</span>
            </div>
          ))}
        </div>
        <p className="scene-body">{CURRENT.body}</p>
      </Panel>

      <Panel span={[10, 10]} position="pos-bottom-center">
        <div className="scene-mono">{FINAL.mono}</div>
        <Headline lines={FINAL.headline} />
        <p className="scene-body">{FINAL.body}</p>
        <div className="scene-links">
          {FINAL.links.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
      </Panel>
    </>
  );
}
