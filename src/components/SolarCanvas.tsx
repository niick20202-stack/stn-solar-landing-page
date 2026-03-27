import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  alphaSpeed: number
  color: string
  life: number
  maxLife: number
}

interface OrbitalDot {
  angle: number
  radius: number
  speed: number
  size: number
  color: string
  trailLength: number
  trail: { x: number; y: number }[]
}

export default function SolarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctxRaw = canvas.getContext('2d')
    if (!ctxRaw) return
    const ctx: CanvasRenderingContext2D = ctxRaw

    let animId: number
    let W = 0, H = 0

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const CX = () => W * 0.72
    const CY = () => H * 0.42

    // Particles
    const particles: Particle[] = []
    const COLORS = ['#ffdf93', '#ebc153', '#e9c176', '#fff8e0', '#ffd166']

    function spawnParticle() {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.3 + Math.random() * 1.2
      particles.push({
        x: CX() + (Math.random() - 0.5) * 20,
        y: CY() + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 2.5,
        alpha: 0.8 + Math.random() * 0.2,
        alphaSpeed: 0.003 + Math.random() * 0.008,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife: 120 + Math.random() * 200,
      })
    }

    // Orbital dots
    const orbitals: OrbitalDot[] = [
      { angle: 0,          radius: 100, speed: 0.007,  size: 4, color: '#ffdf93', trailLength: 18, trail: [] },
      { angle: Math.PI,    radius: 150, speed: 0.0045, size: 3, color: '#ebc153', trailLength: 12, trail: [] },
      { angle: Math.PI/3,  radius: 210, speed: 0.003,  size: 2.5, color: '#fff8e0', trailLength: 8, trail: [] },
      { angle: Math.PI*1.5,radius: 280, speed: 0.002,  size: 2, color: '#e9c176', trailLength: 6, trail: [] },
    ]

    // Sun rays
    const RAY_COUNT = 12

    let frame = 0

    function draw() {
      animId = requestAnimationFrame(draw)
      frame++

      ctx.clearRect(0, 0, W, H)

      const cx = CX(), cy = CY()

      // --- Sun core ---
      // Outer glow
      const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140)
      outerGlow.addColorStop(0, 'rgba(255,223,147,0.12)')
      outerGlow.addColorStop(0.5, 'rgba(235,193,83,0.05)')
      outerGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = outerGlow
      ctx.beginPath()
      ctx.arc(cx, cy, 140, 0, Math.PI * 2)
      ctx.fill()

      // Mid glow
      const midGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70)
      midGlow.addColorStop(0, 'rgba(255,245,200,0.35)')
      midGlow.addColorStop(0.4, 'rgba(255,223,147,0.2)')
      midGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = midGlow
      ctx.beginPath()
      ctx.arc(cx, cy, 70, 0, Math.PI * 2)
      ctx.fill()

      // Sun disk
      const sunGrad = ctx.createRadialGradient(cx - 10, cy - 10, 0, cx, cy, 38)
      sunGrad.addColorStop(0, '#fffde0')
      sunGrad.addColorStop(0.3, '#ffdf93')
      sunGrad.addColorStop(0.7, '#ebc153')
      sunGrad.addColorStop(1, '#c9942a')
      ctx.fillStyle = sunGrad
      ctx.beginPath()
      ctx.arc(cx, cy, 38, 0, Math.PI * 2)
      ctx.fill()

      // Corona shimmer
      const t = frame * 0.012
      for (let i = 0; i < RAY_COUNT; i++) {
        const rayAngle = (i / RAY_COUNT) * Math.PI * 2 + t
        const len = 18 + Math.sin(t * 2 + i * 0.7) * 8
        const x1 = cx + Math.cos(rayAngle) * 40
        const y1 = cy + Math.sin(rayAngle) * 40
        const x2 = cx + Math.cos(rayAngle) * (40 + len)
        const y2 = cy + Math.sin(rayAngle) * (40 + len)
        const rayGrad = ctx.createLinearGradient(x1, y1, x2, y2)
        rayGrad.addColorStop(0, 'rgba(255,223,147,0.6)')
        rayGrad.addColorStop(1, 'transparent')
        ctx.strokeStyle = rayGrad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      // --- Orbit rings ---
      const ringRadii = [100, 150, 210, 280]
      ringRadii.forEach((r) => {
        ctx.strokeStyle = `rgba(255,223,147,${0.06 + (280 - r) * 0.0003})`
        ctx.lineWidth = 0.5
        ctx.setLineDash([3, 8])
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])
      })

      // --- Orbital dots with trails ---
      orbitals.forEach((orb) => {
        orb.angle += orb.speed
        const ox = cx + Math.cos(orb.angle) * orb.radius
        const oy = cy + Math.sin(orb.angle) * orb.radius
        orb.trail.unshift({ x: ox, y: oy })
        if (orb.trail.length > orb.trailLength) orb.trail.pop()

        // Trail
        orb.trail.forEach((pt, i) => {
          const prog = 1 - i / orb.trailLength
          ctx.fillStyle = orb.color
          ctx.globalAlpha = prog * 0.4
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, orb.size * prog * 0.6, 0, Math.PI * 2)
          ctx.fill()
        })
        ctx.globalAlpha = 1

        // Dot glow
        const dg = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.size * 4)
        dg.addColorStop(0, orb.color)
        dg.addColorStop(1, 'transparent')
        ctx.fillStyle = dg
        ctx.beginPath()
        ctx.arc(ox, oy, orb.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Dot
        ctx.fillStyle = '#fff8e0'
        ctx.beginPath()
        ctx.arc(ox, oy, orb.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // --- Particles ---
      if (frame % 3 === 0 && particles.length < 80) spawnParticle()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy -= 0.002 // slight upward drift
        p.life++
        const lifeRatio = p.life / p.maxLife
        p.alpha = Math.max(0, (1 - lifeRatio) * 0.9)

        if (p.alpha <= 0 || p.life > p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        const pGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        pGlow.addColorStop(0, p.color)
        pGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = pGlow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // --- Scattered starfield dots ---
      // These are drawn once in a buffer and reused, but for simplicity we draw a few static ones
    }

    draw()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}
