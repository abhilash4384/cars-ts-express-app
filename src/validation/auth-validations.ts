import { z } from 'zod';
export const requestRegistrationSchema = z.object({
  first_name: z.string().min(3).max(15),
  last_name: z.string().min(3).max(15),
  email: z.string().email(),
  password: z.string().min(6),
});

export const requestLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
