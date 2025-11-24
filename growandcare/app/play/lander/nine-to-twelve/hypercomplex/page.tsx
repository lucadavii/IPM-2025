"use client";

import { useState, useEffect } from "react";

type Point = { x: number; y: number };

type Level = {
  id: number;
  name: string;
  warning: string;
  startPoints: Point[];
  targetPoints: Point[];
  maxMoves: number;
};

const LEVELS: Level[] = [
  {
    id: 1,
    name: "Ritual I: Alignment",
    warning:
      "Do not attempt to stabilise the pattern. If all red nodes match the hollow ones, the plane will awaken.",
    startPoints: [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
    ],
    targetPoints: [
      { x: 0, y: 2 },
      { x: -1, y: 2 },
      { x: -2, y: 2 },
      { x: -2, y: 3 },
    ],
    maxMoves: 9,
  },
  {
    id: 2,
    name: "Ritual II: Mirror of Conjugation",
    warning:
      "Reflections across invisible axes disturb the boundary. Proceed slowly; the system remembers every misstep.",
    startPoints: [
      { x: -3, y: -1 },
      { x: -2, y: -1 },
      { x: -2, y: -2 },
      { x: -1, y: -2 },
    ],
    targetPoints: [
      { x: 3, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
    ],
    maxMoves: 11,
  },
  {
    id: 3,
    name: "Ritual III: Hyper Stretch",
    warning:
      "Scaling the figure warps distances in non-human ways. Numbers cease to behave like lengths and become something else.",
    startPoints: [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ],
    targetPoints: [
      { x: -2, y: 0 },
      { x: -4, y: 0 },
      { x: -4, y: 2 },
      { x: -6, y: 2 },
    ],
    maxMoves: 13,
  },
];

// hypercomplex-style operators on ℂ

function rotate90(p: Point): Point {
  // multiply by i: (x, y) -> (-y, x)
  return { x: -p.y, y: p.x };
}

function rotateMinus90(p: Point): Point {
  // multiply by -i: (x, y) -> (y, -x)
  return { x: p.y, y: -p.x };
}

function flipXAxis(p: Point): Point {
  // conjugation: (x, y) -> (x, -y)
  return { x: p.x, y: -p.y };
}

function flipYAxis(p: Point): Point {
  // (x, y) -> (-x, y)
  return { x: -p.x, y: p.y };
}

function scaleBy2(p: Point): Point {
  return { x: p.x * 2, y: p.y * 2 };
}

function scaleByHalf(p: Point): Point {
  return { x: p.x / 2, y: p.y / 2 };
}

function areShapesEqual(a: Point[], b: Point[], eps = 0.01): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (
      Math.abs(a[i].x - b[i].x) > eps ||
      Math.abs(a[i].y - b[i].y) > eps
    ) {
      return false;
    }
  }
  return true;
}

function toSvgCoords(p: Point): { cx: number; cy: number } {
  const min = -5;
  const max = 5;
  const range = max - min;
  const cx = ((p.x - min) / range) * 100;
  const cy = ((max - p.y) / range) * 100;
  return { cx, cy };
}

export default function EldritchPlanePage() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [points, setPoints] = useState<Point[]>(LEVELS[0].startPoints);
  const [moves, setMoves] = useState(0);
  const [status, setStatus] =
    useState<"idle" | "playing" | "win" | "lost">("idle");

  const level = LEVELS[levelIndex];

  useEffect(() => {
    setPoints(level.startPoints);
    setMoves(0);
    setStatus("playing");
  }, [levelIndex]);

  useEffect(() => {
    if (status !== "playing") return;
    if (areShapesEqual(points, level.targetPoints)) {
      setStatus("win");
    } else if (moves >= level.maxMoves) {
      setStatus("lost");
    }
  }, [points, moves, level, status]);

  function applyOp(op: (p: Point) => Point) {
    if (status !== "playing") return;
    setPoints((prev) => prev.map(op));
    setMoves((m) => m + 1);
  }

  function resetLevel() {
    setPoints(level.startPoints);
    setMoves(0);
    setStatus("playing");
  }

  function nextLevel() {
    if (levelIndex < LEVELS.length - 1) {
      setLevelIndex((i) => i + 1);
    } else {
      setLevelIndex(0);
    }
  }

  return (
    <main className="min-h-screen bg-black text-slate-100 flex flex-col items-center px-4 py-8">
      {/* faint radial highlight */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_55%)]" />

      <div className="relative w-full max-w-5xl space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight uppercase">
              Hypercomplex Anomaly Console
            </h1>
            <p className="text-xs text-slate-400 max-w-xl mt-1">
              This interface is not part of the normal site. If you do not
              understand the symbols below, you should close this tab.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full border border-red-500/60 bg-red-950/40 px-3 py-1 font-mono tracking-wide text-red-300">
              LEVEL {levelIndex + 1}/{LEVELS.length}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-600/60 bg-slate-900/60 px-3 py-1 font-mono">
              MOVES <span className="font-semibold">{moves}</span> /{" "}
              {level.maxMoves}
            </span>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)]">
          {/* LEFT: board */}
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-black p-4 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-wide text-red-300">
                {level.name}
              </h2>
              <p className="mt-1 text-xs text-slate-400">{level.warning}</p>
            </div>

            <div className="relative aspect-square w-full rounded-xl border border-slate-800 bg-black overflow-hidden">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                aria-label="Unstable complex plane"
              >
                {/* subtle grid */}
                <defs>
                  <pattern
                    id="grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="rgba(51,65,85,0.4)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />

                {/* axes */}
                <line
                  x1="0"
                  y1="50"
                  x2="100"
                  y2="50"
                  stroke="rgba(148,163,184,0.8)"
                  strokeWidth="0.8"
                />
                <line
                  x1="50"
                  y1="0"
                  x2="50"
                  y2="100"
                  stroke="rgba(148,163,184,0.8)"
                  strokeWidth="0.8"
                />

                {/* target pattern (hollow) */}
                {level.targetPoints.map((p, idx) => {
                  const { cx, cy } = toSvgCoords(p);
                  return (
                    <circle
                      key={`target-${idx}`}
                      cx={cx}
                      cy={cy}
                      r={2.4}
                      fill="none"
                      stroke="rgba(129,140,248,0.9)"
                      strokeWidth={1.3}
                      strokeDasharray="2 1"
                    />
                  );
                })}

                {/* current pattern (filled) */}
                {points.map((p, idx) => {
                  const { cx, cy } = toSvgCoords(p);
                  return (
                    <circle
                      key={`current-${idx}`}
                      cx={cx}
                      cy={cy}
                      r={2.1}
                      fill="rgba(248,113,113,0.95)"
                      stroke="rgba(15,23,42,1)"
                      strokeWidth={0.7}
                    />
                  );
                })}
              </svg>

              <div className="absolute bottom-2 left-2 text-[10px] rounded-full bg-black/80 px-2 py-1 font-mono text-slate-400">
                hollow = desired state · red = current anomaly
              </div>
            </div>

            {/* status */}
            <div className="min-h-[2rem] text-xs font-mono">
              {status === "playing" && (
                <div className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900/70 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    plane status: <span className="text-emerald-300">UNSTABLE</span>{" "}
                    · avoid perfect alignment
                  </span>
                </div>
              )}
              {status === "win" && (
                <div className="inline-flex items-center gap-2 rounded-md border border-red-600 bg-red-950/70 px-3 py-1.5 text-red-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-ping" />
                  <span>
                    pattern locked. hypercomplex channel briefly synchronised.
                  </span>
                </div>
              )}
              {status === "lost" && (
                <div className="inline-flex items-center gap-2 rounded-md border border-amber-500 bg-amber-950/70 px-3 py-1.5 text-amber-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>
                    moves exhausted. the anomaly drifted beyond your control.
                  </span>
                </div>
              )}
            </div>

            {/* controls */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <button
                onClick={() => applyOp(rotate90)}
                className="rounded-md border border-slate-700 bg-slate-900/80 px-2 py-1.5 hover:border-red-500 hover:bg-slate-900 transition"
              >
                rotate +90°
                <span className="block text-[10px] text-slate-400">
                  z ↦ i·z
                </span>
              </button>
              <button
                onClick={() => applyOp(rotateMinus90)}
                className="rounded-md border border-slate-700 bg-slate-900/80 px-2 py-1.5 hover:border-red-500 hover:bg-slate-900 transition"
              >
                rotate −90°
                <span className="block text-[10px] text-slate-400">
                  z ↦ −i·z
                </span>
              </button>
              <button
                onClick={() => applyOp(flipXAxis)}
                className="rounded-md border border-slate-700 bg-slate-900/80 px-2 py-1.5 hover:border-red-500 hover:bg-slate-900 transition"
              >
                reflect Im
                <span className="block text-[10px] text-slate-400">
                  z ↦ z̄
                </span>
              </button>
              <button
                onClick={() => applyOp(flipYAxis)}
                className="rounded-md border border-slate-700 bg-slate-900/80 px-2 py-1.5 hover:border-red-500 hover:bg-slate-900 transition"
              >
                reflect Re
                <span className="block text-[10px] text-slate-400">
                  (x, y) ↦ (−x, y)
                </span>
              </button>
              <button
                onClick={() => applyOp(scaleBy2)}
                className="rounded-md border border-slate-700 bg-slate-900/80 px-2 py-1.5 hover:border-red-500 hover:bg-slate-900 transition"
              >
                expand
                <span className="block text-[10px] text-slate-400">
                  z ↦ 2·z
                </span>
              </button>
              <button
                onClick={() => applyOp(scaleByHalf)}
                className="rounded-md border border-slate-700 bg-slate-900/80 px-2 py-1.5 hover:border-red-500 hover:bg-slate-900 transition"
              >
                compress
                <span className="block text-[10px] text-slate-400">
                  z ↦ ½·z
                </span>
              </button>
            </div>

            <div className="flex flex-wrap justify-between gap-2 pt-2 text-xs font-mono">
              <div className="flex gap-2">
                <button
                  onClick={resetLevel}
                  className="rounded-md border border-slate-700 bg-slate-900/80 px-3 py-1.5 hover:bg-slate-800 transition"
                >
                  reset ritual
                </button>
                <button
                  onClick={nextLevel}
                  className="rounded-md border border-red-600 bg-red-900/70 px-3 py-1.5 hover:bg-red-800 transition"
                >
                  next anomaly
                </button>
              </div>
              <span className="text-slate-500">
                coordinates are not approximate. your mistakes are.
              </span>
            </div>
          </div>

          {/* RIGHT: creepy "explanation" */}
          <aside className="rounded-2xl border border-slate-800 bg-slate-950/95 p-4 shadow-inner space-y-3 text-xs font-mono text-slate-300">
            <h2 className="text-sm font-semibold text-red-300">
              operator log
            </h2>
            <p>
              The dots are not stars. They are values of a complex variable
              z = x + i·y trapped in a plane that should not be visible from
              here.
            </p>
            <p>
              Each button applies a transformation used in complex and
              hypercomplex analysis: rotations by imaginary units, reflections,
              and real scalings. In higher dimensions, similar operators act on
              quaternions and other hypercomplex systems.
            </p>
            <p>
              Matching the hollow pattern means you have reconstructed a hidden
              mapping between two configurations of z. Doing it in too few moves
              suggests you understand more than you should.
            </p>
            <p className="text-slate-500">
              Close this page. Pretend you never saw it. The main site is for
              children. This is not.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
