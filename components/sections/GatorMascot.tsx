"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
  /** Scale overall size (default 1 = 160×200 px intrinsic) */
  scale?: number;
}

export default function GatorMascot({ className = "", scale = 1 }: Props) {
  /* ── Blink logic ─────────────────────────────────── */
  const [blink, setBlink] = useState(false);
  const blinkRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function doBlink() {
      setBlink(true);
      setTimeout(() => setBlink(false), 110);
      blinkRef.current = setTimeout(doBlink, 2200 + Math.random() * 2800);
    }
    blinkRef.current = setTimeout(doBlink, 1400);
    return () => { if (blinkRef.current) clearTimeout(blinkRef.current); };
  }, []);

  /* ── Shared transition ───────────────────────────── */
  const bob = {
    animate: { y: [0, -9, 0] },
    transition: { repeat: Infinity, duration: 1.9, ease: "easeInOut" as const },
  };

  return (
    <div className={className} style={{ display: "inline-block" }}>
      <svg
        viewBox="0 0 160 210"
        width={160 * scale}
        height={210 * scale}
        overflow="visible"
        aria-label="Smooth Fence USA gator mascot"
      >
        {/* ── Drop shadow ── */}
        <motion.ellipse
          cx={75} cy={207} rx={38} ry={7}
          fill="#00452a" opacity={0.18}
          animate={{ scaleX: [1, 0.88, 1], opacity: [0.18, 0.1, 0.18] }}
          transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
          style={{ transformOrigin: "75px 207px" }}
        />

        {/* ── Whole‑body idle bob ── */}
        <motion.g {...bob} style={{ transformOrigin: "75px 200px" }}>

          {/* ══ TAIL ══ */}
          <motion.g
            animate={{ rotate: [-9, 9, -9] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut", delay: 0.3 }}
            style={{ transformOrigin: "58px 172px" }}
          >
            <path
              d="M 58 172 C 36 178 18 168 14 155 C 10 142 22 136 36 143 C 50 150 58 165 58 172 Z"
              fill="#699e48" stroke="#00452a" strokeWidth={2} strokeLinejoin="round"
            />
            <path
              d="M 14 155 C 6 148 8 138 16 137"
              fill="none" stroke="#00452a" strokeWidth={1.5} strokeLinecap="round"
            />
          </motion.g>

          {/* ══ BACK LEG (left) ══ */}
          <path
            d="M 62 188 C 54 194 50 202 56 205 C 60 207 66 204 68 199 C 70 194 68 188 62 188 Z"
            fill="#699e48" stroke="#00452a" strokeWidth={1.5}
          />
          {/* Back toes */}
          <path d="M 50 204 Q 47 208 50 210" fill="none" stroke="#00452a" strokeWidth={1.2} strokeLinecap="round"/>
          <path d="M 55 206 Q 53 211 56 212" fill="none" stroke="#00452a" strokeWidth={1.2} strokeLinecap="round"/>
          <path d="M 60 207 Q 59 212 62 212" fill="none" stroke="#00452a" strokeWidth={1.2} strokeLinecap="round"/>

          {/* ══ BODY ══ */}
          <ellipse cx={76} cy={152} rx={42} ry={50} fill="#699e48" stroke="#00452a" strokeWidth={2} />

          {/* Belly */}
          <ellipse cx={79} cy={155} rx={27} ry={36} fill="#edeac7" />
          {/* Belly scale lines */}
          {[0, 1, 2, 3].map(i => (
            <path
              key={i}
              d={`M ${66} ${136 + i * 13} Q ${79} ${132 + i * 13} ${93} ${136 + i * 13}`}
              fill="none" stroke="#c9c5a9" strokeWidth={1}
            />
          ))}

          {/* ══ LEFT ARM ══ */}
          <path
            d="M 40 142 C 28 148 24 160 30 166 C 34 170 40 166 44 158 C 48 150 44 140 40 142 Z"
            fill="#699e48" stroke="#00452a" strokeWidth={1.5}
          />
          {/* Left claws */}
          <path d="M 30 166 Q 24 171 27 176" fill="none" stroke="#00452a" strokeWidth={1.5} strokeLinecap="round"/>
          <path d="M 34 169 Q 30 175 33 179" fill="none" stroke="#00452a" strokeWidth={1.5} strokeLinecap="round"/>
          <path d="M 38 170 Q 36 176 40 179" fill="none" stroke="#00452a" strokeWidth={1.5} strokeLinecap="round"/>

          {/* ══ FRONT LEG (right) ══ */}
          <path
            d="M 90 190 C 98 196 102 203 97 206 C 93 208 87 205 85 200 C 83 194 85 188 90 190 Z"
            fill="#699e48" stroke="#00452a" strokeWidth={1.5}
          />
          {/* Front toes */}
          <path d="M 98 204 Q 101 209 98 211" fill="none" stroke="#00452a" strokeWidth={1.2} strokeLinecap="round"/>
          <path d="M 93 207 Q 95 212 92 213" fill="none" stroke="#00452a" strokeWidth={1.2} strokeLinecap="round"/>
          <path d="M 88 207 Q 88 212 85 213" fill="none" stroke="#00452a" strokeWidth={1.2} strokeLinecap="round"/>

          {/* ══ RIGHT ARM + LEVEL ══ */}
          <motion.g
            animate={{ rotate: [-4, 5, -4] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 0.6 }}
            style={{ transformOrigin: "112px 143px" }}
          >
            {/* Arm */}
            <path
              d="M 110 143 C 122 138 134 142 138 150 C 141 157 134 163 124 160 C 115 157 108 150 110 143 Z"
              fill="#699e48" stroke="#00452a" strokeWidth={1.5}
            />
            {/* Spirit level (yellow tool held vertically) */}
            <rect x={130} y={122} width={12} height={56} rx={4}
              fill="#fed12d" stroke="#00452a" strokeWidth={1.5} />
            {/* Level markings */}
            {[0,1,2,3,4,5].map(i => (
              <rect key={i} x={133} y={130 + i * 8} width={6} height={1.5} rx={0.5}
                fill="#00452a" opacity={0.5} />
            ))}
            {/* Bubble vial */}
            <rect x={132} y={133} width={8} height={12} rx={3}
              fill="white" stroke="#00452a" strokeWidth={1} />
            <ellipse cx={136} cy={139} rx={2} ry={2.5} fill="#699e48" opacity={0.8} />
          </motion.g>

          {/* ══ NECK ══ */}
          <ellipse cx={95} cy={118} rx={17} ry={14} fill="#699e48" stroke="#00452a" strokeWidth={2} />

          {/* ══ HEAD ══ */}
          <circle cx={104} cy={92} r={30} fill="#699e48" stroke="#00452a" strokeWidth={2} />

          {/* ══ UPPER SNOUT ══ */}
          <path
            d="M 108 99 C 126 94 146 96 152 106 C 154 113 148 118 134 118 C 120 118 108 112 108 99 Z"
            fill="#699e48" stroke="#00452a" strokeWidth={1.5}
          />
          {/* Nostrils */}
          <ellipse cx={144} cy={105} rx={3} ry={2.2} fill="#00452a" opacity={0.55} />
          <ellipse cx={135} cy={103} rx={2.5} ry={2} fill="#00452a" opacity={0.5} />

          {/* ══ LOWER JAW (grin) ══ */}
          <path
            d="M 110 114 C 126 120 146 116 152 108 C 154 114 150 122 136 126 C 122 130 108 124 108 114 Z"
            fill="#edeac7" stroke="#00452a" strokeWidth={1.5}
          />
          {/* Teeth */}
          {[114, 122, 130, 138].map((x, i) => (
            <path key={i}
              d={`M ${x} 115 L ${x} 122`}
              stroke="white" strokeWidth={2.2} strokeLinecap="round"
            />
          ))}

          {/* ══ EYE ══ */}
          {/* White sclera */}
          <circle cx={102} cy={78} r={12} fill="white" stroke="#00452a" strokeWidth={1.5} />
          {/* Iris */}
          <circle cx={104} cy={79} r={7} fill="#13553a" />
          {/* Pupil */}
          <circle cx={105} cy={80} r={4.5} fill="#000603" />
          {/* Highlight */}
          <circle cx={107} cy={77} r={2} fill="white" />
          {/* Eyelid (blink) */}
          <motion.ellipse
            cx={102} cy={78} rx={12} ry={12}
            fill="#699e48" stroke="#00452a" strokeWidth={1.5}
            animate={{ scaleY: blink ? 1 : 0.05 }}
            transition={{ duration: 0.07 }}
            style={{ transformOrigin: "102px 78px" }}
          />

          {/* ══ HAT ══ */}
          <motion.g
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
            style={{ transformOrigin: "102px 55px" }}
          >
            {/* Brim */}
            <ellipse cx={102} cy={64} rx={38} ry={9}
              fill="#f2f0e0" stroke="#808381" strokeWidth={1.5} />
            {/* Crown */}
            <rect x={70} y={22} width={64} height={44} rx={8}
              fill="white" stroke="#808381" strokeWidth={1.5} />
            {/* Crown top curve */}
            <ellipse cx={102} cy={22} rx={32} ry={9}
              fill="white" stroke="#808381" strokeWidth={1.5} />
            {/* Hat band */}
            <rect x={70} y={55} width={64} height={9} rx={2}
              fill="#808381" />
            {/* Hat band highlight */}
            <rect x={70} y={55} width={64} height={3} rx={2}
              fill="#9a9896" opacity={0.5} />
          </motion.g>

        </motion.g>
      </svg>
    </div>
  );
}
