import InterventionLayout, { ResCard } from './InterventionLayout'

const RESOURCES = [
  {
    title: 'Scrimba',
    description: 'Learn to code interactively. Free courses in web development, Python, and more — built for beginners.',
    cost: 'Free / paid',
    access: 'scrimba.com',
  },
  {
    title: 'Udemy',
    description: 'Thousands of courses on any topic — coding, design, business, languages. Many are free or under $15.',
    cost: 'Free / paid',
    access: 'udemy.com',
  },
  {
    title: 'Kigali Public Library',
    description: 'Government-funded public library open to all Kigali residents. Hosts workshops, study spaces, and learning programs. 40,000+ books and digital resources available.',
    cost: 'Low cost (10,000 RWF/year membership)',
    access: 'kplonline.org — +250 788 500 777',
  },
]

export default function EducationPage() {
  return (
    <InterventionLayout
      icon="📚"
      title="Learn something new"
      why="When you replace scrolling with learning, your brain still gets the reward it's looking for — but this time it compounds. Every hour you spend building a skill is an hour that moves you forward, not in circles."
      alboTip="Found a course or book you want to try? Save the link in Albo (albo.inc) so you don't forget it — free to start."
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
