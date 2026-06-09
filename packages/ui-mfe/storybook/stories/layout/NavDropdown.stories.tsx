import NavDropdown from '@/components/layout/NavDropdown'

export default {
  title: 'Layout/NavDropdown',
  component: NavDropdown,
  tags: ['autodocs'],
  args: {
    label: 'What We Treat',
    href: '#treat',
    items: ['Neck', 'Shoulder', 'Back', 'Knee', 'Hip'],
  },
}

export const Default = {
  render: (args) => (
    <nav className="rounded-lg border border-gray-100 bg-white shadow-sm">
      <ul className="flex">
        <NavDropdown {...args} />
      </ul>
      <p className="px-4 pb-3 text-xs text-cora-gray">Hover to open the dropdown.</p>
    </nav>
  ),
}
