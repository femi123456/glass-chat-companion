export function Background() {
  return (
    <>
      <div
        className="blob animate-blob-1"
        style={{
          width: 500,
          height: 500,
          background: "var(--blob-purple)",
          top: "-10%",
          left: "-5%",
        }}
      />
      <div
        className="blob animate-blob-2"
        style={{
          width: 600,
          height: 600,
          background: "var(--blob-blue)",
          top: "30%",
          right: "-10%",
        }}
      />
      <div
        className="blob animate-blob-3"
        style={{
          width: 550,
          height: 550,
          background: "var(--blob-teal)",
          bottom: "-15%",
          left: "30%",
        }}
      />
      <div className="noise-overlay" />
    </>
  );
}
