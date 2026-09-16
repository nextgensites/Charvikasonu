import { type FormEvent, type PointerEvent as ReactPointerEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, Globe2, Luggage, Menu, MessageCircle, Phone, Quote, Route, ShieldCheck, Sparkles, Star, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route as WouterRoute, Switch, useLocation, Router as WouterRouter } from 'wouter';
import photo01 from '@assets/IMG_20260917_012620_1789588757103.jpg';
import photo02 from '@assets/IMG_20260917_012603_1789588757185.jpg';
import photo03 from '@assets/IMG_20260917_012546_1789588757233.jpg';
import photo04 from '@assets/IMG_20260917_012523_1789588757275.jpg';
import photo05 from '@assets/IMG_20260917_012505_1789588757311.jpg';
import photo06 from '@assets/IMG_20260917_012447_1789588757367.jpg';
import photo07 from '@assets/IMG_20260917_012428_1789588757424.jpg';
import photo08 from '@assets/IMG_20260917_012404_1789588757499.jpg';
import photo09 from '@assets/IMG_20260917_012350_1789588757587.jpg';
import photo10 from '@assets/IMG_20260917_012337_1789588757690.jpg';
import photo11 from '@assets/IMG_20260917_012318_1789588757796.jpg';
import photo12 from '@assets/IMG_20260917_012302_1789588757877.jpg';
import photo13 from '@assets/IMG_20260917_012249_1789588757955.jpg';

const queryClient = new QueryClient();
const whatsappUrl = 'https://wa.me/918880734777?text=Hello%20Charvika%20Tours%20and%20Travels%2C%20I%27d%20like%20to%20plan%20a%20personalised%20journey.';

const destinations = [
  {
    id: 'kerala',
    name: 'Kerala, unhurried',
    place: 'Alappuzha · Munnar · Marari',
    detail: 'Backwater mornings, cardamom air, and coastlines that ask you to slow down.',
    fact: 'Best for  ·  Monsoon & winter',
    days: '06 nights / 07 days',
    image: photo03,
    palette: '#356b6d',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan, in gold',
    place: 'Jaisalmer · Jodhpur · Udaipur',
    detail: 'Desert dusk, hand-painted havelis, and a table set beneath a million stars.',
    fact: 'Best for  ·  Culture & celebration',
    days: '08 nights / 09 days',
    image: photo04,
    palette: '#b47b45',
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya, alive',
    place: 'Shillong · Cherrapunji · Dawki',
    detail: 'Cloud forests, living root bridges, and roads that turn every bend into a reveal.',
    fact: 'Best for  ·  Wild-hearted weekends',
    days: '05 nights / 06 days',
    image: photo02,
    palette: '#668c72',
  },
  {
    id: 'himachal',
    name: 'Himachal, snowbound',
    place: 'Manali · Solang · Old Town',
    detail: 'Pine-scented mornings, mountain roads, and the easy warmth of a winter escape.',
    fact: 'Best for  ·  Snow & stillness',
    days: '05 nights / 06 days',
    image: photo01,
    palette: '#5b7891',
  },
];

const galleryPhotos = [
  { image: photo01, label: 'Snowbound Himachal' },
  { image: photo02, label: 'Meghalaya in mist' },
  { image: photo03, label: 'Mountain light' },
  { image: photo04, label: 'Jaisalmer in gold' },
  { image: photo05, label: 'Udaipur on water' },
  { image: photo06, label: 'A slower road' },
  { image: photo07, label: 'The view ahead' },
  { image: photo08, label: 'Made for wandering' },
  { image: photo09, label: 'A place to pause' },
  { image: photo10, label: 'Between here and there' },
  { image: photo11, label: 'Green season' },
  { image: photo12, label: 'Open country' },
  { image: photo13, label: 'The long way home' },
];

const faqs = [
  {
    question: 'Can Charvika build a trip around our pace?',
    answer: 'That is the point. Tell us what you want to feel, how slowly you like to travel, and what you would rather skip. We build the route around your people, not around a catalogue.',
  },
  {
    question: 'Do you arrange stays and transport too?',
    answer: 'Yes. From boutique stays and private transfers to rail journeys, local hosts, guides and the small reservations that are hard to find yourself, we hold the moving pieces together.',
  },
  {
    question: 'How soon should we get in touch?',
    answer: 'For a considered itinerary, two to six weeks is a comfortable window. Short-notice escapes are welcome too — WhatsApp us and we will tell you what is possible.',
  },
  {
    question: 'Is Charvika only for luxury travellers?',
    answer: 'No. Thoughtful is not the same as extravagant. We work across budgets, always protecting the things that make a trip feel special: the rhythm, the welcome and the sense of place.',
  },
];

function RemoteImage({ src, alt }: { src: string; alt: string }) {
  const [visible, setVisible] = useState(true);
  return (
    <img
      className={visible ? '' : 'hidden'}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setVisible(false)}
    />
  );
}

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDestination, setActiveDestination] = useState('kerala');
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [destinationChoice, setDestinationChoice] = useState('');
  const active = destinations.find((destination) => destination.id === activeDestination) ?? destinations[0];

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const closeMobile = () => setMobileOpen(false);
  const moveWallpaper = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty('--wallpaper-x', x.toFixed(3));
    event.currentTarget.style.setProperty('--wallpaper-y', y.toFixed(3));
  };
  const resetWallpaper = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--wallpaper-x', '0');
    event.currentTarget.style.setProperty('--wallpaper-y', '0');
  };

  return (
    <main className="page-shell grain min-h-[100dvh]">
      <div className="fixed left-0 top-0 z-50 h-1 bg-[var(--copper)] transition-[width] duration-150" style={{ width: `${scrollProgress * 100}%` }} />

      <section id="home" className="relative min-h-[760px] overflow-hidden bg-[var(--ink)] text-[var(--white-ink)] md:min-h-[840px]">
        <div className="hero-grid absolute inset-0 opacity-80" />
        <div className="pointer-events-none absolute -right-40 top-16 h-[460px] w-[460px] rounded-full border border-[rgba(239,184,102,.24)] md:h-[720px] md:w-[720px]" />
        <div className="hero-orbit pointer-events-none absolute -right-32 top-28 h-[430px] w-[430px] rounded-full border border-dashed border-[rgba(239,184,102,.25)] md:h-[680px] md:w-[680px]" />
        <div className="pointer-events-none absolute left-[43%] top-[29%] h-2 w-2 rounded-full bg-[var(--saffron)] shadow-[0_0_0_9px_rgba(239,184,102,.12)]" />

        <header className="relative z-20 mx-auto flex w-[min(1180px,calc(100%-32px))] items-center justify-between border-b border-[rgba(247,243,233,.18)] py-5 md:w-[min(1180px,calc(100%-48px))]">
          <a href="#home" className="group flex items-center gap-3" data-testid="link-brand-home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--saffron)] text-sm font-bold text-[var(--saffron)] transition-transform duration-300 group-hover:rotate-12">C</span>
            <span className="text-[11px] font-extrabold tracking-[.18em] text-[var(--white-ink)]">CHARVIKA<br /><span className="font-medium text-[rgba(247,243,233,.6)]">TOURS &amp; TRAVELS</span></span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <a href="#journeys" className="text-[11px] font-semibold uppercase tracking-[.15em] text-[rgba(247,243,233,.7)] transition-colors hover:text-[var(--saffron)]" data-testid="link-nav-journeys">Our way</a>
            <a href="#destinations" className="text-[11px] font-semibold uppercase tracking-[.15em] text-[rgba(247,243,233,.7)] transition-colors hover:text-[var(--saffron)]" data-testid="link-nav-destinations">Destinations</a>
             <a href="#moments" className="text-[11px] font-semibold uppercase tracking-[.15em] text-[rgba(247,243,233,.7)] transition-colors hover:text-[var(--saffron)]" data-testid="link-nav-moments">Moments</a>
            <a href="#contact" className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.15em] text-[var(--saffron)] transition-colors hover:text-[var(--white-ink)]" data-testid="link-nav-enquire">Plan a journey <ArrowUpRight size={14} /></a>
          </nav>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(247,243,233,.25)] text-[var(--white-ink)] md:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle navigation" data-testid="button-toggle-navigation">
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </header>

        {mobileOpen && (
          <nav className="mobile-menu relative z-20 mx-4 mt-2 flex flex-col gap-1 rounded-2xl border border-[rgba(247,243,233,.14)] bg-[#252e38] p-3 md:hidden" aria-label="Mobile navigation">
            <a href="#journeys" onClick={closeMobile} className="rounded-xl px-4 py-3 text-sm text-[var(--white-ink)] hover:bg-[rgba(247,243,233,.08)]" data-testid="link-mobile-journeys">Our way</a>
            <a href="#destinations" onClick={closeMobile} className="rounded-xl px-4 py-3 text-sm text-[var(--white-ink)] hover:bg-[rgba(247,243,233,.08)]" data-testid="link-mobile-destinations">Destinations</a>
             <a href="#moments" onClick={closeMobile} className="rounded-xl px-4 py-3 text-sm text-[var(--white-ink)] hover:bg-[rgba(247,243,233,.08)]" data-testid="link-mobile-moments">Moments</a>
            <a href="#contact" onClick={closeMobile} className="rounded-xl bg-[var(--copper)] px-4 py-3 text-sm font-bold text-[var(--white-ink)]" data-testid="link-mobile-contact">Plan a journey</a>
          </nav>
        )}

        <div className="relative z-10 mx-auto grid w-[min(1180px,calc(100%-32px))] items-center gap-10 pb-20 pt-20 md:min-h-[690px] md:w-[min(1180px,calc(100%-48px))] md:grid-cols-[1.03fr_.97fr] md:gap-16 md:pb-24 md:pt-24">
          <div>
            <div className="reveal brand-lockup">
              <span className="brand-lockup-name">CHARVIKA</span>
              <span className="brand-lockup-line" />
              <span className="brand-lockup-subtitle">TOURS <span>&amp;</span> TRAVELS</span>
            </div>
            <div className="reveal reveal-delay-1 flex items-center gap-3 text-[var(--saffron)]">
              <span className="h-px w-9 bg-[var(--saffron)]" />
              <span className="mono-font text-[10px] uppercase tracking-[.2em]">A travel studio from India</span>
            </div>
            <h1 className="reveal reveal-delay-2 mt-7 max-w-[680px] text-balance text-[clamp(4rem,11vw,8.4rem)] font-semibold leading-[.86] tracking-[-.065em] text-[var(--white-ink)]">
              Go where<br /><em className="display-font font-medium text-[var(--saffron)]">the story</em><br />begins.
            </h1>
            <p className="reveal reveal-delay-3 mt-8 max-w-[420px] text-[15px] leading-7 text-[rgba(247,243,233,.68)]">
              Personal journeys through the India you came to feel — shaped around your pace, your people, and the details you will still talk about years later.
            </p>
            <div className="reveal reveal-delay-4 mt-9 flex flex-wrap items-center gap-4">
              <a href="#contact" className="group inline-flex items-center gap-4 rounded-full bg-[var(--copper)] px-6 py-3.5 text-xs font-bold uppercase tracking-[.12em] text-[var(--white-ink)] transition-transform hover:-translate-y-1" data-testid="link-hero-enquire">
                Start with a feeling <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a href="#destinations" className="inline-flex items-center gap-2 px-2 py-3 text-xs font-bold uppercase tracking-[.12em] text-[rgba(247,243,233,.72)] hover:text-[var(--saffron)]" data-testid="link-hero-explore">
                Explore routes <ArrowDown size={15} />
              </a>
            </div>
            <div className="reveal reveal-delay-5 mt-14 flex items-center gap-7 text-[11px] text-[rgba(247,243,233,.55)]">
              <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-[var(--saffron)]" /> Local-first planning</span>
              <span className="hidden h-4 w-px bg-[rgba(247,243,233,.22)] sm:block" />
              <span className="flex items-center gap-2"><Phone size={14} className="text-[var(--saffron)]" /> 88807 34777</span>
            </div>
          </div>

          <div className="relative mx-auto h-[430px] w-full max-w-[560px] md:h-[555px]">
            <div
              className="hero-live-wallpaper"
              onPointerMove={moveWallpaper}
              onPointerLeave={resetWallpaper}
              onPointerDown={moveWallpaper}
              aria-label="Touch or move across the travel scenes to explore"
            >
              <div className="wallpaper-halo wallpaper-halo-one" />
              <div className="wallpaper-halo wallpaper-halo-two" />
              <div className="wallpaper-photo wallpaper-photo-back"><img src={photo02} alt="Misty green hills in Meghalaya" /></div>
              <div className="wallpaper-photo wallpaper-photo-middle"><img src={photo04} alt="Jaisalmer fort in the Rajasthan desert" /></div>
              <div className="wallpaper-photo wallpaper-photo-front"><img src={photo01} alt="A snow-covered mountain town in Himachal" /></div>
              <div className="wallpaper-vignette" />
              <div className="wallpaper-caption">
                <p className="mono-font text-[9px] uppercase tracking-[.18em] text-[var(--saffron)]">Live field note / touch to explore</p>
                <p className="display-font mt-2 text-3xl italic text-[var(--white-ink)] md:text-4xl">Let the place move you.</p>
              </div>
              <div className="wallpaper-touch-hint"><Sparkles size={14} /> Move through India</div>
              <div className="wallpaper-metric">
                <span className="mono-font text-[9px] uppercase tracking-[.15em] text-[rgba(247,243,233,.65)]">A good route</span>
                <div className="mt-5 flex items-end justify-between">
                  <div><p className="text-2xl font-bold text-[var(--white-ink)]">∞</p><p className="mt-1 text-[10px] text-[rgba(247,243,233,.6)]">ways to feel India</p></div>
                  <Route size={27} strokeWidth={1.2} className="text-[var(--saffron)]" />
                </div>
              </div>
              <div className="wallpaper-since">Since<br />2011</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-[rgba(247,243,233,.16)]">
          <div className="mx-auto grid w-[min(1180px,calc(100%-32px))] grid-cols-2 md:w-[min(1180px,calc(100%-48px))] md:grid-cols-4">
            {[
              ['13+', 'years of local knowing'],
              ['24', 'states, slowly explored'],
              ['4.9/5', 'traveller love score'],
              ['01', 'conversation to begin'],
            ].map(([value, label]) => (
              <div key={value} className="border-r border-[rgba(247,243,233,.16)] px-3 py-4 first:pl-0 last:border-0 md:px-6 md:py-5">
                <p className="text-lg font-bold text-[var(--saffron)]">{value}</p>
                <p className="mt-1 text-[9px] uppercase tracking-[.12em] text-[rgba(247,243,233,.48)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="journeys" className="section-space bg-[var(--paper)]">
        <div className="section-wrap grid gap-14 md:grid-cols-[.75fr_1.25fr] md:gap-20">
          <div className="md:pt-8">
            <p className="eyebrow">The Charvika difference</p>
            <p className="display-font mt-7 max-w-[280px] text-4xl leading-[1.04] tracking-[-.04em] text-[var(--ink)] md:text-5xl">Not a package.<br /><em className="text-[var(--copper)]">A point of view.</em></p>
            <div className="counter-line mt-14 text-sm leading-7 text-[var(--muted-foreground)]">
              We believe the best India trips are a little bit planned and a little bit serendipitous. Our job is to make space for both.
            </div>
          </div>
          <div>
            <p className="max-w-[700px] text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[1.05] tracking-[-.055em] text-[var(--ink)]">The details are the destination.</p>
            <p className="mt-8 max-w-[610px] text-[15px] leading-8 text-[var(--muted-foreground)]">A temple opening before sunrise. The chai stop your driver knows to make. A hotel with a story worth hearing. We find the texture in between the landmarks, then make the whole journey feel effortless.</p>
            <div className="mt-12 grid gap-7 border-t border-[var(--border)] pt-8 sm:grid-cols-3">
              <div><Globe2 size={20} className="text-[var(--copper)]" /><p className="mt-5 text-sm font-bold">Local intelligence</p><p className="mt-2 text-xs leading-5 text-[var(--muted-foreground)]">The right people, not just the right places.</p></div>
              <div><Sparkles size={20} className="text-[var(--copper)]" /><p className="mt-5 text-sm font-bold">Room for wonder</p><p className="mt-2 text-xs leading-5 text-[var(--muted-foreground)]">A route with breathing room and a few beautiful surprises.</p></div>
              <div><Luggage size={20} className="text-[var(--copper)]" /><p className="mt-5 text-sm font-bold">Considered ease</p><p className="mt-2 text-xs leading-5 text-[var(--muted-foreground)]">Every moving part held, before you even ask.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="destinations" className="section-space bg-[#e5ded0]">
        <div className="section-wrap">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Routes worth taking</p>
              <h2 className="display-font mt-4 max-w-[620px] text-5xl leading-[.98] tracking-[-.05em] text-[var(--ink)] md:text-7xl">Start anywhere.<br /><em className="text-[var(--copper)]">Feel everywhere.</em></h2>
            </div>
             <p className="max-w-[270px] text-sm leading-6 text-[var(--muted-foreground)]">Four ways into India. One will probably sound like you.</p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
            <div className="spotlight-card depth-card relative min-h-[510px] overflow-hidden rounded-[28px] bg-[var(--teal)] p-7 text-[var(--white-ink)] md:p-10">
              <div className="image-fallback absolute inset-0" style={{ background: `linear-gradient(145deg, ${active.palette} 0%, #1f2630 100%)` }}>
                <RemoteImage src={active.image} alt={`${active.name} destination`} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,27,34,.9)] via-[rgba(20,27,34,.12)] to-[rgba(20,27,34,.2)]" />
              <div className="relative z-10 flex h-full min-h-[450px] flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="rounded-full border border-[rgba(247,243,233,.38)] px-3 py-2 mono-font text-[9px] uppercase tracking-[.15em]">Selected route</span>
                  <a href="#contact" className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--saffron)] text-[var(--ink)] transition-transform hover:-rotate-12" aria-label={`Enquire about ${active.name}`} data-testid={`link-enquire-${active.id}`}><ArrowUpRight size={17} /></a>
                </div>
                <div>
                  <p className="mono-font text-[10px] uppercase tracking-[.18em] text-[var(--saffron)]">{active.place}</p>
                  <h3 className="display-font mt-3 text-5xl italic leading-none md:text-6xl">{active.name}</h3>
                  <p className="mt-5 max-w-[430px] text-sm leading-6 text-[rgba(247,243,233,.74)]">{active.detail}</p>
                  <div className="mt-7 flex flex-wrap gap-3 text-[10px] uppercase tracking-[.12em] text-[rgba(247,243,233,.65)]">
                    <span className="rounded-full bg-[rgba(247,243,233,.13)] px-3 py-2">{active.fact}</span>
                    <span className="rounded-full bg-[rgba(247,243,233,.13)] px-3 py-2">{active.days}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {destinations.filter((destination) => destination.id !== active.id).map((destination, index) => (
                <button
                  key={destination.id}
                  className="group relative min-h-[245px] overflow-hidden rounded-[24px] bg-[var(--ink)] p-6 text-left text-[var(--white-ink)] transition-transform hover:-translate-y-1 md:p-8"
                  onClick={() => setActiveDestination(destination.id)}
                  data-testid={`button-destination-${destination.id}`}
                >
                  <div className="image-fallback absolute inset-0 opacity-80" style={{ background: destination.palette }}>
                    <RemoteImage src={destination.image} alt="" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,27,34,.92)] to-[rgba(20,27,34,.08)]" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex justify-between">
                   <span className="mono-font text-[9px] uppercase tracking-[.17em] text-[rgba(247,243,233,.65)]">0{index + 2}  /  route</span>
                      <ChevronRight size={18} className="text-[var(--saffron)] transition-transform group-hover:translate-x-1" />
                    </div>
                    <div><p className="text-[10px] uppercase tracking-[.13em] text-[var(--saffron)]">{destination.place}</p><h3 className="display-font mt-2 text-3xl italic">{destination.name}</h3></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-7 flex items-center justify-between border-t border-[rgba(31,38,48,.18)] pt-5">
            <p className="mono-font text-[10px] uppercase tracking-[.15em] text-[var(--muted-foreground)]">Or tell us somewhere else</p>
            <a href="#contact" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-[var(--ink)]" data-testid="link-custom-destination">Build a custom route <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></a>
          </div>
        </div>
      </section>

      <section id="moments" className="relative overflow-hidden bg-[var(--ink)] py-24 text-[var(--white-ink)] md:py-32">
        <div className="pointer-events-none absolute -right-24 top-8 h-80 w-80 rounded-full border border-[rgba(239,184,102,.2)]" />
        <div className="pointer-events-none absolute right-8 top-28 h-52 w-52 rounded-full border border-dashed border-[rgba(239,184,102,.16)]" />
        <div className="section-wrap relative">
          <div className="grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-end">
            <div>
              <p className="mono-font text-[10px] uppercase tracking-[.2em] text-[var(--saffron)]">A little visual proof</p>
              <h2 className="display-font mt-5 max-w-[580px] text-5xl leading-[.94] tracking-[-.05em] md:text-7xl">Bring home the <em className="text-[var(--saffron)]">feeling.</em></h2>
            </div>
            <p className="max-w-[410px] text-sm leading-7 text-[rgba(247,243,233,.62)]">A few places from our India — shared by travellers who wanted more than a checklist, and found a story instead.</p>
          </div>
          <div className="photo-gallery mt-14">
            {galleryPhotos.map((photo, index) => (
              <figure key={photo.image} className="gallery-item group">
                <img src={photo.image} alt={photo.label} loading={index < 4 ? 'eager' : 'lazy'} />
                <figcaption>{photo.label}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-4 border-t border-[rgba(247,243,233,.16)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="mono-font text-[9px] uppercase tracking-[.18em] text-[rgba(247,243,233,.42)]">Your next view could be here</span>
            <a href="#contact" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-[var(--saffron)]" data-testid="link-gallery-enquire">Plan the feeling <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--paper)]">
        <div className="section-wrap">
          <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-24">
            <div>
              <p className="eyebrow">The way we work</p>
              <h2 className="display-font mt-5 text-5xl leading-[.98] tracking-[-.05em] text-[var(--ink)]">One good<br /><em className="text-[var(--copper)]">conversation.</em></h2>
            </div>
            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {[
                ['01', 'Listen for the real brief', 'Not just dates and cities. We want to know the energy you are chasing, and who you want to become on the way back.'],
                ['02', 'Shape the right rhythm', 'We balance icons with in-between moments, full days with slow mornings, and certainty with a little room to wander.'],
                ['03', 'Make it beautifully easy', 'You get a clear plan, a real person on call, and all the tiny pieces handled with calm, capable care.'],
              ].map(([number, title, body]) => (
                <div key={number} className="grid gap-5 py-7 sm:grid-cols-[52px_1fr] sm:gap-8">
                  <span className="mono-font text-xs text-[var(--copper)]">{number}</span>
                  <div><h3 className="text-lg font-bold tracking-[-.02em]">{title}</h3><p className="mt-3 max-w-[510px] text-sm leading-7 text-[var(--muted-foreground)]">{body}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--ink)] py-24 text-[var(--white-ink)] md:py-32">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full border border-[rgba(239,184,102,.22)]" />
        <div className="pointer-events-none absolute -left-10 top-20 h-52 w-52 rounded-full border border-dashed border-[rgba(239,184,102,.22)]" />
        <div className="section-wrap relative grid items-center gap-12 md:grid-cols-[1fr_.8fr] md:gap-24">
          <div>
            <Quote size={34} strokeWidth={1.1} className="text-[var(--saffron)]" />
            <blockquote className="display-font mt-7 max-w-[700px] text-[clamp(2.2rem,5vw,4.7rem)] leading-[1.03] tracking-[-.04em]">
              “We arrived as a family. We came home with a new shared language.”
            </blockquote>
            <div className="mt-9 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--copper)] font-bold">AK</div>
              <div><p className="text-sm font-bold">Ananya &amp; Karan</p><p className="mt-1 text-xs text-[rgba(247,243,233,.54)]">14 days · Rajasthan &amp; Kerala</p></div>
            </div>
          </div>
          <div className="border-l border-[rgba(247,243,233,.18)] pl-7 md:pl-12">
            <div className="flex gap-1 text-[var(--saffron)]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} fill="currentColor" />)}</div>
            <p className="mt-5 text-3xl font-bold">4.9<span className="text-base font-normal text-[rgba(247,243,233,.48)]"> / 5</span></p>
            <p className="mt-4 max-w-[260px] text-sm leading-6 text-[rgba(247,243,233,.57)]">Loved by curious travellers who like their itineraries considered, not crowded.</p>
            <a href="#contact" className="mt-9 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-[var(--saffron)]" data-testid="link-testimonial-enquire">Make your own story <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--paper)]">
        <div className="section-wrap grid gap-12 md:grid-cols-[.72fr_1.28fr] md:gap-24">
          <div>
            <p className="eyebrow">Good to know</p>
            <h2 className="display-font mt-5 text-5xl leading-[.98] tracking-[-.05em] text-[var(--ink)]">The small<br /><em className="text-[var(--copper)]">questions.</em></h2>
            <p className="mt-8 max-w-[280px] text-sm leading-6 text-[var(--muted-foreground)]">If your question is not here, our answer is one message away.</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-3 rounded-full border border-[var(--border)] px-4 py-3 text-xs font-bold text-[var(--ink)] transition-colors hover:border-[var(--copper)] hover:text-[var(--copper)]" data-testid="link-faq-whatsapp"><MessageCircle size={16} /> Ask on WhatsApp</a>
          </div>
          <div className="border-t border-[var(--border)]">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="border-b border-[var(--border)]">
                  <button className="flex w-full items-center justify-between gap-5 py-6 text-left" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen} data-testid={`button-faq-${index}`}>
                    <span className="text-base font-bold tracking-[-.02em]">{faq.question}</span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--copper)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><ChevronDown size={16} /></span>
                  </button>
                  <div className={`faq-answer ${isOpen ? 'open' : ''}`}><div><p className="max-w-[600px] pb-6 pr-8 text-sm leading-7 text-[var(--muted-foreground)]">{faq.answer}</p></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-[var(--copper)] py-24 text-[var(--white-ink)] md:py-32">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[550px] w-[550px] rounded-full border border-[rgba(247,243,233,.2)]" />
        <div className="pointer-events-none absolute -right-14 -top-20 h-[310px] w-[310px] rounded-full border border-dashed border-[rgba(247,243,233,.23)]" />
        <div className="section-wrap relative grid gap-12 md:grid-cols-[1fr_1.05fr] md:gap-24">
          <div>
            <p className="mono-font text-[10px] uppercase tracking-[.2em] text-[rgba(247,243,233,.65)]">Your next chapter</p>
            <h2 className="display-font mt-6 max-w-[540px] text-[clamp(3.5rem,7vw,6.8rem)] leading-[.88] tracking-[-.06em]">Tell us what<br /><em>you want to feel.</em></h2>
            <p className="mt-8 max-w-[370px] text-sm leading-7 text-[rgba(247,243,233,.74)]">Share a little or a lot. A Charvika trip begins with a warm, no-pressure conversation.</p>
            <div className="mt-12 space-y-4 text-sm">
              <a href="tel:+918880734777" className="flex items-center gap-3 text-[var(--white-ink)] hover:underline" data-testid="link-contact-phone"><Phone size={17} /> +91 88807 34777</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[var(--white-ink)] hover:underline" data-testid="link-contact-whatsapp"><MessageCircle size={17} /> WhatsApp us anytime</a>
              <p className="flex items-center gap-3 text-[rgba(247,243,233,.68)]"><Clock3 size={17} /> Usually replies within an hour</p>
            </div>
          </div>

          <div className="rounded-[26px] bg-[var(--paper)] p-6 text-[var(--ink)] shadow-[0_28px_60px_rgba(98,33,21,.2)] md:p-9">
            {submitted ? (
              <div className="flex min-h-[390px] flex-col justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--teal)] text-[var(--white-ink)]"><Check size={22} /></div>
                <h3 className="display-font mt-7 text-4xl leading-none">Your trip is<br /><em className="text-[var(--copper)]">already moving.</em></h3>
                <p className="mt-5 max-w-[340px] text-sm leading-6 text-[var(--muted-foreground)]">Thank you. Our trip designer will reach out shortly. If you are in a hurry, WhatsApp us directly and say “hello”.</p>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[var(--ink)] px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-[var(--white-ink)]" data-testid="link-success-whatsapp"><MessageCircle size={16} /> Open WhatsApp</a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between"><p className="eyebrow">Start here</p><span className="mono-font text-[9px] uppercase tracking-[.15em] text-[var(--muted-foreground)]">01 — 03</span></div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.13em] text-[var(--muted-foreground)]">Your name</span><input required name="name" placeholder="Aarav Mehta" className="w-full border-b border-[var(--border)] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[rgba(31,38,48,.38)] focus:border-[var(--copper)]" data-testid="input-name" /></label>
                  <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.13em] text-[var(--muted-foreground)]">Email or phone</span><input required name="contact" placeholder="you@email.com" className="w-full border-b border-[var(--border)] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[rgba(31,38,48,.38)] focus:border-[var(--copper)]" data-testid="input-contact" /></label>
                </div>
                 <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.13em] text-[var(--muted-foreground)]">I am dreaming of</span><select name="destination" value={destinationChoice} onChange={(event) => setDestinationChoice(event.target.value)} required className="w-full border-b border-[var(--border)] bg-transparent px-0 py-3 text-sm outline-none focus:border-[var(--copper)]" data-testid="select-destination"><option value="" disabled>Select a route</option><option>Kerala, unhurried</option><option>Rajasthan, in gold</option><option>Meghalaya, alive</option><option>Himachal, snowbound</option><option value="custom">Your choice — tell us where</option></select></label>
                 {destinationChoice === 'custom' && <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.13em] text-[var(--muted-foreground)]">Your place</span><input required name="custom-destination" placeholder="A place you have been dreaming about" className="w-full border-b border-[var(--border)] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[rgba(31,38,48,.38)] focus:border-[var(--copper)]" data-testid="input-custom-destination" /></label>}
                <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.13em] text-[var(--muted-foreground)]">Tell us a little more <span className="font-normal normal-case tracking-normal">(optional)</span></span><textarea name="message" rows={3} placeholder="A rough date, who is coming, the feeling you want..." className="w-full resize-none border-b border-[var(--border)] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[rgba(31,38,48,.38)] focus:border-[var(--copper)]" data-testid="textarea-message" /></label>
                <div className="flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-[11px] leading-5 text-[var(--muted-foreground)]">No sales pitch. Just a considered first conversation.</p><button type="submit" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--ink)] px-6 py-3.5 text-xs font-bold uppercase tracking-[.12em] text-[var(--white-ink)] transition-transform hover:-translate-y-1" data-testid="button-submit-enquiry">Send enquiry <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button></div>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[var(--ink)] pb-8 pt-16 text-[var(--white-ink)]">
        <div className="section-wrap">
          <div className="grid gap-10 border-b border-[rgba(247,243,233,.16)] pb-12 md:grid-cols-[1.2fr_.8fr_.8fr]">
            <div><a href="#home" className="inline-flex items-center gap-3" data-testid="link-footer-home"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--saffron)] text-sm font-bold text-[var(--saffron)]">C</span><span className="text-[11px] font-extrabold tracking-[.18em]">CHARVIKA<br /><span className="font-medium text-[rgba(247,243,233,.5)]">TOURS &amp; TRAVELS</span></span></a><p className="mt-7 max-w-[290px] text-sm leading-6 text-[rgba(247,243,233,.55)]">The India you came to feel. Beautifully planned, deeply personal.</p></div>
             <div><p className="mono-font text-[9px] uppercase tracking-[.18em] text-[var(--saffron)]">Explore</p><div className="mt-5 flex flex-col gap-3 text-sm text-[rgba(247,243,233,.7)]"><a href="#journeys" className="hover:text-[var(--saffron)]" data-testid="link-footer-way">Our way</a><a href="#destinations" className="hover:text-[var(--saffron)]" data-testid="link-footer-destinations">Destinations</a><a href="#moments" className="hover:text-[var(--saffron)]" data-testid="link-footer-moments">Moments</a><a href="#contact" className="hover:text-[var(--saffron)]" data-testid="link-footer-contact">Plan your journey</a></div></div>
            <div><p className="mono-font text-[9px] uppercase tracking-[.18em] text-[var(--saffron)]">Talk to us</p><div className="mt-5 flex flex-col gap-3 text-sm text-[rgba(247,243,233,.7)]"><a href="tel:+918880734777" className="hover:text-[var(--saffron)]" data-testid="link-footer-phone">+91 88807 34777</a><a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--saffron)]" data-testid="link-footer-whatsapp">WhatsApp concierge</a><span>Bengaluru · India</span></div></div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-6 text-[10px] uppercase tracking-[.13em] text-[rgba(247,243,233,.38)] sm:flex-row"><span>© 2024 Charvika Tours and Travels</span><span>Journeys made personal</span></div>
        </div>
      </footer>

      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[var(--teal)] px-4 py-3 text-xs font-bold text-[var(--white-ink)] shadow-[0_12px_30px_rgba(31,38,48,.24)] transition-transform hover:-translate-y-1" data-testid="link-floating-whatsapp"><MessageCircle size={18} /> <span className="hidden sm:inline">Chat with a trip designer</span><span className="sm:hidden">WhatsApp</span></a>
      <a href="#home" className="fixed bottom-5 left-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(31,38,48,.18)] bg-[rgba(243,239,228,.84)] text-[var(--ink)] shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1" aria-label="Back to top" data-testid="link-back-to-top"><ChevronLeft size={17} className="rotate-90" /></a>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <WouterRoute path="/" component={Home} />
        <WouterRoute component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;