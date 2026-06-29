import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  cars: defineTable({
    make: v.string(),
    model: v.string(),
    year: v.number(),
    category: v.string(),
    dailyRate: v.number(),
    seats: v.number(),
    fuelType: v.string(),
    transmission: v.optional(v.string()),
    speed: v.string(),
    description: v.string(),
    image: v.string(),
    available: v.boolean(),
    featured: v.boolean(),
  }),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
    role: v.optional(v.string()),
    token: v.optional(v.string()),
  }).index('by_email', ['email']).index('by_token', ['token']),

  bookings: defineTable({
    userId: v.id('users'),
    userName: v.string(),
    userEmail: v.string(),
    carId: v.id('cars'),
    carMake: v.string(),
    carModel: v.string(),
    carImage: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    days: v.number(),
    total: v.number(),
    dailyRate: v.number(),
    status: v.string(),
    paymentStatus: v.string(),
    createdAt: v.string(),
    paidAt: v.optional(v.string()),
  })
    .index('by_userId', ['userId'])
    .index('by_status', ['status']),
});
