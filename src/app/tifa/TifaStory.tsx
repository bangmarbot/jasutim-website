'use client';

import {useEffect, useRef, useState, useCallback} from 'react';

/* ------------------------------------------------------------------ */
/* Presenter notes (press N) — talking points per scene from brief.   */
/* ------------------------------------------------------------------ */
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
];

/* ------------------------------------------------------------------ */
/* Step — fades/translates up when it enters the viewport.            */
/* ------------------------------------------------------------------ */
function Step({
  children,
  className = '',
  onFirstView,
}: {
  children: React.ReactNode;
  className?: string;
  onFirstView?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('in');
            if (!seen) {
              setSeen(true);
              onFirstView?.();
            }
          }
        }
      },
      {threshold: 0.55, rootMargin: '0px 0px -12% 0px'}
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, onFirstView]);

  return (
    <div ref={ref} className={`step ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CountUp — animates a number from 0 to target when triggered.       */
/* ------------------------------------------------------------------ */
function CountUp({to, prefix = '', suffix = ''}: {to: number; prefix?: string; suffix?: string}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (reduce) {
            setVal(to);
            return;
          }
          const dur = 1400;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(eased * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      {threshold: 0.6}
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 6 loop diagram — 4 nodes light up in sequence on scroll.     */
/* ------------------------------------------------------------------ */
const LOOP_NODES = [
  {t: 'Food scraps', s: 'kitchen & market waste'},
  {t: 'Black-soldier-fly larvae', s: 'eat hundreds of kg / day'},
  {t: 'Chicken feed', s: 'protein-rich, low cost'},
  {t: 'Eggs', s: 'food, back to the table'},
];

function LoopDiagram() {
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // sequentially light up nodes
          [1, 2, 3, 4].forEach((n, i) => {
            timers.push(setTimeout(() => setActive(n), 350 * (i + 1)));
          });
          io.disconnect();
        }
      },
      {threshold: 0.4}
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  // 4 nodes positioned around a circle (cx 200 cy 200 r 130)
  const cx = 200;
  const cy = 200;
  const r = 130;
  const pts = [
    {x: cx, y: cy - r}, // top
    {x: cx + r, y: cy}, // right
    {x: cx, y: cy + r}, // bottom
    {x: cx - r, y: cy}, // left
  ];
  // arcs connecting consecutive nodes (quarter circles)
  const arcs = [
    `M ${pts[0].x} ${pts[0].y} A ${r} ${r} 0 0 1 ${pts[1].x} ${pts[1].y}`,
    `M ${pts[1].x} ${pts[1].y} A ${r} ${r} 0 0 1 ${pts[2].x} ${pts[2].y}`,
    `M ${pts[2].x} ${pts[2].y} A ${r} ${r} 0 0 1 ${pts[3].x} ${pts[3].y}`,
    `M ${pts[3].x} ${pts[3].y} A ${r} ${r} 0 0 1 ${pts[0].x} ${pts[0].y}`,
  ];
  const labels = ['Food\nscraps', 'BSF\nlarvae', 'Chicken\nfeed', 'Eggs'];

  return (
    <div className="loop-grid" ref={wrapRef}>
      <svg className="loop-svg" viewBox="0 0 400 400" role="img" aria-label="Circular loop: food scraps to black-soldier-fly larvae to chicken feed to eggs and back">
        <defs>
          <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(152 63% 35%)" />
          </marker>
        </defs>
        {arcs.map((d, i) => (
          <path
            key={i}
            d={d}
            className={`arc ${active > i + 1 || (i === 3 && active >= 4) ? 'lit' : ''}`}
            fill="none"
            stroke="hsl(152 63% 35%)"
            strokeWidth="3.5"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
          />
        ))}
        {pts.map((p, i) => (
          <g key={i} className={`node ${active >= i + 1 ? 'lit' : ''}`}>
            <circle className="node-ring" cx={p.x} cy={p.y} r="46" fill="hsl(48 33% 98%)" stroke="hsl(152 63% 35%)" strokeWidth="3" />
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
          </g>
        ))}
      </svg>

      <ol className="loop-legend">
        {LOOP_NODES.map((n, i) => (
          <li key={i} className={active >= i + 1 ? 'lit' : ''}>
            <span className="idx">{i + 1}</span>
            <span>
              <span className="lt">{n.t}</span>
              <span className="ls">{n.s}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main story                                                          */
/* ------------------------------------------------------------------ */
export function TifaStory() {
  const [progress, setProgress] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const [noteIdx, setNoteIdx] = useState(0);

  // scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // keyboard: N toggles notes, arrows page through notes when open
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'n' || e.key === 'N') {
        setNotesOpen((v) => !v);
      } else if (notesOpen && (e.key === 'ArrowRight' || e.key === ' ')) {
        e.preventDefault();
        setNoteIdx((i) => Math.min(NOTES.length - 1, i + 1));
      } else if (notesOpen && e.key === 'ArrowLeft') {
        setNoteIdx((i) => Math.max(0, i - 1));
      } else if (e.key === 'Escape') {
        setNotesOpen(false);
      }
    },
    [notesOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div className="tifa-root">
      <div className="tifa-progress" style={{width: `${progress}%`}} />

      <div className="tifa-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo.png" alt="JASUTIM" />
        <span>JASUTIM</span>
      </div>

      {/* ---------- SCENE 1 — HELLO ---------- */}
      <section className="scene" aria-label="Hello">
        <div className="scene-track" style={{minHeight: '120vh'}}>
          <div className="scene-sticky">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="scene-bg" src="/images/tifa/team-with-muslih.jpg" alt="The JASUTIM team, including Muhamad Muslih" />
            <div className="scene-scrim scrim-bottom" />
            <div className="scene-fg">
              <Step>
                <p className="eyebrow">TIFA 2026 · Waste Circular Economy &amp; Climate Action</p>
                <h1 className="display xl">From Trash to Treasure</h1>
                <p className="sub">Waste management in Indonesia.</p>
                <p className="tiny">Muhamad Muslih — Chairman of Trustees, Yayasan JASUTIM</p>
              </Step>
            </div>
            <div className="scroll-cue">
              Scroll
              <span className="arrow">&darr;</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SCENE 2 — THE PROBLEM ---------- */}
      <section className="scene" aria-label="The problem: Bantar Gebang">
        <div className="scene-sticky">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="scene-bg" src="/images/tifa/problem-bantargebang.jpg" alt="Bantar Gebang landfill in Bekasi" />
          <div className="scene-scrim scrim-full" />
          <p className="credit">Photo: 22Kartika / Wikimedia Commons · CC BY-SA 3.0</p>
        </div>
        <div className="scene-track" style={{marginTop: '-100vh'}}>
          <div style={{height: '60vh'}} />
          <ProblemStep className="line">This is Bantar Gebang.</ProblemStep>
          <ProblemStep className="line">Southeast Asia&rsquo;s largest landfill.</ProblemStep>
          <ProblemStep className="stat-band">&asymp;200 football fields wide · 50+ metres high</ProblemStep>
          <ProblemStep className="line small">And it sits in my city — Bekasi.</ProblemStep>
          <ProblemStep className="line small">Half of our home trash is food waste — almost no one recycles it.</ProblemStep>
          <div style={{height: '20vh'}} />
        </div>
      </section>

      {/* ---------- SCENE 3 — THE BIG IDEA ---------- */}
      <section className="scene" aria-label="The big idea: waste bank">
        <div className="scene-sticky">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="scene-bg" src="/images/tifa/weighing.jpg" alt="Weighing sorted waste at the bank" />
          <div className="scene-scrim scrim-full" />
        </div>
        <div className="scene-track" style={{marginTop: '-100vh'}}>
          <div style={{height: '50vh'}} />
          <ProblemStep className="line">What if trash worked like money?</ProblemStep>
          <ProblemStepFlow />
          <ProblemStep className="line small">Trash becomes income.</ProblemStep>
          <div style={{height: '20vh'}} />
        </div>
      </section>

      {/* ---------- SCENE 4 — MEET JASUTIM ---------- */}
      <section className="scene" aria-label="Meet JASUTIM">
        <div className="scene-track" style={{minHeight: '130vh'}}>
          <div className="scene-sticky">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="scene-bg" src="/images/tifa/collection-volume.jpg" alt="Volume of waste collected by JASUTIM" />
            <div className="scene-scrim scrim-bottom" />
            <div className="scene-fg">
              <Step>
                <p className="eyebrow">Meet us</p>
                <p className="display md">JASUTIM — a community waste bank in Bekasi.</p>
                <div className="stats">
                  <div className="stat">
                    <div className="num">
                      <CountUp prefix="&asymp;" to={40} />
                    </div>
                    <div className="lbl">tonnes recovered / year</div>
                  </div>
                  <div className="stat">
                    <div className="num">
                      <CountUp to={5} />
                    </div>
                    <div className="lbl">waste banks mentored</div>
                  </div>
                  <div className="stat">
                    <div className="num">
                      <CountUp to={200} suffix="+" />
                    </div>
                    <div className="lbl">families sorting at home</div>
                  </div>
                </div>
              </Step>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SCENE 5 — CIRCULAR ECONOMY NOW ---------- */}
      <section className="scene" aria-label="Circular economy now">
        <div className="scene-track" style={{minHeight: '130vh'}}>
          <div className="scene-sticky">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="scene-bg" src="/images/tifa/eco-candle.jpg" alt="Scented candle made from used cooking oil" />
            <div className="scene-scrim scrim-full" />
            <div className="scene-fg">
              <Step>
                <h2 className="display lg">Nothing is wasted.</h2>
                <div className="cards">
                  <div className="card-loop">
                    <p className="tag">Loop A · Plastic</p>
                    <p className="body">
                      Plastic bottles &rarr; flakes &rarr; <strong>new products</strong>.
                    </p>
                  </div>
                  <div className="card-loop">
                    <p className="tag">Loop B · Cooking oil</p>
                    <p className="body">
                      Used cooking oil &rarr; scented candles, <strong>33&times; more valuable</strong>.
                    </p>
                  </div>
                </div>
              </Step>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SCENE 6 — NEXT PROJECT (in design) ---------- */}
      <section className="scene-loop" aria-label="Next project in design: food waste to food">
        <div className="loop-wrap">
          <Step>
            <span className="badge-design">
              <span className="dot" />
              Our next project — in design
            </span>
            <h2 className="loop-title">From food waste… to food.</h2>
          </Step>
          <LoopDiagram />
          <p className="loop-foot">
            We&rsquo;re building this design now — see the full concept at <strong>lab.jasutim.org</strong>.
          </p>
        </div>
      </section>

      {/* ---------- SCENE 7 — THE LESSON ---------- */}
      <section className="scene lesson" aria-label="The lesson">
        <div className="scene-track" style={{minHeight: '110vh'}}>
          <div className="scene-sticky">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="scene-bg" src="/images/tifa/community-women.jpg" alt="Women of the community sorting waste together" />
            <div className="scene-scrim scrim-full" />
            <div className="scene-fg center">
              <Step>
                <p className="display lg">
                  You don&rsquo;t need fancy technology. You need a community — and a place to start.
                </p>
              </Step>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SCENE 8 — WHAT YOU CAN DO ---------- */}
      <section className="scene" aria-label="What you can do">
        <div className="scene-track" style={{minHeight: '130vh'}}>
          <div className="scene-sticky">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="scene-bg" src="/images/tifa/community-weighin.jpg" alt="Community weigh-in at the waste bank" />
            <div className="scene-scrim scrim-bottom" />
            <div className="scene-fg">
              <Step>
                <h2 className="display md">What you can do — starting tomorrow</h2>
                <div className="actions">
                  <div className="action-item">
                    <span className="n">1</span>
                    <span className="t">
                      <b>Separate</b> your trash
                    </span>
                  </div>
                  <div className="action-item">
                    <span className="n">2</span>
                    <span className="t">
                      <b>Refuse</b> single-use plastic
                    </span>
                  </div>
                  <div className="action-item">
                    <span className="n">3</span>
                    <span className="t">
                      <b>Start small</b> — even a waste bank at school
                    </span>
                  </div>
                </div>
              </Step>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CLOSING BAND ---------- */}
      <section className="closing" aria-label="Closing">
        <Step>
          <h2 className="display lg">Trash is just treasure in the wrong place.</h2>
          <p className="thanks">
            Terima kasih <span className="id">·</span> Thank you
          </p>
          <div className="closing-foot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="JASUTIM logo" />
            <span className="url">jasutim.org</span>
          </div>
        </Step>
      </section>

      {/* ---------- Presenter notes ---------- */}
      <div className="notes-hint">Press N — notes</div>
      {notesOpen && (
        <div className="notes-overlay" onClick={() => setNotesOpen(false)}>
          <div className="notes-card" onClick={(e) => e.stopPropagation()}>
            <p className="eyebrow">Presenter notes · {noteIdx + 1} / {NOTES.length}</p>
            <h3>{NOTES[noteIdx].scene}</h3>
            <p>{NOTES[noteIdx].text}</p>
            <p className="nav">← → to move · N or Esc to close</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers for the sticky-overlay scenes (2 & 3): each step is a       */
/* full-viewport block that pins its content centered over the image. */
/* ------------------------------------------------------------------ */
function ProblemStep({children, className = ''}: {children: React.ReactNode; className?: string}) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(24px, 6vw, 72px)',
      }}
    >
      <Step>
        <p className={className} style={{margin: 0}}>
          {children}
        </p>
      </Step>
    </div>
  );
}

function ProblemStepFlow() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(24px, 6vw, 72px)',
      }}
    >
      <Step>
        <p className="line small" style={{margin: 0}}>
          Bank Sampah — a Waste Bank.
        </p>
        <div className="flow">
          <span className="flow-step">Bring sorted trash</span>
          <span className="flow-arrow">&rarr;</span>
          <span className="flow-step">We weigh it</span>
          <span className="flow-arrow">&rarr;</span>
          <span className="flow-step">Money into your savings</span>
        </div>
      </Step>
    </div>
  );
}
