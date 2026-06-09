/**
 * Appointment route — hosts @ank-cora/appointment-mfe booking flow
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppointmentPage } from '@ank-cora/appointment-mfe';
import type { ClinicSearchResult } from '@ank-cora/sdk';
import { withErrorBoundary } from '@hocs/withErrorBoundary';
import { coraSdk } from '@/sdk';

function AppointmentRouteContent() {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: Parameters<typeof coraSdk.appointments.searchClinics>[0]) => {
    setIsSearching(true);
    setError(null);
    try {
      const clinics: ClinicSearchResult[] = await coraSdk.appointments.searchClinics(params);
      navigate('/locations', { state: { clinics, searchParams: params } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div>
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
    </div>
  );
}

const AppointmentRoute = withErrorBoundary(AppointmentRouteContent);

export default AppointmentRoute;
