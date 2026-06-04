import bcrypt from 'bcryptjs'

// ---------------------------------------------------------------------------
// Users — seeded at startup. No external DB required.
// ---------------------------------------------------------------------------
const USERS = [
  {
    id: '1',
    username: 'admin',
    passwordHash: await bcrypt.hash('password123', 10),
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    username: 'client1',
    passwordHash: await bcrypt.hash('password123', 10),
    name: 'Jane Doe',
    role: 'client',
  },
]

// Runtime registry — new registrations are appended here.
const userRegistry = [...USERS]

// ---------------------------------------------------------------------------
// Locations
// ---------------------------------------------------------------------------
const LOCATIONS = [
  {
    id: '1',
    city: 'Jacksonville',
    state: 'Florida',
    address: '6100 Kennerly Rd.',
    phone: '(904) 739-9901',
    lat: 30.27,
    lng: -81.5,
  },
  {
    id: '2',
    city: 'Orlando',
    state: 'Florida',
    address: '4100 W. Fairbanks Ave.',
    phone: '(407) 539-2099',
    lat: 28.59,
    lng: -81.4,
  },
  {
    id: '3',
    city: 'Tampa',
    state: 'Florida',
    address: '3802 Gunn Hwy.',
    phone: '(813) 265-3233',
    lat: 28.07,
    lng: -82.5,
  },
  {
    id: '4',
    city: 'Miami',
    state: 'Florida',
    address: '1500 San Remo Ave.',
    phone: '(305) 551-4400',
    lat: 25.77,
    lng: -80.19,
  },
  {
    id: '5',
    city: 'Gainesville',
    state: 'Florida',
    address: '3700 NW 91st St.',
    phone: '(352) 331-7788',
    lat: 29.67,
    lng: -82.38,
  },
]

// ---------------------------------------------------------------------------
// User helpers
// ---------------------------------------------------------------------------
export function findUserByUsername(username) {
  return userRegistry.find((u) => u.username === username.toLowerCase().trim()) ?? null
}

export function findUserById(id) {
  return userRegistry.find((u) => u.id === id) ?? null
}

export function userExists(username) {
  return userRegistry.some((u) => u.username === username.toLowerCase().trim())
}

export async function addUser({ username, password, name }) {
  const id = String(userRegistry.length + 1)
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = {
    id,
    username: username.toLowerCase().trim(),
    passwordHash,
    name: name ?? username,
    role: 'client',
  }
  userRegistry.push(newUser)
  return newUser
}

// ---------------------------------------------------------------------------
// Location helpers
// ---------------------------------------------------------------------------
export function getAllLocations() {
  return LOCATIONS
}
