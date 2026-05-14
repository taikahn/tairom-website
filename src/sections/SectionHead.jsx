export function SectionHead({ title, meta }) {
  return (
    <div className="section-head no-num">
      <h2 className="section-title">{title}</h2>
      <div className="section-meta">{meta}</div>
    </div>
  );
}
