export default function Headline({ lines, className = '', mask = 0 }) {
  return (
    <h2
      className={`scene-headline display ${className}`}
      style={mask ? { clipPath: `inset(0 ${100 - mask * 100}% 0 0)` } : undefined}
    >
      {lines.map((line, i) => (
        <span className="scene-headline-line" key={i}>
          {Array.isArray(line)
            ? line.map((seg, j) =>
                typeof seg === 'string' ? seg : (
                  <span className="accent" key={j}>
                    {seg.accent}
                  </span>
                )
              )
            : line}
        </span>
      ))}
    </h2>
  );
}
