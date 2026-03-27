import { motion } from 'framer-motion'

const HERO_BG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl6Xq-Haq8zHqKbEtkBdfCGPcx5rVOnDx8MCtlAG4vak1TgE1xvJpOei5LEOubNvKLX5gzu3Q-hys9edqnsMFmrujwhbDJ-BZQYNoYbSpYahkmaxtnzxovf7RNsd_SNoPNsD7CjTHc88rM4sBGsMkkhCkc6svaEIDglvGSlFkcBcC5-QEMvdrNL8ARShCVRD2qRuG05OulO0YUwtgZW8Dnon-psKDWU-OjV4mPMZaGv0G8Hf6ZrF-0gQkwYimGHFdpgIK1ZaS-k95A'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ paddingTop: '100px' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(19,19,19,0.3) 0%, transparent 40%, rgba(19,19,19,0.8) 80%, #131313 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(19,19,19,0.5) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 flex-1 flex flex-col justify-between py-12">
        {/* Main headline */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-6"
        >
          <motion.div variants={item}>
            <span
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 px-4 py-2 rounded-full"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                color: 'rgba(255,255,255,0.7)',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <span className="material-symbols-outlined text-sm icon-filled" style={{ color: 'rgba(255,255,255,0.6)' }}>
                bolt
              </span>
              Deutsche Ingenieurskunst · Seit 2018
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="leading-none text-white"
            style={{
              fontSize: 'clamp(3rem, 9vw, 7.5rem)',
              lineHeight: 0.9,
            }}
          >
            {/* "Deine Solarlösung —" – same line */}
            <span className="block" style={{ paddingBottom: '0.12em', overflow: 'visible' }}>
              <span
                style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, letterSpacing: '-0.04em', color: 'white' }}
              >
                Deine{' '}
              </span>
              <span
                style={{
                  fontFamily: 'Instrument Serif, Arial, sans-serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(to bottom, #fef2c0 0%, #eda020 52%, #c06010 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Solarlösung
              </span>
              <span
                style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, letterSpacing: '-0.04em', color: 'white' }}
              >
                {' —'}
              </span>
            </span>
            {/* "Alles aus" – DM Sans bold */}
            <span
              className="block"
              style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, letterSpacing: '-0.05em' }}
            >
              Alles aus
            </span>
            {/* "einer Hand." – Cormorant italic + gradient */}
            <span
              className="block"
              style={{
                fontFamily: 'Instrument Serif, Arial, sans-serif',
                fontStyle: 'italic',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(to bottom, #fef2c0 0%, #eda020 52%, #c06010 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              einer Hand.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-md text-lg leading-relaxed"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              color: 'rgba(209,197,176,0.85)',
              lineHeight: 1.65,
            }}
          >
            Wir vereinen deutsche Ingenieurskunst mit der Kraft der Sonne.{' '}
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>Effizient, ästhetisch</span> und für Generationen gebaut.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4 items-center">
            <motion.button
              className="cta-pill flex items-center gap-3 rounded-full px-8 py-4 font-black text-sm uppercase tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #f5b040, #e07018)',
                color: '#2a1600',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '0.12em',
                fontSize: '12px',
              }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="material-symbols-outlined icon-filled text-lg">
                wb_sunny
              </span>
              Kostenlos beraten lassen
            </motion.button>

            <motion.a
              href="#loesungen"
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.15em',
                fontSize: '11px',
              }}
              whileHover={{ color: '#f5b040', x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Unsere Produkte
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </motion.a>
          </motion.div>

          {/* Quick stats row */}
          <motion.div
            variants={item}
            className="mt-16 flex flex-wrap gap-8"
          >
            {[
              { value: '1.000+', label: 'Kunden', icon: 'groups' },
              { value: '98,1%', label: 'Wirkungsgrad', icon: 'bolt' },
              { value: '25 J.', label: 'Garantie', icon: 'verified' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    {stat.icon}
                  </span>
                </div>
                <div>
                  <div
                    className="font-black text-white text-lg leading-none"
                    style={{ fontFamily: 'DM Mono, monospace', letterSpacing: '-0.02em' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-widest mt-0.5"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.4)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12 self-start flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span
            className="text-[9px] uppercase tracking-[0.4em] font-bold"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.3)' }}
          >
            Scroll
          </span>
          <motion.div
            className="w-px h-12 origin-top"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.5 }}
          />
        </motion.div>
      </div>
    </section>
  )
}
