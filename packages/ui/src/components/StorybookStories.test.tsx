import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'

import * as BadgeStories from './Badge/Badge.stories'
import * as ButtonStories from './Button/Button.stories'
import * as CardStories from './Card/Card.stories'
import * as CategoryCardStories from './CategoryCard/CategoryCard.stories'
import * as ClinicCardStories from './ClinicCard/ClinicCard.stories'
import * as DashboardCardStories from './DashboardCard/DashboardCard.stories'
import * as DashboardLayoutStories from './DashboardLayout/DashboardLayout.stories'
import * as IconInputStories from './IconInput/IconInput.stories'
import * as InputStories from './Input/Input.stories'
import * as LeaderCardStories from './LeaderCard/LeaderCard.stories'
import * as OrDividerStories from './OrDivider/OrDivider.stories'
import * as PageHeroStories from './PageHero/PageHero.stories'
import * as PortalCardStories from './PortalCard/PortalCard.stories'
import * as SectionHeadingStories from './SectionHeading/SectionHeading.stories'
import * as SelectStories from './Select/Select.stories'
import * as ServiceCardStories from './ServiceCard/ServiceCard.stories'
import * as ToggleStories from './Toggle/Toggle.stories'

const Badge = composeStories(BadgeStories)
const Button = composeStories(ButtonStories)
const Card = composeStories(CardStories)
const CategoryCard = composeStories(CategoryCardStories)
const ClinicCard = composeStories(ClinicCardStories)
const DashboardCard = composeStories(DashboardCardStories)
const DashboardLayout = composeStories(DashboardLayoutStories)
const IconInput = composeStories(IconInputStories)
const Input = composeStories(InputStories)
const LeaderCard = composeStories(LeaderCardStories)
const OrDivider = composeStories(OrDividerStories)
const PageHero = composeStories(PageHeroStories)
const PortalCard = composeStories(PortalCardStories)
const SectionHeading = composeStories(SectionHeadingStories)
const Select = composeStories(SelectStories)
const ServiceCard = composeStories(ServiceCardStories)
const Toggle = composeStories(ToggleStories)

describe('Shared UI Storybook stories', () => {
  it('renders Badge Patient story', () => {
    render(<Badge.Patient />)
    expect(screen.getByText(/patient/i)).toBeInTheDocument()
  })

  it('renders Button Primary story', () => {
    render(<Button.Primary />)
    expect(screen.getByRole('button', { name: /schedule an appointment/i })).toBeInTheDocument()
  })

  it('renders Card Default story', () => {
    render(<Card.Default />)
    expect(screen.getByText(/card content goes here/i)).toBeInTheDocument()
  })

  it('renders CategoryCard WithExpandToggle story', () => {
    render(<CategoryCard.WithExpandToggle />)
    expect(screen.getByText(/neck pain & injuries/i)).toBeInTheDocument()
  })

  it('renders ClinicCard SingleLineAddress story', () => {
    render(<ClinicCard.SingleLineAddress />)
    expect(screen.getAllByText(/jacksonville/i).length).toBeGreaterThan(0)
  })

  it('renders DashboardCard Appointments story', () => {
    render(<DashboardCard.Appointments />)
    expect(screen.getByText(/appointments/i)).toBeInTheDocument()
  })

  it('renders DashboardLayout ClientPortal story', () => {
    render(<DashboardLayout.ClientPortal />)
    expect(screen.getByText(/welcome back, jane!/i)).toBeInTheDocument()
  })

  it('renders IconInput SearchField story', () => {
    render(<IconInput.SearchField />)
    expect(screen.getByPlaceholderText(/type of therapy/i)).toBeInTheDocument()
  })

  it('renders Input Default story', () => {
    render(<Input.Default />)
    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument()
  })

  it('renders LeaderCard CEO story', () => {
    render(<LeaderCard.CEO />)
    expect(screen.getByText(/chief executive officer/i)).toBeInTheDocument()
  })

  it('renders OrDivider Default story', () => {
    render(<OrDivider.Default />)
    expect(screen.getByText(/or/i)).toBeInTheDocument()
  })

  it('renders PageHero WithSubtitle story', () => {
    render(<PageHero.WithSubtitle />)
    expect(screen.getByText(/what we treat/i)).toBeInTheDocument()
  })

  it('renders PortalCard ComingSoon story', () => {
    render(<PortalCard.ComingSoon />)
    expect(screen.getByText(/my appointments/i)).toBeInTheDocument()
  })

  it('renders SectionHeading Centred story', () => {
    render(<SectionHeading.Centred />)
    expect(screen.getByText(/comprehensive physical therapy/i)).toBeInTheDocument()
  })

  it('renders Select StringOptions story', () => {
    render(<Select.StringOptions />)
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument()
  })

  it('renders ServiceCard PhysicalTherapy story', () => {
    render(<ServiceCard.PhysicalTherapy />)
    expect(screen.getAllByText(/physical therapy/i).length).toBeGreaterThan(0)
  })

  it('renders Toggle Off story', () => {
    render(<Toggle.Off />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })
})
