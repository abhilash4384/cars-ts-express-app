import path from 'path';
import { z } from 'zod';
export const EMAIL_VALIDATOR_ZOD_SCHEMA = z.string().email();
export const CARS_IMG_DIR = `${path.join(__dirname, '..', '..', 'assets/')}`;
