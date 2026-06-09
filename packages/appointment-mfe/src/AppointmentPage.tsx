import { useState, FormEvent } from 'react';
import type { AppointmentSearchParams } from '@ank-cora/sdk';
import {
  AppointmentBookingCard,
  CardIcon,
  Container,
  IconInput,
  LocateIcon,
  OccupationalTherapyIcon,
  OrDivider,
  OutlineActionButton,
  PhysicalTherapyIcon,
  PinIcon,
  SearchIcon,
  SearchSubmitButton,
  ServiceBadge,
  SpeechTherapyIcon,
  ToggleSwitch,
} from '@ank-cora/ui-mfe';

const TEAM_IMAGE =
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=900';

const THERAPY_SERVICES = [
  { label: 'Physical Therapy', icon: <PhysicalTherapyIcon /> },
  { label: 'Occupational Therapy', icon: <OccupationalTherapyIcon /> },
  { label: 'Speech Therapy', icon: <SpeechTherapyIcon /> },
];

export interface AppointmentPageProps {
  onSearch?: (data: AppointmentSearchParams) => void | Promise<void>;
}

export function AppointmentPage({ onSearch }: AppointmentPageProps) {
  const [seenDoctor, setSeenDoctor] = useState(true);
  const [therapyType, setTherapyType] = useState('');
  const [location, setLocation] = useState('');
  const [insurance, setInsurance] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.({ therapyType, location, insurance, seenDoctor });
  };

  return (
    <section className="relative overflow-hidden bg-cora-navy py-12 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-24 top-10 h-28 w-28 rounded-full bg-white/5" />
        <div className="absolute left-[44%] top-1/2 h-24 w-24 rounded-full bg-cora-teal/20" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rotate-45 rounded-3xl border border-white/5" />
        <div className="absolute right-10 top-1/3 h-80 w-80 rotate-45 rounded-3xl border border-white/5" />
      </div>

      <Container className="relative">
        <h1 className="mb-8 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          Get On Our Books And Get On With Your Life.
        </h1>

        <div className="grid items-start gap-10 lg:grid-cols-2">
          <AppointmentBookingCard
            title="New Patient? Schedule An Appointment Now."
            subtitle="If you are a current CORA patient, please call your clinic to schedule your complete plan of care."
          >
            <form onSubmit={handleSearch} className="space-y-4">
              <IconInput
                icon={<SearchIcon />}
                placeholder="Type of Therapy"
                aria-label="Type of Therapy"
                value={therapyType}
                onChange={(e) => setTherapyType(e.target.value)}
              />
              <IconInput
                icon={<PinIcon />}
                trailing={
                  <button
                    type="button"
                    aria-label="Use my location"
                    className="text-cora-teal hover:text-cora-blue"
                  >
                    <LocateIcon />
                  </button>
                }
                placeholder="City, State or Zip Code"
                aria-label="City, State or Zip Code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <IconInput
                icon={<CardIcon />}
                placeholder="Insurance Provider"
                aria-label="Insurance Provider"
                value={insurance}
                onChange={(e) => setInsurance(e.target.value)}
              />

              <ToggleSwitch
                checked={seenDoctor}
                onChange={setSeenDoctor}
                label="Have you seen a doctor?"
              />

              <SearchSubmitButton icon={<SearchIcon />}>Search Clinic Now</SearchSubmitButton>

              <OrDivider />

              <p className="text-center text-sm text-cora-gray">
                In case injury is due to an auto accident or a workers&apos; compensation claim,
              </p>
              <OutlineActionButton type="button">
                Connect With CORA Team
              </OutlineActionButton>

              <OrDivider />

              <OutlineActionButton type="button">
                Book Telehealth Appointment
              </OutlineActionButton>
            </form>
          </AppointmentBookingCard>

          <div className="lg:pt-4">
            <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
              <img
                src={TEAM_IMAGE}
                alt="Care team ready to support your recovery"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <p className="mt-6 text-center text-base leading-relaxed text-white/90">
              The sooner you make an appointment at a CORA Clinic near you, the sooner you&apos;ll
              feel better. Let&apos;s do this!
            </p>

            <ul className="mt-6 flex items-start justify-center gap-8 sm:gap-12">
              {THERAPY_SERVICES.map(({ label, icon }) => (
                <ServiceBadge key={label} label={label} icon={icon} />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

AppointmentPage.displayName = 'AppointmentPage';
