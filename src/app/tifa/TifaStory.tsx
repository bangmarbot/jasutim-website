'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion, useReducedMotion, type Variants} from 'framer-motion';

// cubic-bezier easings as tuples (framer-motion v12 type wants tuples, not number[])
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_DECK = [0.4, 0, 0.2, 1] as const;
const EASE_POP = [0.34, 1.56, 0.64, 1] as const;

/* ================================================================== */
/* Presenter notes (press N) — talking points per slide.             */
/* Index matches the slides[] array below.                            */
/* ================================================================== */
const NOTES: {scene: string; text: string}[] = [
  {
    scene: '1 · Hello',
    text:
      "Hello! I'm Muhamad Muslih, from Bekasi, Indonesia — next to Jakarta. By day I build digital products; today I'm here as chairman of JASUTIM, a community waste bank. In 10 minutes I'll show you how my country turns trash into something valuable — and how you can too.",
  },
  {
    scene: '2 · The Problem',
    text:
      "Indonesia — 280 million people, 17,000 islands — creates a LOT of waste. This is Bantar Gebang, the giant landfill in my own city. But most of this is not garbage — it's value in the wrong place.",
  },
  {
    scene: '3 · The Big Idea',
    text:
      'In Indonesia we have a simple, powerful idea: a waste bank. Like a real bank — but you deposit sorted plastic, paper, cans, and we put money in your savings. Kids buy school books. Mothers save for Eid.',
  },
  {
    scene: '4 · Meet JASUTIM',
    text:
      'This is JASUTIM, the waste bank I help lead. Today we recover about 40 tonnes a year that does NOT go to the landfill, we’ve helped start 5 other waste banks, and over 200 families now sort at home — including kids your age.',
  },
  {
    scene: '5 · Circular Economy Now',
    text:
      "Here's the fun part — circular economy. Plastic becomes flakes for new products. And used cooking oil from kitchens — we turn it into scented candles, 33 times more valuable than the oil.",
  },
  {
    scene: '6 · Next Project (in design)',
    text:
      'Half of our home trash is food waste, and almost no one recycles it. So here’s the project we’re designing right now: we feed food scraps to a special insect — the black soldier fly. Its larvae eat hundreds of kilos of food waste, then become feed for chickens, and the chickens give us eggs. From food waste… to food. It’s still a plan — see the whole design at lab.jasutim.org. THIS is circular economy: nothing is wasted.',
  },
  {
    scene: '7 · The Lesson',
    text:
      "People think solving waste needs big machines and big money. It doesn't. JASUTIM runs on neighbors who decide to sort their trash, and a place to bring it. The community is the magic.",
  },
  {
    scene: '8 · What You Can Do',
    text:
      'So, starting tomorrow: separate your trash, say no to single-use plastic, and start small — even a waste bank in your school. You are youth for sustainable leadership — this is how it begins. In Indonesia we learned: trash is just treasure in the wrong place. Thank you, Thailand!',
  },
  {
    scene: '9 · Closing',
    text:
      'Trash is just treasure in the wrong place. ขอบคุณครับ — khòp khun kráp. Thank you, Thailand!',
  },
];

const SLIDE_COUNT = 9;

/* ================================================================== */
/* Motion helpers — content reveals fire on slide ENTER (the slide    */
/* remounts via AnimatePresence key, so children animate fresh).      */
/* ================================================================== */
const stagger: Variants = {
  hidden: {},
  show: {transition: {staggerChildren: 0.14, delayChildren: 0.15}},
};
const riseItem: Variants = {
  hidden: {opacity: 0, y: 34},
  show: {opacity: 1, y: 0, transition: {duration: 0.55, ease: EASE_OUT}},
};

/* ------------------------------------------------------------------ */
/* CountUp — animates from 0 to target when mounted.                  */
/* ------------------------------------------------------------------ */
function CountUp({to, prefix = '', suffix = '', reduce}: {to: number; prefix?: string; suffix?: string; reduce: boolean}) {
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) {
      setVal(to);
      return;
    }
    const dur = 1500;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    // small delay so the count-up reads after the slide settles
    const start = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 350);
    return () => {
      clearTimeout(start);
      cancelAnimationFrame(raf);
    };
  }, [to, reduce]);

  return (
    <span>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 6 loop diagram — nodes pop in sequence, arcs draw in, and a  */
/* token continuously travels around the loop. Animates on mount.     */
/* ------------------------------------------------------------------ */
const LOOP_NODES = [
  {t: 'Food scraps', s: 'kitchen & market waste'},
  {t: 'Black-soldier-fly larvae', s: 'eat hundreds of kg / day'},
  {t: 'Chicken feed', s: 'protein-rich, low cost'},
  {t: 'Eggs', s: 'food, back to the table'},
];

function LoopDiagram({reduce}: {reduce: boolean}) {
  const cx = 200;
  const cy = 200;
  const r = 130;
  const pts = [
    {x: cx, y: cy - r}, // top
    {x: cx + r, y: cy}, // right
    {x: cx, y: cy + r}, // bottom
    {x: cx - r, y: cy}, // left
  ];
  const arcs = [
    `M ${pts[0].x} ${pts[0].y} A ${r} ${r} 0 0 1 ${pts[1].x} ${pts[1].y}`,
    `M ${pts[1].x} ${pts[1].y} A ${r} ${r} 0 0 1 ${pts[2].x} ${pts[2].y}`,
    `M ${pts[2].x} ${pts[2].y} A ${r} ${r} 0 0 1 ${pts[3].x} ${pts[3].y}`,
    `M ${pts[3].x} ${pts[3].y} A ${r} ${r} 0 0 1 ${pts[0].x} ${pts[0].y}`,
  ];
  const labels = ['Food\nscraps', 'BSF\nlarvae', 'Chicken\nfeed', 'Eggs'];

  // node reveal sequence; legend mirrors it.
  const nodeDelay = (i: number) => 0.35 + i * 0.45;

  return (
    <div className="loop-grid">
      <svg
        className="loop-svg"
        viewBox="0 0 400 400"
        role="img"
        aria-label="Circular loop: food scraps to black-soldier-fly larvae to chicken feed to eggs and back"
      >
        <defs>
          <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(152 63% 35%)" />
          </marker>
        </defs>

        {/* arcs draw in after their source node lights up */}
        {arcs.map((d, i) => (
          <motion.path
            key={`arc-${i}`}
            d={d}
            fill="none"
            stroke="hsl(152 63% 35%)"
            strokeWidth="3.5"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
            initial={reduce ? {pathLength: 1, opacity: 0.85} : {pathLength: 0, opacity: 0.85}}
            animate={{pathLength: 1}}
            transition={reduce ? {duration: 0} : {duration: 0.5, delay: nodeDelay(i) + 0.2, ease: 'easeInOut'}}
          />
        ))}

        {/* traveling token — follows the same circular path, loops forever */}
        {!reduce && (
          <motion.circle
            r="9"
            fill="hsl(150 55% 52%)"
            stroke="#fff"
            strokeWidth="2"
            initial={{opacity: 0}}
            animate={{
              opacity: 1,
              offsetDistance: ['0%', '100%'],
            }}
            transition={{
              opacity: {delay: 2.2, duration: 0.4},
              offsetDistance: {delay: 2.2, duration: 6, ease: 'linear', repeat: Infinity},
            }}
            style={{
              offsetPath: `path("M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}")`,
              offsetRotate: '0deg',
            }}
          />
        )}

        {/* nodes pop/scale in sequence */}
        {pts.map((p, i) => (
          <motion.g
            key={`node-${i}`}
            initial={reduce ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.4}}
            animate={{opacity: 1, scale: 1}}
            transition={reduce ? {duration: 0} : {duration: 0.45, delay: nodeDelay(i), ease: EASE_POP}}
            style={{transformBox: 'fill-box', transformOrigin: 'center'}}
          >
            <circle cx={p.x} cy={p.y} r="46" fill="hsl(48 33% 98%)" stroke="hsl(152 63% 35%)" strokeWidth="3" />
            <circle cx={p.x} cy={p.y} r="38" fill="hsl(144 39% 92%)" />
            {labels[i].split('\n').map((ln, j, a) => (
              <text
                key={j}
                x={p.x}
                y={p.y + (j - (a.length - 1) / 2) * 15 + 5}
                textAnchor="middle"
                fontFamily="var(--font-body), sans-serif"
                fontSize="13"
                fontWeight="700"
                fill="hsl(152 60% 24%)"
              >
                {ln}
              </text>
            ))}
          </motion.g>
        ))}
      </svg>

      <ol className="loop-legend">
        {LOOP_NODES.map((n, i) => (
          <motion.li
            key={i}
            initial={reduce ? {opacity: 1, x: 0} : {opacity: 0, x: -16}}
            animate={{opacity: 1, x: 0}}
            transition={reduce ? {duration: 0} : {duration: 0.4, delay: nodeDelay(i)}}
          >
            <span className="idx">{i + 1}</span>
            <span className="legend-text">
              <span className="lt">{n.t}</span>
              <span className="ls">{n.s}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/* ================================================================== */
/* Step-reveal: some slides reveal their lines one beat per advance.   */
/* STEP_COUNTS[slideIndex] = number of beats. Slides not listed = 1    */
/* (reveal-all-on-enter). The deck indicator tracks the SLIDE only.    */
/* ================================================================== */
const STEP_COUNTS: Record<number, number> = {
  1: 5, // Slide 2 (Bantar Gebang) — 5 lines, one per advance
  7: 3, // Slide 8 (What you can do) — 3 action items, one per advance
};
function stepCount(slideIdx: number) {
  return STEP_COUNTS[slideIdx] ?? 1;
}

/* A single revealable beat: hidden until `show` is true, then fades up. */
function Beat({show, reduce, children}: {show: boolean; reduce: boolean; children: React.ReactNode}) {
  return (
    <motion.div
      initial={false}
      animate={show ? {opacity: 1, y: 0} : {opacity: 0, y: reduce ? 0 : 24}}
      transition={{duration: reduce ? 0 : 0.5, ease: EASE_OUT}}
      style={{pointerEvents: show ? 'auto' : 'none'}}
      aria-hidden={!show}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/* Slides — each is a full-screen render. They animate in on enter.   */
/* `step` = current revealed-beat index (0-based) for step-reveal      */
/* slides; ignored by reveal-all slides.                               */
/* ================================================================== */
function buildSlides(reduce: boolean): ((step: number) => JSX.Element)[] {
  const M = motion.div;

  return [
    /* ---- 1 · HELLO ---- */
    () => (
      <div className="slide-photo">
        <img className="slide-bg focus-center" src="/images/tifa/team-with-muslih.jpg" alt="The JASUTIM team, including Muhamad Muslih" />
        <div className="slide-scrim scrim-hero" />
        <M className="slide-fg bottom" variants={stagger} initial="hidden" animate="show">
          <motion.p className="eyebrow" variants={riseItem}>
            TIFA 2026 · Waste Circular Economy &amp; Climate Action
          </motion.p>
          <motion.h1 className="display xl" variants={riseItem}>
            From Trash to Treasure
          </motion.h1>
          <motion.p className="sub" variants={riseItem}>
            Waste management in Indonesia.
          </motion.p>
          <motion.p className="tiny" variants={riseItem}>
            Muhamad Muslih — Trustee, JASUTIM Foundation
          </motion.p>
          <motion.p className="tiny" variants={riseItem}>
            A community waste bank in Bekasi, Indonesia — turning everyday household trash into income and value.
          </motion.p>
        </M>
        <div className="tap-cue">
          Tap or press <span className="key">→</span> to begin
        </div>
      </div>
    ),

    /* ---- 2 · THE PROBLEM (step-reveal, 5 beats) ---- */
    (step: number) => (
      <div className="slide-photo">
        <img className="slide-bg" src="/images/tifa/problem-bantargebang.jpg" alt="Bantar Gebang landfill in Bekasi" />
        <div className="slide-scrim scrim-deep" />
        <div className="slide-fg center problem-steps">
          <Beat show={step >= 0} reduce={reduce}>
            <p className="line">This is Bantar Gebang.</p>
          </Beat>
          <Beat show={step >= 1} reduce={reduce}>
            <p className="line accent">Southeast Asia&rsquo;s largest landfill.</p>
          </Beat>
          <Beat show={step >= 2} reduce={reduce}>
            <p className="stat-band">&asymp;200 football fields wide · 50+ metres high</p>
          </Beat>
          <Beat show={step >= 3} reduce={reduce}>
            <p className="line small">And it sits in my city — Bekasi.</p>
          </Beat>
          <Beat show={step >= 4} reduce={reduce}>
            <p className="line small">Half of our home trash is food waste — almost no one recycles it.</p>
          </Beat>
        </div>
        <p className="credit">Photo: 22Kartika / Wikimedia Commons · CC BY-SA 3.0</p>
      </div>
    ),

    /* ---- 3 · THE BIG IDEA ---- */
    () => (
      <div className="slide-photo">
        <img className="slide-bg" src="/images/tifa/weighing.jpg" alt="Weighing sorted waste at the bank" />
        <div className="slide-scrim scrim-deep" />
        <M className="slide-fg center" variants={stagger} initial="hidden" animate="show">
          <motion.p className="line" variants={riseItem}>
            What if trash worked like money?
          </motion.p>
          <motion.p className="line accent" variants={riseItem}>
            Bank Sampah — a Waste Bank.
          </motion.p>
          <motion.div className="flow" variants={riseItem}>
            <span className="flow-step">Bring sorted trash</span>
            <span className="flow-arrow">&rarr;</span>
            <span className="flow-step">We weigh it</span>
            <span className="flow-arrow">&rarr;</span>
            <span className="flow-step">Money into your savings</span>
          </motion.div>
          <motion.p className="line small" variants={riseItem}>
            Trash becomes income.
          </motion.p>
        </M>
      </div>
    ),

    /* ---- 4 · MEET JASUTIM ---- */
    () => (
      <div className="slide-photo">
        <img className="slide-bg" src="/images/tifa/collection-volume.jpg" alt="Volume of waste collected by JASUTIM" />
        <div className="slide-scrim scrim-bottom" />
        <M className="slide-fg bottom" variants={stagger} initial="hidden" animate="show">
          <motion.p className="eyebrow" variants={riseItem}>
            Meet us
          </motion.p>
          <motion.p className="display md" variants={riseItem}>
            JASUTIM — a community waste bank in Bekasi.
          </motion.p>
          <motion.div className="stats" variants={riseItem}>
            <div className="stat">
              <div className="num">
                <CountUp prefix="&asymp;" to={40} reduce={reduce} />
              </div>
              <div className="lbl">tonnes recovered / year</div>
            </div>
            <div className="stat">
              <div className="num">
                <CountUp to={5} reduce={reduce} />
              </div>
              <div className="lbl">waste banks mentored</div>
            </div>
            <div className="stat">
              <div className="num">
                <CountUp to={200} suffix="+" reduce={reduce} />
              </div>
              <div className="lbl">families sorting at home</div>
            </div>
          </motion.div>
        </M>
      </div>
    ),

    /* ---- 5 · CIRCULAR ECONOMY NOW ---- */
    () => (
      <div className="slide-photo">
        <img className="slide-bg" src="/images/tifa/eco-candle.jpg" alt="Scented candle made from used cooking oil" />
        <div className="slide-scrim scrim-deep" />
        <M className="slide-fg bottom" variants={stagger} initial="hidden" animate="show">
          <motion.h2 className="display lg" variants={riseItem}>
            Nothing is wasted.
          </motion.h2>
          <motion.div className="cards" variants={riseItem}>
            <div className="card-loop">
              <p className="tag">Loop A · Plastic</p>
              <p className="card-body">
                Plastic bottles &rarr; flakes &rarr; <strong>new products</strong>.
              </p>
            </div>
            <div className="card-loop">
              <p className="tag">Loop B · Cooking oil</p>
              <p className="card-body">
                Used cooking oil &rarr; scented candles, <strong>33&times; more valuable</strong>.
              </p>
            </div>
          </motion.div>
        </M>
      </div>
    ),

    /* ---- 6 · NEXT PROJECT (in design) ---- */
    () => (
      <div className="slide-loop">
        <div className="loop-wrap">
          <M variants={stagger} initial="hidden" animate="show">
            <motion.span className="badge-design" variants={riseItem}>
              <span className="dot" />
              Our next project — in design
            </motion.span>
            <motion.h2 className="loop-title" variants={riseItem}>
              From food waste… to food.
            </motion.h2>
          </M>
          <LoopDiagram reduce={reduce} />
          <p className="loop-foot">
            We&rsquo;re building this design now — see the full concept at <strong>lab.jasutim.org</strong>.
          </p>
        </div>
      </div>
    ),

    /* ---- 7 · THE LESSON ---- */
    () => (
      <div className="slide-photo">
        <img className="slide-bg" src="/images/tifa/community-women.jpg" alt="Women of the community sorting waste together" />
        <div className="slide-scrim scrim-deep" />
        <M className="slide-fg center" variants={stagger} initial="hidden" animate="show">
          <motion.p className="display lg lesson-line" variants={riseItem}>
            You don&rsquo;t need fancy technology. You need a community — and a place to start.
          </motion.p>
        </M>
      </div>
    ),

    /* ---- 8 · WHAT YOU CAN DO (step-reveal, 3 beats) ---- */
    (step: number) => (
      <div className="slide-photo">
        <img className="slide-bg" src="/images/tifa/community-weighin.jpg" alt="Community weigh-in at the waste bank" />
        <div className="slide-scrim scrim-bottom" />
        <div className="slide-fg bottom">
          <motion.h2
            className="display md"
            initial={reduce ? false : {opacity: 0, y: 24}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: reduce ? 0 : 0.5, ease: EASE_OUT, delay: reduce ? 0 : 0.15}}
          >
            What you can do — starting tomorrow
          </motion.h2>
          <Beat show={step >= 0} reduce={reduce}>
            <div className="action-item">
              <span className="n">1</span>
              <span className="t">
                <b>Separate</b> your trash
              </span>
            </div>
          </Beat>
          <Beat show={step >= 1} reduce={reduce}>
            <div className="action-item">
              <span className="n">2</span>
              <span className="t">
                <b>Refuse</b> single-use plastic
              </span>
            </div>
          </Beat>
          <Beat show={step >= 2} reduce={reduce}>
            <div className="action-item">
              <span className="n">3</span>
              <span className="t">
                <b>Start small</b> — even a waste bank at school
              </span>
            </div>
          </Beat>
        </div>
      </div>
    ),

    /* ---- 9 · CLOSING ---- */
    () => (
      <div className="slide-closing">
        <M variants={stagger} initial="hidden" animate="show">
          <motion.h2 className="display lg closing-line" variants={riseItem}>
            Trash is just treasure in the wrong place.
          </motion.h2>
          <motion.p className="thanks-thai" variants={riseItem} lang="th">
            ขอบคุณครับ
          </motion.p>
          <motion.p className="thanks-rom" variants={riseItem}>
            khòp khun kráp
          </motion.p>
          <motion.p className="thanks-en" variants={riseItem}>
            Thank you
          </motion.p>
          <motion.div className="closing-foot" variants={riseItem}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="JASUTIM logo" />
            <span className="url">jasutim.org</span>
          </motion.div>
        </M>
      </div>
    ),
  ];
}

/* ================================================================== */
/* Deck — controls current slide + navigation.                        */
/* ================================================================== */
export function TifaStory() {
  const [current, setCurrent] = useState(0);
  const [step, setStep] = useState(0); // revealed-beat index within the current slide
  const [dir, setDir] = useState(1); // 1 = forward, -1 = back
  const [notesOpen, setNotesOpen] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  // keep live refs so handlers don't go stale
  const currentRef = useRef(current);
  const stepRef = useRef(step);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  // jump straight to a slide (dots) — always resets fragments to beat 0
  const go = useCallback((next: number, direction: number) => {
    const target = Math.max(0, Math.min(SLIDE_COUNT - 1, next));
    setDir(direction);
    setStep(0);
    setCurrent(target);
  }, []);

  // forward: reveal next beat if this slide has more, else next slide
  const advance = useCallback(() => {
    const c = currentRef.current;
    const beats = stepCount(c);
    if (stepRef.current < beats - 1) {
      setStep((s) => s + 1);
    } else if (c < SLIDE_COUNT - 1) {
      setDir(1);
      setStep(0);
      setCurrent(c + 1);
    }
  }, []);

  // back: step back through revealed beats, then to the previous slide
  // (entering the previous slide shows it fully revealed at its last beat)
  const back = useCallback(() => {
    const c = currentRef.current;
    if (stepRef.current > 0) {
      setStep((s) => s - 1);
    } else if (c > 0) {
      setDir(-1);
      setCurrent(c - 1);
      setStep(stepCount(c - 1) - 1);
    }
  }, []);

  // ---- keyboard ----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'n' || e.key === 'N') {
        setNotesOpen((v) => !v);
        return;
      }
      if (e.key === 'Escape') {
        setNotesOpen(false);
        return;
      }
      if (notesOpen) return; // when notes are open, don't navigate slides
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        advance();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'Backspace') {
        e.preventDefault();
        back();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [advance, back, notesOpen]);

  // ---- lock body scroll (deck, not scroll) ----
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ---- click / tap to advance (ignore interactive bits) ----
  const onStageClick = useCallback(
    (e: React.MouseEvent) => {
      if (notesOpen) return;
      const t = e.target as HTMLElement;
      if (t.closest('[data-no-advance]')) return;
      // tap on left third = back, otherwise advance (mobile-friendly)
      const x = e.clientX;
      if (x < window.innerWidth * 0.22) back();
      else advance();
    },
    [advance, back, notesOpen]
  );

  // ---- swipe (touch) ----
  const touch = useRef<{x: number; y: number} | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = {x: t.clientX, y: t.clientY};
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current || notesOpen) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) advance();
      else back();
    }
  };

  const slides = buildSlides(reduceMotion);

  const slideVariants: Variants = {
    enter: (d: number) => ({
      opacity: 0,
      scale: reduceMotion ? 1 : 1.04,
      x: reduceMotion ? 0 : d > 0 ? 40 : -40,
    }),
    center: {opacity: 1, scale: 1, x: 0},
    exit: (d: number) => ({
      opacity: 0,
      scale: reduceMotion ? 1 : 0.985,
      x: reduceMotion ? 0 : d > 0 ? -40 : 40,
    }),
  };

  return (
    <div
      className="deck"
      onClick={onStageClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* fixed brand */}
      <div className="tifa-brand" data-no-advance>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo.png" alt="JASUTIM" />
        <span>JASUTIM</span>
      </div>

      {/* slide stage */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.section
          key={current}
          className="slide"
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{duration: reduceMotion ? 0.001 : 0.55, ease: EASE_DECK}}
          aria-label={NOTES[current].scene}
        >
          {slides[current](step)}
        </motion.section>
      </AnimatePresence>

      {/* slide indicator (dots + count) */}
      <div className="deck-indicator" data-no-advance>
        <div className="dots">
          {Array.from({length: SLIDE_COUNT}).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot-btn ${i === current ? 'on' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                go(i, i > current ? 1 : -1);
              }}
            />
          ))}
        </div>
        <span className="count">
          {current + 1} / {SLIDE_COUNT}
        </span>
      </div>

      {/* prev / next affordances (desktop) */}
      <button
        type="button"
        className="nav-edge left"
        data-no-advance
        aria-label="Previous slide"
        onClick={(e) => {
          e.stopPropagation();
          back();
        }}
      >
        &lsaquo;
      </button>
      <button
        type="button"
        className="nav-edge right"
        data-no-advance
        aria-label="Next slide"
        onClick={(e) => {
          e.stopPropagation();
          advance();
        }}
      >
        &rsaquo;
      </button>

      {/* notes hint */}
      <div className="notes-hint" data-no-advance>
        Press N — notes
      </div>

      {/* presenter notes — shows CURRENT slide's notes */}
      {notesOpen && (
        <div
          className="notes-overlay"
          data-no-advance
          onClick={(e) => {
            e.stopPropagation();
            setNotesOpen(false);
          }}
        >
          <div className="notes-card" onClick={(e) => e.stopPropagation()}>
            <p className="eyebrow">
              Presenter notes · slide {current + 1} / {SLIDE_COUNT}
            </p>
            <h3>{NOTES[current].scene}</h3>
            <p>{NOTES[current].text}</p>
            <p className="nav">N or Esc to close</p>
          </div>
        </div>
      )}
    </div>
  );
}
