# @ank-cora/appointment-mfe

Appointment booking flow modeled after [CORA Health scheduling](https://appointment.coraphysicaltherapy.com/).

UI primitives live in `@ank-cora/ui-mfe`; this package composes them into the booking page.

## Usage

```tsx
import { AppointmentPage } from '@ank-cora/appointment-mfe';

<AppointmentPage onSearch={(data) => console.log(data)} />
```

## Route

Host apps typically mount at `/appointment`:

```tsx
<Route path="/appointment" element={<Appointment />} />
```
