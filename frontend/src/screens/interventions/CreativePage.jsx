import InterventionLayout, { ResCard } from './InterventionLayout'

const RESOURCES = [
  {
    title: 'Pottery workshop — Kigali',
    description: 'Hands-on pottery classes available in Kigali. Tactile, social, and completely screen-free.',
    cost: 'Low cost',
    access: "Search 'pottery' on tripadvisor.com/Attractions-g293829-Activities-c56-Kigali",
  },
  {
    title: 'Painting class — Kigali',
    description: 'Drop-in painting sessions for all skill levels. No experience needed.',
    cost: 'Low cost',
    access: "Search 'painting' on tripadvisor.com/Attractions-g293829-Activities-c56-Kigali",
  },
  {
    title: 'Weaving and soap making — Kigali',
    description: 'Traditional craft workshops — social, affordable, and a great way to meet people outside your usual circle.',
    cost: 'Low cost',
    access: "Search 'workshops' on tripadvisor.com/Attractions-g293829-Activities-c56-Kigali",
  },
  {
    title: 'Kira Art Therapy Hub',
    description: 'Art-based sessions with trained therapists. Helpful if stress or anxiety is part of what\'s driving your phone use.',
    cost: 'Varies',
    access: 'kiraapp.org — +250 785 774 717',
  },
]

export default function CreativePage() {
  return (
    <InterventionLayout
      icon="🎨"
      title="Make something"
      why="Creative activities work on smartphone overuse in a specific way — they occupy your hands. When your hands are busy making something real, the habit of reaching for your phone has nowhere to go. You also end up with something you built, which no amount of scrolling can give you."
      alboTip="Spotted a workshop you want to try? Save it in Albo (albo.inc) before you forget — it organises your saved links and videos into a plan you can act on."
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
