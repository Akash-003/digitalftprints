/** Fixed, animated aurora behind all content. Pure CSS motion. */
export default function GradientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* drifting colour blobs */}
      <div className="animate-drift absolute -top-40 -left-32 h-[42rem] w-[42rem] rounded-full bg-violet/30 blur-[120px]" />
      <div
        className="animate-drift absolute top-1/3 -right-40 h-[38rem] w-[38rem] rounded-full bg-fuchsia/25 blur-[120px]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="animate-drift absolute -bottom-48 left-1/4 h-[40rem] w-[40rem] rounded-full bg-cyan/20 blur-[130px]"
        style={{ animationDelay: '-12s' }}
      />
      {/* subtle grid + top vignette */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/0 via-ink/40 to-ink" />
    </div>
  )
}
