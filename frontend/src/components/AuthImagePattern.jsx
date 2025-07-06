import React, { useMemo } from "react";

const SHAPES = [
  (x, y) => (
    <rect x={x} y={y} width="6" height="6" fill="currentColor" rx="1" />
  ),
  (x, y) => (
    <polygon
      points={`${x + 3},${y} ${x + 6},${y + 6} ${x},${y + 6}`}
      fill="currentColor"
    />
  ),
  (x, y) => (
    <g stroke="currentColor" strokeWidth="1">
      <line x1={x + 1} y1={y + 1} x2={x + 5} y2={y + 5} />
      <line x1={x + 1} y1={y + 5} x2={x + 5} y2={y + 1} />
    </g>
  ),
  (x, y) => (
    <polygon
      points={`
        ${x + 3},${y}
        ${x + 6},${y + 1.5}
        ${x + 6},${y + 4.5}
        ${x + 3},${y + 6}
        ${x},${y + 4.5}
        ${x},${y + 1.5}
      `}
      fill="currentColor"
    />
  ),
];


const generateRandomShapes = (cols = 30, rows = 20, gap = 20) => {
  const elements = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const shapeFn = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const posX = x * gap;
      const posY = y * gap;
      elements.push(shapeFn(posX, posY));
    }
  }
  return elements;
};

const PatternBackground = () => {
  const gap = 28;
  const cols = 30;
  const rows = 20;

  const shapes = useMemo(() => generateRandomShapes(cols, rows, gap), []);
  const width = cols * gap;
  const height = rows * gap;

  return (
    <div className="absolute inset-0 pl-12">
      <svg
        className="w-full h-full opacity-20 text-neutral-400 dark:text-neutral-600"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {shapes}
      </svg>
    </div>
  );
};


const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-transparent px-8 py-10 relative h-screen overflow-hidden">
      {/* Background */}
      <PatternBackground />

      {/* Foreground */}
      <div className="relative max-w-md text-center z-10">
        <h2 className="text-3xl font-bold mb-4 text-base-content">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
