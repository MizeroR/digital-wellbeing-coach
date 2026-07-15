import InterventionLayout, { ResCard } from './InterventionLayout'

const SUPPORT_RESOURCES = [
  {
    title: 'Kira Art Therapy Hub',
    description: 'Professional support combining therapy with creative expression. A good first step if your phone use is connected to stress or low mood.',
    cost: 'Varies',
    access: 'kiraapp.org — +250 785 774 717 — Kiraarttherapyhub@gmail.com',
  },
  {
    title: 'Rwanda Mental Health Help Line',
    description: "Free, confidential, available 24 hours a day, 7 days a week. You don't have to be in crisis to call.",
    cost: 'Free',
    access: 'Call 116',
  },
]

const SCREEN_TIME_RESOURCES = [
  {
    title: 'iPhone — Screen Time',
    description: 'Built into every iPhone. See exactly how long you spend on each app and set daily limits — no download needed.',
    cost: 'Free',
    steps: ['Open Settings', 'Tap Screen Time', 'Tap Turn On Screen Time'],
    link: 'https://support.apple.com/en-us/111928',
    linkLabel: 'iPhone guide →',
  },
  {
    title: 'Android — Digital Wellbeing',
    description: 'Pre-installed on most Android phones. Tracks your usage and lets you set timers for specific apps.',
    cost: 'Free',
    steps: ['Open Settings', 'Search Digital Wellbeing', 'Set timers for your most-used apps'],
    link: 'https://wellbeing.google/',
    linkLabel: 'Android guide →',
  },
]

export default function RelaxationPage() {
  return (
    <InterventionLayout
      icon="🧘"
      title="Rest and reset"
      why="A lot of phone overuse is not really about the phone — it's about restlessness, anxiety, or the need to feel stimulated. Building habits around real rest makes it easier to put the phone down because you're not just avoiding it, you're replacing it with something that actually recharges you."
      alboTip="Found something calming you want to revisit? Save it in Albo (albo.inc) so it's there when you need it."
    >
      {/* Support resources */}
      <div style={grid}>
        {SUPPORT_RESOURCES.map((r, i) => <ResCard key={i} {...r} />)}
      </div>

      {/* Screen time tools */}
      <p style={sectionLabel}>Track how much time you spend</p>
      <div style={grid}>
        {SCREEN_TIME_RESOURCES.map((r, i) => <ResCard key={i} {...r} />)}
      </div>
      <p style={note}>
        Knowing how much time you spend is the first step. You might be surprised.
      </p>
    </InterventionLayout>
  )
}

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: '12px',
  marginBottom: '24px',
}

const sectionLabel = {
  fontSize: '12px', fontWeight: '700', color: '#9ca3af',
  textTransform: 'uppercase', letterSpacing: '0.5px',
  margin: '8px 0 12px',
}

const note = {
  fontSize: '13px', color: '#6b7280',
  fontStyle: 'italic', margin: '8px 0 0',
}
