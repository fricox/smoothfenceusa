"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ─── Layout constants ──────────────────────────────────────── */
const VW          = 500;
const VH          = 185;
const GROUND      = 172;
const FENCE_TOP   = 30;
const FENCE_H     = GROUND - FENCE_TOP;          // 142
const POST_W      = 22;
const PLANK_W     = 17;
const PER_SECTION = 7;
const SECTIONS    = 3;
const RAIL_H      = 11;
const RAIL_Y1     = FENCE_TOP + 16;              // top rail
const RAIL_Y2     = GROUND   - 32;              // bottom rail
const CAP_H       = 10;
const LEFT_PAD    = 17;

/* ─── Build element list ────────────────────────────────────── */
interface El {
  type: "post" | "plank";
  x: number;
  w: number;
  postIdx?: number;
  plankIdx?: number; // global index across all planks
}

function buildElements(): El[] {
  const els: El[] = [];
  let x = LEFT_PAD;
  let plankIdx = 0;
  for (let s = 0; s <= SECTIONS; s++) {
    els.push({ type: "post", x, w: POST_W, postIdx: s });
    x += POST_W;
    if (s < SECTIONS) {
      for (let p = 0; p < PER_SECTION; p++) {
        els.push({ type: "plank", x, w: PLANK_W, plankIdx: plankIdx++ });
        x += PLANK_W;
      }
    }
  }
  return els;
}

const ELEMENTS     = buildElements();
const TOTAL_PLANKS = SECTIONS * PER_SECTION;
const RAIL_X       = LEFT_PAD;
const RAIL_W       = ELEMENTS[ELEMENTS.length - 1].x + POST_W - LEFT_PAD;

/* ─── Timing ────────────────────────────────────────────────── */
const T_POSTS  = 0.1;
const T_RAILS  = 0.45;
const T_PLANKS = 0.72;
const STAGGER  = 0.038;
const CYCLE_MS = 4200;

/* ─── Component ─────────────────────────────────────────────── */
export default function FenceAnimation() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setCycle(c => c + 1), CYCLE_MS);
    return () => clearTimeout(t);
  }, [cycle]);

  return (
    <div className="w-full select-none" aria-hidden="true">
      <svg
        key={cycle}
        viewBox={`0 0 ${VW} ${VH}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        overflow="visible"
      >
        <defs>
          {/* Plank: tan PVC — bright left edge → shadow right edge */}
          <linearGradient id={`pg-${cycle}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#e8d9bc" />
            <stop offset="7%"   stopColor="#dfd0b0" />
            <stop offset="50%"  stopColor="#d4c49e" />
            <stop offset="93%"  stopColor="#b8a87e" />
            <stop offset="100%" stopColor="#9e9068" />
          </linearGradient>

          {/* Post: tan PVC — side darks, bright front face */}
          <linearGradient id={`ptg-${cycle}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#b8a87e" />
            <stop offset="16%"  stopColor="#e2d2b0" />
            <stop offset="55%"  stopColor="#d8c8a4" />
            <stop offset="84%"  stopColor="#b0a07a" />
            <stop offset="100%" stopColor="#968860" />
          </linearGradient>

          {/* Post cap top face */}
          <linearGradient id={`cg-${cycle}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor="#eedfc0" />
            <stop offset="100%" stopColor="#c8b890" />
          </linearGradient>

          {/* Rail: top-lit tan */}
          <linearGradient id={`rg-${cycle}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor="#e2d2b0" />
            <stop offset="40%"  stopColor="#d4c49e" />
            <stop offset="100%" stopColor="#a89870" />
          </linearGradient>

          {/* Shine sweep mask */}
          <linearGradient id={`shine-${cycle}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="48%"  stopColor="white" stopOpacity="0.28" />
            <stop offset="52%"  stopColor="white" stopOpacity="0.28" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Ground shadow ── */}
        <motion.ellipse
          cx={VW / 2} cy={GROUND + 10} rx={230} ry={9}
          fill="#00452a" opacity={0.12}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.12 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: `${VW / 2}px ${GROUND + 10}px` }}
        />

        {/* ── Ground line ── */}
        <motion.line
          x1={0} y1={GROUND} x2={VW} y2={GROUND}
          stroke="#9a9790" strokeWidth={2}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: "0px 0px" }}
        />

        {/* ── Rails (behind planks) ── */}
        {[RAIL_Y1, RAIL_Y2].map((ry, i) => (
          <motion.rect
            key={`rail-${i}`}
            x={RAIL_X} y={ry} width={RAIL_W} height={RAIL_H} rx={2}
            fill={`url(#rg-${cycle})`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: T_RAILS + i * 0.1, duration: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: `${RAIL_X}px ${ry}px` }}
          />
        ))}

        {/* ── Posts & Planks ── */}
        {ELEMENTS.map((el) => {
          if (el.type === "post") {
            const delay = T_POSTS + (el.postIdx ?? 0) * 0.04;
            return (
              <motion.g
                key={`post-${el.postIdx}`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${el.x + el.w / 2}px ${GROUND}px` }}
              >
                {/* Post body */}
                <rect
                  x={el.x} y={FENCE_TOP} width={el.w} height={FENCE_H}
                  fill={`url(#ptg-${cycle})`}
                />
                {/* Post cap — beveled trapezoid */}
                <polygon
                  points={`
                    ${el.x - 2},${FENCE_TOP}
                    ${el.x + el.w / 2},${FENCE_TOP - CAP_H}
                    ${el.x + el.w + 2},${FENCE_TOP}
                  `}
                  fill={`url(#cg-${cycle})`}
                />
                {/* Post left edge shadow */}
                <rect x={el.x} y={FENCE_TOP} width={3} height={FENCE_H} fill="rgba(0,0,0,0.06)" />
                {/* Post right edge shadow */}
                <rect x={el.x + el.w - 3} y={FENCE_TOP} width={3} height={FENCE_H} fill="rgba(0,0,0,0.08)" />
              </motion.g>
            );
          } else {
            const delay = T_PLANKS + (el.plankIdx ?? 0) * STAGGER;
            return (
              <motion.g
                key={`plank-${el.plankIdx}`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${el.x + el.w / 2}px ${GROUND}px` }}
              >
                <rect
                  x={el.x} y={FENCE_TOP} width={el.w} height={FENCE_H}
                  fill={`url(#pg-${cycle})`}
                />
                {/* Groove line on left edge */}
                <line
                  x1={el.x} y1={FENCE_TOP} x2={el.x} y2={GROUND}
                  stroke="#aeaba4" strokeWidth={0.8} opacity={0.6}
                />
              </motion.g>
            );
          }
        })}

        {/* ── Shine sweep across whole fence ── */}
        <motion.rect
          x={LEFT_PAD} y={FENCE_TOP - CAP_H}
          width={RAIL_W} height={FENCE_H + CAP_H}
          fill={`url(#shine-${cycle})`}
          initial={{ x: LEFT_PAD - RAIL_W, opacity: 0 }}
          animate={{ x: LEFT_PAD + RAIL_W + 60, opacity: [0, 1, 1, 0] }}
          transition={{
            delay: T_PLANKS + TOTAL_PLANKS * STAGGER + 0.1,
            duration: 0.55,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}
