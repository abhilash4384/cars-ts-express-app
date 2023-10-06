import { z } from 'zod';
export const EMAIL_VALIDATOR_ZOD_SCHEMA = z.string().email();
