import { z } from 'zod';

export const userSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	role: z.string(),
	phone: z.string(),
	countryId: z.string().optional(),
	cityId: z.string().optional(),
	categories: z.array(z.string()).optional(),
});

