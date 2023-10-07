import { z } from 'zod';

export const requestAddUpdateCarSchema = z.object({
  name: z.string().min(3),
  fuel_type: z.array(z.enum(['Petrol', 'Disel', 'CNG', 'Electric'])).min(1),
  min_price: z.number().min(300000),
  max_price: z.number().min(300000),
  body_type: z.enum(['SUV', 'Hatchback', 'Sedan']),
  transmission: z.enum(['Manual', 'Automatic', 'Both']),
});
