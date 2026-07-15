import InterventionLayout, { ResCard } from './InterventionLayout'

const RESOURCES = [
  {
    title: 'ALU Debate Club',
    description: 'Structured discussions on real topics. A good substitute for the stimulation of social media — but with actual people in the room.',
    cost: 'Free',
    access: 'Via ALU student WhatsApp groups',
  },
  {
    title: 'Between The Covers Book Club',
    description: 'A book club run by and for university students in Kigali. Social, offline, and a great way to meet people outside your degree.',
    cost: 'Free',
    access: 'Instagram: @betweenthecovers5',
  },
  {
    title: 'Letterboxd',
    description: 'Watch films with intention instead of just scrolling. Log what you watch, write reviews, and follow friends — a social network built around something that ends.',
    cost: 'Free',
    access: 'letterboxd.com',
  },
  {
    title: 'Kigali workshops and classes',
    description: 'Pottery, art, craft — activities where you are in a room with other people doing something together. Often the best conversations happen here.',
    cost: 'Low cost',
    access: 'tripadvisor.com/Attractions-g293829-Activities-c56-Kigali',
  },
]

export default function SocialPage() {
  return (
    <InterventionLayout
      icon="👥"
      title="Connect in real life"
      why="A lot of what keeps us on social media is the need to feel connected. The problem is that online connection rarely satisfies that need the way real interaction does. These are real people, real places, and real conversations happening in Kigali right now."
      alboTip="Found an event or place you want to visit? Save it in Albo (albo.inc) — it even pins saved locations on a map so you don't lose track of them."
    >
      <div style={grid}>
        {RESOURCES.map((r, i) => <ResCard key={i} {...r} />)}
      </div>
    </InterventionLayout>
  )
}

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: '12px',
}
