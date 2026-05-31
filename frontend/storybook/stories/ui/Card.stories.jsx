import Card from '@/components/ui/Card'

export default {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: { hover: { control: 'boolean' } },
}

export const Default = {
  render: (args) => (
    <Card {...args} className="max-w-sm p-6">
      <h3 className="text-lg font-bold text-cora-navy">Card title</h3>
      <p className="mt-2 text-sm text-cora-gray">Basic card wrapper with shadow.</p>
    </Card>
  ),
}

export const WithHover = {
  args: { hover: true },
  render: (args) => (
    <Card {...args} className="max-w-sm cursor-pointer p-6">
      <p className="text-cora-navy">Hover to elevate shadow</p>
    </Card>
  ),
}
