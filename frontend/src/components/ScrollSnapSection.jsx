export default function ScrollSnapSection({ children, className = '', id }) {
  return (
    <section className={`snap-section ${className}`} id={id}>
      <div className="snap-section-inner">
        {children}
      </div>
    </section>
  );
}
