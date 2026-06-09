import { Input } from '@ank-cora/ui-mfe'

export default {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'ZIP or City', placeholder: 'Enter ZIP or city' },
}

export const Default = {
  render: (args) => (
    <div className="w-80">
      <Input {...args} />
    </div>
  ),
}
