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
    title: 'OceanPDF',
    description: 'Download books for free in PDF or ePUB format. Works offline — no account needed.',
    cost: 'Free',
    access: 'oceanofpdf.com',
  },
  {
    title: 'ALU Claude Club',
    description: 'An on-campus group at ALU exploring technology and AI together. Meet people who are building things.',
    cost: 'Free',
    access: 'Via ALU student WhatsApp groups',
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
