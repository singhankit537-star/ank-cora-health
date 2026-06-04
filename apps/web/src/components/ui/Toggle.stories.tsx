import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Toggle from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toggle>

function ControlledToggle({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked)
  return <Toggle checked={checked} onChange={setChecked} label={label} />
}

export const Off: Story = {
  render: () => <ControlledToggle label="Have you seen a doctor?" defaultChecked={false} />,
}

export const On: Story = {
  render: () => <ControlledToggle label="Have you seen a doctor?" defaultChecked={true} />,
}
