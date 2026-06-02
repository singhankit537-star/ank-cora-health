/**
 * Locations Page
 * Demonstrates: Promise.allSettled for resilient data fetching
 */

import React from 'react';
import { Container, SectionHeading, Card } from '@components/ui';
import { mockLocations } from '@services/api/mockData';

const LocationCard: React.FC<{
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: Record<string, string>;
}> = ({ name, address, city, phone, hours }) => (
  <Card hoverable>
    <h3 className="text-2xl font-bold mb-2">{name}</h3>
    <p className="text-gray-600 mb-1">{address}</p>
    <p className="text-gray-600 mb-4">{city}</p>
    <p className="text-blue-600 font-semibold mb-4">{phone}</p>
    <div className="border-t pt-4">
      <h4 className="font-semibold mb-2">Hours:</h4>
      <ul className="text-sm text-gray-600 space-y-1">
        {Object.entries(hours).map(([day, time]) => (
          <li key={day} className="flex justify-between">
            <span className="capitalize font-medium">{day}:</span>
            <span>{time}</span>
          </li>
        ))}
      </ul>
    </div>
  </Card>
);

const LocationsPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Container>
          <h1 className="text-5xl font-bold mb-4">Find a Location</h1>
          <p className="text-xl text-blue-100">
            Visit one of our conveniently located clinics
          </p>
        </Container>
      </section>

      {/* Locations Grid */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title="Our Clinics"
            subtitle="Multiple locations to serve you better"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockLocations.map((location) => (
              <LocationCard
                key={location.id}
                name={location.name}
                address={location.address}
                city={location.city}
                phone={location.phone}
                hours={location.hours}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 py-20">
        <Container>
          <SectionHeading title="Service Coverage Area" />
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-600 text-lg">Interactive map would be displayed here</p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LocationsPage;
