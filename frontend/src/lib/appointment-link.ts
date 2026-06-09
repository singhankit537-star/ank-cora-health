/**
 * Routes to integrated /appointment or external standalone host (VITE_APPOINTMENT_URL).
 */
export function goToAppointment(navigate: (path: string) => void): void {
  const external = import.meta.env.VITE_APPOINTMENT_URL;
  if (external && external.startsWith('http')) {
    window.location.href = external;
    return;
  }
  navigate('/appointment');
}

export function getAppointmentUrl(): string {
  return import.meta.env.VITE_APPOINTMENT_URL || '/appointment';
}
