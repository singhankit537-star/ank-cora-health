import { useState } from 'react';
import { AppointmentPage } from '@ank-cora/appointment-mfe';
import type { ClinicSearchResult } from '@ank-cora/sdk';
import { coraSdk } from './sdk';

export default function App() {
  const [results, setResults] = useState<ClinicSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (
    params: Parameters<typeof coraSdk.appointments.searchClinics>[0],
  ) => {
    setIsSearching(true);
    setError(null);
    try {
      const clinics = await coraSdk.appointments.searchClinics(params);
      setResults(clinics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="text-xl font-bold text-cora-blue">CORA Health</span>
          <span className="text-sm text-cora-gray">Schedule Appointment</span>
        </div>
      </header>

      {error && (
        <div className="bg-red-50 px-4 py-3 text-center text-sm text-red-700" role="alert">
          {error}
        </div>
      )}
      {isSearching && (
        <div className="bg-cora-sky px-4 py-2 text-center text-sm text-cora-navy">
          Searching clinics…
        </div>
      )}

      <AppointmentPage onSearch={handleSearch} />

      {results.length > 0 && (
        <section className="border-t border-gray-200 bg-cora-light py-12">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-cora-navy">Nearby Clinics</h2>
            <ul className="space-y-4">
              {results.map((clinic) => (
                <li key={clinic.id} className="rounded-lg bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-cora-navy">{clinic.name}</h3>
                  <p className="text-sm text-cora-gray">
                    {clinic.address}, {clinic.city}, {clinic.state} {clinic.zipCode}
                  </p>
                  {clinic.distanceMiles != null && (
                    <p className="mt-1 text-sm text-cora-teal">{clinic.distanceMiles} mi away</p>
                  )}
                  <p className="mt-2 text-sm">{clinic.phone}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
