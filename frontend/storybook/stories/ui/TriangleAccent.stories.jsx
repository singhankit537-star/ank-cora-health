import TriangleAccent from '@/components/ui/TriangleAccent'
import { fullscreenParameters } from '../../parameters'

export default {
  title: 'UI/TriangleAccent',
  component: TriangleAccent,
  tags: ['autodocs'],
  parameters: fullscreenParameters,
  argTypes: { flip: { control: 'boolean' } },
}

export const Default = {
  render: (args) => (
    <div className="w-full">
      <div className="h-24 bg-white" />
      <TriangleAccent {...args} />
      <div className="h-24 bg-cora-sky" />
    </div>
  ),
}
