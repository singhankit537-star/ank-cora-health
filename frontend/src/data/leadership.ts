// Leadership team members shown on the Leadership page.
// Add / remove / reorder entries here — the grid updates automatically.

const portrait = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`

export const leadership = [
  {
    name: 'Dr. Amara Okafor, DPT',
    title: 'Chief Executive Officer',
    image: portrait('1573496359142-b8d87734a5a2'),
  },
  {
    name: 'Daniel Whitaker',
    title: 'President, Finance & Chief Financial Officer',
    image: portrait('1560250097-0b93528c311a'),
  },
  {
    name: 'Marcus Delgado',
    title: 'Executive Vice President, Chief Operating Officer',
    image: portrait('1472099645785-5658abf4ff4e'),
  },
  {
    name: 'Priya Nair, PT',
    title: 'Executive Vice President, Chief Compliance & Clinical Officer',
    image: portrait('1580489944761-15a19d654956'),
  },
  {
    name: 'Robert Hammond',
    title: 'Executive Vice President, Sales & Marketing',
    image: portrait('1519085360753-af0119f7cbe7'),
  },
  {
    name: 'Sofia Bianchi, OT',
    title: 'Chief People Officer',
    image: portrait('1438761681033-6461ffad8d80'),
  },
]
