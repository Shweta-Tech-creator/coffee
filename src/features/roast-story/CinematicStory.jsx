import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ─── High-quality photography for each chapter ───────────────────────────────
const CHAPTERS = [
  {
    id: 'plantation',
    num: '01',
    title: 'The Origin',
    subtitle: 'Yirgacheffe · Ethiopia · 2,200m Altitude',
    body: 'In the cloud-draped highlands of Ethiopia, where volcanic soil meets equatorial sunlight, the journey of your cup begins. Each coffee cherry takes nine months to ripen—nurtured by morning mist and afternoon rains.',
    img: '/assets/story/ch1_plantation_1784816434503.jpg',
    colorGrade: 'rgba(10,30,10,0.35)',
    accent: '#6aad5a',
    particles: 'plantation',
  },
  {
    id: 'harvest',
    num: '02',
    title: 'The Harvest',
    subtitle: 'Hand-selected at peak ripeness · 40kg per day',
    body: 'Skilled pickers move through the dense canopy at dawn, selecting only cherries of the deepest crimson. A single experienced farmer harvests just 40 kilograms per day—this is never industrial farming.',
    img: '/assets/story/ch2_harvest_1784816459557.jpg',
    colorGrade: 'rgba(60,15,10,0.30)',
    accent: '#e05a40',
    particles: 'harvest',
  },
  {
    id: 'drying',
    num: '03',
    title: 'The Patience',
    subtitle: 'Sun-dried on raised beds · 21 days',
    body: 'Spread across elevated wooden beds under the African sun, the cherries rest and breathe. Workers turn them by hand twice daily, allowing the pulp to slowly ferment and concentrate extraordinary sweetness into each seed.',
    img: '/assets/story/ch3_drying_1784816474014.jpg',
    colorGrade: 'rgba(40,30,5,0.30)',
    accent: '#e8b84a',
    particles: 'drying',
  },
  {
    id: 'roasting',
    num: '04',
    title: 'The Fire',
    subtitle: 'Probat Drum Roaster · 205°C · 1.2°C/sec RoR',
    body: 'Inside our precision Probat drum roaster, 800+ aromatic compounds unlock through the Maillard reaction. Our roastmaster monitors every variable—temperature, rate of rise, colour—with obsessive precision.',
    img: '/assets/story/ch4_roasting_1784816487024.jpg',
    colorGrade: 'rgba(50,20,0,0.40)',
    accent: '#e87820',
    particles: 'roasting',
  },
  {
    id: 'beans',
    num: '05',
    title: 'The Moment',
    subtitle: 'First crack · 196°C · SCA Score 89+',
    body: 'A subtle audible pop marks the moment of perfection. The bean has expanded, turned rich mahogany brown, and achieved a precise equilibrium of acidity, sweetness, and body. Only then is the drum opened.',
    img: '/assets/story/ch5_beans_1784816548105.jpg',
    colorGrade: 'rgba(30,15,5,0.35)',
    accent: '#c87a3a',
    particles: 'beans',
  },
  {
    id: 'grinding',
    num: '06',
    title: 'The Ritual',
    subtitle: 'Ceramic flat burr · 18g · 200 microns',
    body: 'A ceramic flat burr grinder reduces each roasted bean to precisely the right particle size for the intended brew method. The aroma released in this moment—sweet, roasty, deeply complex—is, many say, the best part.',
    img: '/assets/story/ch6_grinding_1784816559980.jpg',
    colorGrade: 'rgba(20,12,5,0.40)',
    accent: '#a06840',
    particles: 'grinding',
  },
  {
    id: 'brewing',
    num: '07',
    title: 'The Extraction',
    subtitle: '9 bar · 93°C · 28–32 seconds',
    body: 'Pressurised water at precisely 93°C permeates the compressed grounds. The first drops emerge dense, mahogany-dark, crowned with tiger-striped blonde crema. Taste it within 45 seconds—after that, the chemistry changes.',
    img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=1920&q=95',
    colorGrade: 'rgba(25,15,5,0.40)',
    accent: '#c9a96e',
    particles: 'brewing',
  },
  {
    id: 'cup',
    num: '08',
    title: 'The Cup',
    subtitle: 'Handcrafted ceramic · Served at 70°C',
    body: 'A handcrafted ceramic vessel, warm to the touch. The crema shimmers. Steam rises in silent wisps. Nine months of agricultural care, weeks of careful processing, minutes of precise roasting—distilled into this single, perfect moment.',
    img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1920&q=95',
    colorGrade: 'rgba(10,5,0,0.40)',
    accent: '#e8cc8a',
    particles: 'cup',
  },
];

// ─── Particle layers per chapter ─────────────────────────────────────────────

// Plantation: birds + floating pollen dust
const PlantationParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Birds */}
    <div className="absolute top-[18%] animate-bird-1" style={{ fontSize: '10px', color: 'rgba(0,0,0,0.5)' }}>〜</div>
    <div className="absolute top-[22%] animate-bird-2" style={{ fontSize: '8px', color: 'rgba(0,0,0,0.4)' }}>〜</div>
    <div className="absolute top-[15%] animate-bird-3" style={{ fontSize: '11px', color: 'rgba(0,0,0,0.45)' }}>〜</div>
    {/* Pollen dust */}
    <div className="dust dust-a" style={{ left:'15%', top:'60%', width:3, height:3, background:'rgba(180,210,120,0.5)' }} />
    <div className="dust dust-b" style={{ left:'35%', top:'45%', width:2, height:2, background:'rgba(160,200,100,0.4)' }} />
    <div className="dust dust-c" style={{ left:'65%', top:'70%', width:4, height:4, background:'rgba(200,220,140,0.35)' }} />
    <div className="dust dust-d" style={{ left:'80%', top:'55%', width:2, height:2, background:'rgba(170,210,110,0.45)' }} />
    <div className="dust dust-e" style={{ left:'50%', top:'40%', width:3, height:3, background:'rgba(190,215,130,0.4)' }} />
    {/* Morning mist layer */}
    <div className="absolute inset-0" style={{
      background: 'linear-gradient(to bottom, rgba(200,220,180,0.06) 0%, transparent 40%)',
    }} />
    {/* Lens flare (sun ray) */}
    <div className="animate-flare absolute" style={{
      top: '8%', right: '20%',
      width: 300, height: 300,
      borderRadius: '50%',
      background: 'radial-gradient(ellipse, rgba(255,230,150,0.18) 0%, rgba(255,200,80,0.06) 40%, transparent 70%)',
      filter: 'blur(2px)',
    }} />
  </div>
);

// Harvest: falling leaves + cherries
const HarvestParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Falling leaves */}
    <div className="animate-leaf-1 absolute" style={{ left:'20%', top:0, fontSize:14, color:'rgba(120,80,30,0.7)' }}>🍃</div>
    <div className="animate-leaf-2 absolute" style={{ left:'55%', top:0, fontSize:11, color:'rgba(80,120,40,0.6)' }}>🍃</div>
    <div className="animate-leaf-3 absolute" style={{ left:'80%', top:0, fontSize:13, color:'rgba(150,100,40,0.65)' }}>🍃</div>
    {/* Falling cherries */}
    <div className="animate-cherry-1 absolute" style={{ left:'30%', top:0, width:8, height:8, borderRadius:'50%', background:'#c03030' }} />
    <div className="animate-cherry-2 absolute" style={{ left:'60%', top:0, width:6, height:6, borderRadius:'50%', background:'#d04040' }} />
    <div className="animate-cherry-3 absolute" style={{ left:'45%', top:0, width:7, height:7, borderRadius:'50%', background:'#b02020' }} />
    {/* Dust */}
    <div className="dust dust-a" style={{ left:'25%', top:'50%', width:3, height:3, background:'rgba(200,150,80,0.4)' }} />
    <div className="dust dust-c" style={{ left:'70%', top:'65%', width:2, height:2, background:'rgba(180,130,60,0.35)' }} />
  </div>
);

// Drying: heat haze + golden dust
const DryingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Heat haze shimmer bands */}
    <div className="animate-heat-haze absolute" style={{
      bottom:'30%', left:0, right:0, height:80,
      background:'linear-gradient(to bottom, transparent, rgba(255,200,50,0.06), transparent)',
    }} />
    <div className="animate-heat-haze absolute" style={{
      bottom:'45%', left:0, right:0, height:60,
      background:'linear-gradient(to bottom, transparent, rgba(255,210,70,0.04), transparent)',
      animationDelay: '1.5s',
    }} />
    {/* Golden dust motes */}
    {[
      { l:'10%', t:'55%', c:'rgba(220,180,80,0.55)', s:4 },
      { l:'28%', t:'40%', c:'rgba(200,160,60,0.45)', s:3 },
      { l:'48%', t:'62%', c:'rgba(240,200,90,0.5)',  s:5 },
      { l:'68%', t:'48%', c:'rgba(210,175,70,0.4)',  s:3 },
      { l:'82%', t:'57%', c:'rgba(230,190,80,0.48)', s:4 },
      { l:'38%', t:'35%', c:'rgba(215,170,65,0.42)', s:2 },
      { l:'72%', t:'70%', c:'rgba(245,205,95,0.5)',  s:3 },
    ].map((p, i) => (
      <div key={i}
        className={`dust dust-${['a','b','c','d','e','a','b'][i]}`}
        style={{ left:p.l, top:p.t, width:p.s, height:p.s, background:p.c }}
      />
    ))}
    {/* Sun flare */}
    <div className="animate-flare absolute" style={{
      top:'5%', left:'70%', width:400, height:400, borderRadius:'50%',
      background:'radial-gradient(ellipse, rgba(255,220,100,0.22) 0%, rgba(255,190,50,0.08) 40%, transparent 70%)',
      filter:'blur(3px)',
    }} />
  </div>
);

// Roasting: sparks + fire glow
const RoastingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Fire glow from bottom */}
    <div className="animate-fire-glow absolute bottom-0 left-0 right-0" style={{
      height:'45%',
      background:'linear-gradient(to top, rgba(180,60,10,0.5), rgba(220,100,20,0.2), transparent)',
      filter:'blur(25px)',
    }} />
    {/* Secondary fire glow pulse */}
    <div className="animate-fire-glow absolute bottom-0 left-1/4 right-1/4" style={{
      height:'35%',
      background:'linear-gradient(to top, rgba(255,120,20,0.4), transparent)',
      filter:'blur(15px)',
      animationDelay:'1.2s',
    }} />
    {/* Sparks cluster */}
    {[
      { l:'38%', t:'55%' }, { l:'42%', t:'60%' }, { l:'46%', t:'52%' },
      { l:'50%', t:'58%' }, { l:'54%', t:'54%' }, { l:'35%', t:'62%' },
      { l:'58%', t:'57%' }, { l:'44%', t:'65%' },
    ].map((pos, i) => (
      <div key={i}
        className={`spark spark-${(i % 8) + 1}`}
        style={{
          left: pos.l, top: pos.t,
          width: 2 + (i % 3), height: 2 + (i % 3),
          backgroundColor: i % 2 === 0 ? '#ff9900' : '#ffcc44',
          boxShadow: '0 0 6px 2px rgba(255,140,0,0.7)',
        }}
      />
    ))}
    {/* Smoke wisps */}
    <div className="steam-wisp steam-wisp-a" style={{ left:'40%', bottom:'35%', width:50, height:70, background:'rgba(120,100,80,0.25)' }} />
    <div className="steam-wisp steam-wisp-b" style={{ left:'50%', bottom:'38%', width:60, height:80, background:'rgba(100,80,60,0.20)' }} />
    <div className="steam-wisp steam-wisp-c" style={{ left:'55%', bottom:'32%', width:45, height:65, background:'rgba(110,90,70,0.18)' }} />
  </div>
);

// Beans: grounds dust + macro glow
const BeansParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[
      { l:'20%', t:'58%', c:'rgba(120,70,30,0.5)', s:3, a:'a' },
      { l:'40%', t:'45%', c:'rgba(100,55,20,0.45)', s:2, a:'b' },
      { l:'60%', t:'62%', c:'rgba(140,80,35,0.4)', s:4, a:'c' },
      { l:'75%', t:'50%', c:'rgba(115,65,25,0.48)', s:3, a:'d' },
      { l:'85%', t:'40%', c:'rgba(130,75,30,0.42)', s:2, a:'e' },
    ].map((p, i) => (
      <div key={i} className={`dust dust-${p.a}`}
        style={{ left:p.l, top:p.t, width:p.s, height:p.s, background:p.c }} />
    ))}
  </div>
);

// Grinding: fine coffee grounds scatter
const GrindingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 18 }).map((_, i) => {
      const anims = ['a','b','c','d','e'];
      return (
        <div key={i}
          className={`dust dust-${anims[i % 5]}`}
          style={{
            left: `${15 + (i * 4.5) % 70}%`,
            top: `${40 + (i * 3.7) % 35}%`,
            width: 1.5 + (i % 3),
            height: 1.5 + (i % 3),
            background: `rgba(${80 + i * 3},${50 + i * 2},${20 + i},${0.4 + (i % 3) * 0.1})`,
          }}
        />
      );
    })}
  </div>
);

// Brewing: steam + crema shimmer
const BrewingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Steam wisps above the espresso stream */}
    <div className="steam-wisp steam-wisp-a" style={{ left:'46%', bottom:'28%', width:35, height:55, background:'rgba(240,230,210,0.28)' }} />
    <div className="steam-wisp steam-wisp-b" style={{ left:'50%', bottom:'30%', width:30, height:50, background:'rgba(240,230,210,0.22)' }} />
    <div className="steam-wisp steam-wisp-c" style={{ left:'54%', bottom:'26%', width:40, height:60, background:'rgba(240,230,210,0.20)' }} />
    {/* Warm glow from cup */}
    <div className="animate-fire-glow absolute" style={{
      bottom:'20%', left:'30%', right:'30%', height:'20%',
      background:'radial-gradient(ellipse, rgba(180,120,40,0.2) 0%, transparent 70%)',
      filter:'blur(20px)',
    }} />
  </div>
);

// Cup: continuous steam
const CupParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Main steam rising from cup center */}
    {[
      { l:'45%', b:'42%', w:40, h:60, cls:'steam-wisp-a', bg:'rgba(255,250,240,0.30)' },
      { l:'48%', b:'44%', w:35, h:55, cls:'steam-wisp-b', bg:'rgba(255,248,235,0.25)' },
      { l:'51%', b:'40%', w:45, h:65, cls:'steam-wisp-c', bg:'rgba(255,252,242,0.28)' },
      { l:'43%', b:'43%', w:30, h:50, cls:'steam-wisp-d', bg:'rgba(255,248,238,0.22)' },
      { l:'53%', b:'45%', w:38, h:58, cls:'steam-wisp-e', bg:'rgba(255,250,240,0.24)' },
      { l:'46%', b:'38%', w:50, h:70, cls:'steam-wisp-f', bg:'rgba(255,248,236,0.20)' },
    ].map((s, i) => (
      <div key={i}
        className={`steam-wisp ${s.cls}`}
        style={{ left:s.l, bottom:s.b, width:s.w, height:s.h, background:s.bg }}
      />
    ))}
    {/* Ambient warm light */}
    <div className="animate-flare absolute" style={{
      bottom:'25%', left:'25%', right:'25%', height:'35%',
      borderRadius:'50%',
      background:'radial-gradient(ellipse, rgba(200,150,70,0.18) 0%, transparent 70%)',
      filter:'blur(30px)',
    }} />
    {/* Floating café dust */}
    {[
      { l:'20%', t:'30%', s:2, a:'a' }, { l:'75%', t:'45%', s:3, a:'b' },
      { l:'35%', t:'60%', s:2, a:'c' }, { l:'65%', t:'35%', s:2, a:'d' },
    ].map((p, i) => (
      <div key={i} className={`dust dust-${p.a}`}
        style={{ left:p.l, top:p.t, width:p.s, height:p.s, background:'rgba(200,170,110,0.35)' }} />
    ))}
  </div>
);

const PARTICLE_MAP = {
  plantation: PlantationParticles,
  harvest: HarvestParticles,
  drying: DryingParticles,
  roasting: RoastingParticles,
  beans: BeansParticles,
  grinding: GrindingParticles,
  brewing: BrewingParticles,
  cup: CupParticles,
};

// ─── Scroll ranges for each chapter ──────────────────────────────────────────
// Format: [fadeIn start, fully visible, fade out start, fade out end]
// Crossfading overlapping ranges to prevent "blank space" between chapters
const RANGES = [
  [0.02, 0.06, 0.14, 0.18], // plantation
  [0.14, 0.18, 0.26, 0.30], // harvest (fades in as plantation fades out)
  [0.26, 0.30, 0.38, 0.42], // drying
  [0.38, 0.42, 0.50, 0.54], // roasting
  [0.50, 0.54, 0.62, 0.66], // beans
  [0.62, 0.66, 0.74, 0.78], // grinding
  [0.74, 0.78, 0.86, 0.90], // brewing
  [0.86, 0.90, 0.99, 1.00], // cup (blends into ending)
];

// ─── Main Component ───────────────────────────────────────────────────────────
export const CinematicStory = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  // Smooth spring — makes scroll feel like a film camera dolly
  const sp = useSpring(scrollYProgress, { stiffness: 55, damping: 22, restDelta: 0.0001 });

  // Intro
  const introOp = useTransform(sp, [0, 0.02, 0.06], [1, 1, 0]);
  const introY  = useTransform(sp, [0, 0.05], [0, -40]);

  // ── All chapter transforms declared at top level (React rules of hooks) ──
  // Chapter 1
  const c0Op  = useTransform(sp, RANGES[0], [0, 1, 1, 0]);
  const c0Sc  = useTransform(sp, [RANGES[0][0], RANGES[0][2]], [1.1, 1.0]);
  const c0TY  = useTransform(sp, [RANGES[0][0], RANGES[0][1]], [60, 0]);
  const c0TOp = useTransform(sp, RANGES[0], [0, 1, 1, 0]);
  // Chapter 2
  const c1Op  = useTransform(sp, RANGES[1], [0, 1, 1, 0]);
  const c1Sc  = useTransform(sp, [RANGES[1][0], RANGES[1][2]], [1.1, 1.0]);
  const c1TY  = useTransform(sp, [RANGES[1][0], RANGES[1][1]], [60, 0]);
  const c1TOp = useTransform(sp, RANGES[1], [0, 1, 1, 0]);
  // Chapter 3
  const c2Op  = useTransform(sp, RANGES[2], [0, 1, 1, 0]);
  const c2Sc  = useTransform(sp, [RANGES[2][0], RANGES[2][2]], [1.1, 1.0]);
  const c2TY  = useTransform(sp, [RANGES[2][0], RANGES[2][1]], [60, 0]);
  const c2TOp = useTransform(sp, RANGES[2], [0, 1, 1, 0]);
  // Chapter 4
  const c3Op  = useTransform(sp, RANGES[3], [0, 1, 1, 0]);
  const c3Sc  = useTransform(sp, [RANGES[3][0], RANGES[3][2]], [1.1, 1.0]);
  const c3TY  = useTransform(sp, [RANGES[3][0], RANGES[3][1]], [60, 0]);
  const c3TOp = useTransform(sp, RANGES[3], [0, 1, 1, 0]);
  // Chapter 5
  const c4Op  = useTransform(sp, RANGES[4], [0, 1, 1, 0]);
  const c4Sc  = useTransform(sp, [RANGES[4][0], RANGES[4][2]], [1.1, 1.0]);
  const c4TY  = useTransform(sp, [RANGES[4][0], RANGES[4][1]], [60, 0]);
  const c4TOp = useTransform(sp, RANGES[4], [0, 1, 1, 0]);
  // Chapter 6
  const c5Op  = useTransform(sp, RANGES[5], [0, 1, 1, 0]);
  const c5Sc  = useTransform(sp, [RANGES[5][0], RANGES[5][2]], [1.1, 1.0]);
  const c5TY  = useTransform(sp, [RANGES[5][0], RANGES[5][1]], [60, 0]);
  const c5TOp = useTransform(sp, RANGES[5], [0, 1, 1, 0]);
  // Chapter 7
  const c6Op  = useTransform(sp, RANGES[6], [0, 1, 1, 0]);
  const c6Sc  = useTransform(sp, [RANGES[6][0], RANGES[6][2]], [1.1, 1.0]);
  const c6TY  = useTransform(sp, [RANGES[6][0], RANGES[6][1]], [60, 0]);
  const c6TOp = useTransform(sp, RANGES[6], [0, 1, 1, 0]);
  // Chapter 8
  const c7Op  = useTransform(sp, RANGES[7], [0, 1, 1, 1]);
  const c7Sc  = useTransform(sp, [RANGES[7][0], RANGES[7][2]], [1.1, 1.0]);
  const c7TY  = useTransform(sp, [RANGES[7][0], RANGES[7][1]], [60, 0]);
  const c7TOp = useTransform(sp, RANGES[7], [0, 1, 1, 1]);

  // Ending
  const endOp  = useTransform(sp, [0.97, 1.0], [0, 1]);
  const endY   = useTransform(sp, [0.97, 1.0], [50, 0]);

  // Progress bar
  const progressW = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Bundle for iteration
  const transforms = [
    { op: c0Op, sc: c0Sc, tY: c0TY, tOp: c0TOp },
    { op: c1Op, sc: c1Sc, tY: c1TY, tOp: c1TOp },
    { op: c2Op, sc: c2Sc, tY: c2TY, tOp: c2TOp },
    { op: c3Op, sc: c3Sc, tY: c3TY, tOp: c3TOp },
    { op: c4Op, sc: c4Sc, tY: c4TY, tOp: c4TOp },
    { op: c5Op, sc: c5Sc, tY: c5TY, tOp: c5TOp },
    { op: c6Op, sc: c6Sc, tY: c6TY, tOp: c6TOp },
    { op: c7Op, sc: c7Sc, tY: c7TY, tOp: c7TOp },
  ];

  return (
    <div ref={containerRef} style={{ height: '600vh' }}>
      {/* ── Sticky cinematic viewport ────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0A0806]">

        {/* Grain film texture */}
        <div
          className="absolute inset-0 z-[50] pointer-events-none mix-blend-overlay"
          style={{
            opacity: 0.032,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px',
          }}
        />

        {/* Letterbox bars — cinematic 2.35:1 */}
        <div className="absolute top-0 left-0 right-0 h-[6vh] bg-black z-[40] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[6vh] bg-black z-[40] pointer-events-none" />

        {/* ── Intro screen ───────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 z-[30] bg-[#0A0806] flex items-center justify-center"
          style={{ opacity: introOp, y: introY }}
        >
          <div className="text-center px-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center gap-5 mb-8">
                <div className="h-px w-16 bg-[#C9A96E]/50" />
                <span className="font-mono-custom text-[#C9A96E] text-[10px] tracking-[0.6em] uppercase">
                  Bean Haven · Est. 2016
                </span>
                <div className="h-px w-16 bg-[#C9A96E]/50" />
              </div>
              <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl text-[#EDE4D6] font-light leading-none mb-6">
                Our Story
              </h2>
              <p className="font-mono-custom text-[#5A5040] text-[10px] tracking-[0.4em] uppercase mb-12">
                From seed to cup · Eight chapters
              </p>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-px h-16 bg-gradient-to-b from-[#C9A96E]/60 to-transparent mx-auto" />
                <p className="font-mono-custom text-[#3A3025] text-[9px] tracking-[0.5em] uppercase mt-2">
                  Scroll
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── 8 Chapter Scenes ───────────────────────────────────────── */}
        {CHAPTERS.map((chapter, idx) => {
          const t = transforms[idx];
          const Particles = PARTICLE_MAP[chapter.particles];
          return (
            <motion.div
              key={chapter.id}
              className="absolute inset-0"
              style={{ opacity: t.op }}
            >
              {/* Background image — zooms slowly as scroll progresses */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{ scale: t.sc }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${chapter.img}')` }}
                />
              </motion.div>

              {/* Cinematic color grade overlay */}
              <div
                className="absolute inset-0"
                style={{ background: chapter.colorGrade }}
              />

              {/* Vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.75) 100%)',
                }}
              />

              {/* Bottom gradient for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 25%, transparent 50%, rgba(0,0,0,0.85) 100%)',
                }}
              />

              {/* Chapter-specific ambient particles */}
              <Particles />

              {/* Chapter text — slides up on entry */}
              <motion.div
                className="absolute bottom-[8vh] left-0 right-0 px-6 sm:px-12 lg:px-20 max-w-5xl"
                style={{ y: t.tY, opacity: t.tOp }}
              >
                {/* Chapter number */}
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <span
                    className="font-mono-custom text-[10px] sm:text-[11px] tracking-[0.55em] uppercase"
                    style={{ color: chapter.accent }}
                  >
                    Chapter {chapter.num}
                  </span>
                  <div className="h-px w-10 sm:w-16" style={{ background: chapter.accent, opacity: 0.5 }} />
                </div>

                {/* Title */}
                <h2
                  className="font-display text-4xl sm:text-6xl lg:text-8xl font-light text-white leading-none mb-3 sm:mb-4"
                  style={{ textShadow: '0 4px 40px rgba(0,0,0,0.8)' }}
                >
                  {chapter.title}
                </h2>

                {/* Subtitle */}
                <p
                  className="font-mono-custom text-[9px] sm:text-[10px] tracking-[0.4em] uppercase mb-4 sm:mb-6"
                  style={{ color: chapter.accent }}
                >
                  {chapter.subtitle}
                </p>

                {/* Body — hidden on very small screens */}
                <p className="hidden sm:block text-white/60 font-light text-sm sm:text-base leading-relaxed max-w-xl">
                  {chapter.body}
                </p>
              </motion.div>
            </motion.div>
          );
        })}

        {/* ── Ending scene ────────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 z-[20] flex items-center justify-center"
          style={{ opacity: endOp }}
          aria-hidden="true"
        >
          {/* Dark warm background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 100% 80% at 50% 60%, #1a0d05 0%, #0A0806 70%)',
            }}
          />

          {/* Ending steam */}
          {[
            { l:'40%', b:'38%', w:55, h:80, cls:'steam-wisp-a', bg:'rgba(255,248,235,0.22)' },
            { l:'47%', b:'40%', w:45, h:70, cls:'steam-wisp-b', bg:'rgba(255,246,230,0.18)' },
            { l:'54%', b:'36%', w:60, h:85, cls:'steam-wisp-c', bg:'rgba(255,250,240,0.20)' },
            { l:'43%', b:'42%', w:40, h:65, cls:'steam-wisp-d', bg:'rgba(255,248,238,0.16)' },
            { l:'51%', b:'39%', w:50, h:75, cls:'steam-wisp-e', bg:'rgba(255,245,232,0.18)' },
          ].map((s, i) => (
            <div key={i}
              className={`steam-wisp ${s.cls}`}
              style={{ left:s.l, bottom:s.b, width:s.w, height:s.h, background:s.bg }}
            />
          ))}

          {/* Warm glow under text */}
          <div className="animate-flare absolute" style={{
            top:'40%', left:'15%', right:'15%', height:'30%', borderRadius:'50%',
            background:'radial-gradient(ellipse, rgba(201,169,110,0.15) 0%, transparent 70%)',
            filter:'blur(40px)',
          }} />

          {/* The message */}
          <motion.div
            className="relative z-10 text-center px-6 max-w-4xl"
            style={{ y: endY }}
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-10 sm:w-20 bg-[#C9A96E]/40" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-[#C9A96E]/60" />
                ))}
              </div>
              <div className="h-px w-10 sm:w-20 bg-[#C9A96E]/40" />
            </div>

            <h2
              className="font-display text-3xl sm:text-5xl lg:text-7xl font-light text-[#EDE4D6] leading-tight"
              style={{
                textShadow: '0 0 120px rgba(201,169,110,0.25), 0 4px 60px rgba(0,0,0,0.9)',
              }}
            >
              Every Bean Has a Journey.
              <br />
              <em className="text-[#C9A96E]">Every Cup Has a Story.</em>
            </h2>

            <div className="mt-10 sm:mt-14 flex items-center justify-center gap-5">
              <div className="h-px w-8 bg-[#C9A96E]/30" />
              <span className="font-mono-custom text-[#4A4030] text-[9px] sm:text-[10px] tracking-[0.5em] uppercase">
                Bean Haven Café & Roastery
              </span>
              <div className="h-px w-8 bg-[#C9A96E]/30" />
            </div>
          </motion.div>
        </motion.div>

        {/* ── Chapter sidebar indicators ──────────────────────────────── */}
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-[45] hidden sm:flex flex-col gap-2.5">
          {CHAPTERS.map((ch, i) => (
            <div key={ch.id} className="flex items-center gap-2 group">
              <span
                className="font-mono-custom text-[8px] uppercase tracking-widest text-white/0 group-hover:text-white/40 transition-colors"
                style={{ color: ch.accent }}
              />
              <div className="w-0.5 h-5 rounded-full overflow-hidden bg-white/10">
                <motion.div
                  className="w-full rounded-full origin-top"
                  style={{
                    height: '100%',
                    backgroundColor: ch.accent,
                    scaleY: transforms[i].op,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom progress bar ─────────────────────────────────────── */}
        <div className="absolute bottom-[6vh] left-0 right-0 h-px bg-white/5 z-[45] pointer-events-none">
          <motion.div className="h-full bg-[#C9A96E]" style={{ width: progressW }} />
        </div>

      </div>
    </div>
  );
};
