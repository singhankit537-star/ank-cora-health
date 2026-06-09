import { Select } from '@ank-cora/ui-mfe'

const radiusOptions = [
  { value: '10', label: '10 mi' },
  { value: '25', label: '25 mi' },
  { value: '50', label: '50 mi' },
]

export default {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  args: { label: 'Search radius', options: radiusOptions, value: '50' },
}

export const Default = {
  render: (args) => (
    <div className="w-64">
      <Select {...args} />
    </div>
  ),
}
