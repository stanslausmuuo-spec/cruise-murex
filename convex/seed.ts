import { mutation } from './_generated/server';
import { hashPassword, generateToken } from './lib/password';

export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    const existingCars = await ctx.db.query('cars').collect();
    const existingUsers = await ctx.db.query('users').collect();

    if (existingCars.length > 0 || existingUsers.length > 0) {
      return { seeded: false };
    }

    for (const car of seedCars) {
      await ctx.db.insert('cars', car);
    }

    for (const user of seedUsers) {
      const hashed = await hashPassword(user.password);
      await ctx.db.insert('users', {
        ...user,
        password: hashed,
        token: generateToken(),
      });
    }

    return { seeded: true, cars: seedCars.length, users: seedUsers.length };
  },
});

const seedCars = [
  {
    make: 'Lamborghini',
    model: 'Huracán EVO',
    year: 2025,
    category: 'Supercar',
    dailyRate: 1200,
    seats: 2,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    speed: '325 km/h',
    description:
      'Experience raw power with the Lamborghini Huracán EVO. A 5.2L V10 engine delivers 640 HP, launching you from 0-100 km/h in just 2.9 seconds.',
    image: '/cars/lamborghini-huracan.jpg',
    available: true,
    featured: true,
  },
  {
    make: 'Rolls-Royce',
    model: 'Ghost',
    year: 2025,
    category: 'Luxury Sedan',
    dailyRate: 1500,
    seats: 5,
    fuelType: 'Petrol',
    speed: '250 km/h',
    description:
      'The pinnacle of luxury. The Rolls-Royce Ghost offers whisper-quiet comfort with a 6.75L V12 engine, starlight headliner, and handcrafted interior.',
    image: '/cars/rolls-royce-ghost.jpg',
    available: true,
    featured: true,
  },
  {
    make: 'Ferrari',
    model: 'SF90 Stradale',
    year: 2025,
    category: 'Supercar',
    dailyRate: 1800,
    seats: 2,
    fuelType: 'Hybrid',
    speed: '340 km/h',
    description:
      "Ferrari's first plug-in hybrid supercar. 1000 HP from a 4.0L V8 and three electric motors. The future of performance, today.",
    image: '/cars/ferrari-sf90.jpg',
    available: true,
    featured: true,
  },
  {
    make: 'Bentley',
    model: 'Continental GT',
    year: 2025,
    category: 'Grand Tourer',
    dailyRate: 1100,
    seats: 4,
    fuelType: 'Petrol',
    speed: '290 km/h',
    description:
      'British craftsmanship meets brute force. The Continental GT pairs a 6.0L W12 engine with hand-stitched leather and knurled metal details.',
    image: '/cars/bentley-continental.jpg',
    available: true,
    featured: false,
  },
  {
    make: 'Porsche',
    model: '911 Turbo S',
    year: 2025,
    category: 'Sports Car',
    dailyRate: 1000,
    seats: 4,
    fuelType: 'Petrol',
    speed: '330 km/h',
    description:
      'Iconic design meets engineering perfection. The 911 Turbo S delivers 650 HP with all-wheel drive and a 0-100 time of 2.7 seconds.',
    image: '/cars/porsche-911.jpg',
    available: true,
    featured: false,
  },
  {
    make: 'Mercedes-Maybach',
    model: 'S680',
    year: 2025,
    category: 'Luxury Sedan',
    dailyRate: 1300,
    seats: 5,
    fuelType: 'Petrol',
    speed: '250 km/h',
    description:
      'The ultimate expression of automotive luxury. Executive reclining seats, Burmester 4D sound, and a 6.0L V12 engine.',
    image: '/cars/maybach-s680.jpg',
    available: true,
    featured: false,
  },
  {
    make: 'Aston Martin',
    model: 'DBS Superleggera',
    year: 2024,
    category: 'Grand Tourer',
    dailyRate: 1400,
    seats: 2,
    fuelType: 'Petrol',
    speed: '340 km/h',
    description:
      'British elegance with a 5.2L twin-turbo V12. 715 HP of hand-built power wrapped in sculpted aluminium bodywork.',
    image: '/cars/aston-dbs.jpg',
    available: true,
    featured: false,
  },
  {
    make: 'Range Rover',
    model: 'SV Autobiography',
    year: 2025,
    category: 'SUV',
    dailyRate: 900,
    seats: 5,
    fuelType: 'Hybrid',
    speed: '225 km/h',
    description:
      'The luxury SUV benchmark. SVAutobiography offers semi-aniline leather, SV bespoke detailing, and effortless V8 power with off-road capability.',
    image: '/cars/range-rover-sv.jpg',
    available: true,
    featured: true,
  },
  {
    make: 'McLaren',
    model: 'Artura',
    year: 2025,
    category: 'Supercar',
    dailyRate: 1600,
    seats: 2,
    fuelType: 'Hybrid',
    speed: '330 km/h',
    description:
      "McLaren's high-performance hybrid. A 3.0L V6 twin-turbo with electric motor produces 680 HP in a lightweight carbon fibre chassis.",
    image: '/cars/mclaren-artura.jpg',
    available: true,
    featured: false,
  },
  {
    make: 'Bugatti',
    model: 'Chiron Sport',
    year: 2024,
    category: 'Hypercar',
    dailyRate: 5000,
    seats: 2,
    fuelType: 'Petrol',
    speed: '420 km/h',
    description:
      'The ultimate statement. 8.0L quad-turbo W16 engine producing 1500 HP. A masterpiece of engineering limited to an elite few.',
    image: '/cars/bugatti-chiron.jpg',
    available: true,
    featured: true,
  },
];

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@cruise.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'Jane Driver',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
  },
];
