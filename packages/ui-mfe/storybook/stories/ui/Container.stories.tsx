import { Container } from '@ank-cora/ui-mfe'
import { fullscreenParameters } from '../../parameters'

export default {
  title: 'UI/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: fullscreenParameters,
  argTypes: {
    size: { control: 'select', options: ['default', 'narrow', 'wide'] },
  },
}

export const Default = {
  args: { size: 'default' },
  render: (args) => (
    <Container {...args} className="bg-cora-sky py-8">
      <p className="text-center text-cora-navy">Content is constrained with horizontal padding.</p>
    </Container>
  ),
}

export const Narrow = {
  args: { size: 'narrow' },
  render: (args) => (
    <Container {...args} className="border border-dashed border-cora-blue py-8">
      <p className="text-center text-cora-gray">Narrow container</p>
    </Container>
  ),
}
