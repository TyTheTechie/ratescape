import { z } from 'zod';

// Signup validation schema
const signupSchema = z.object({
  fullName: z.string().min(3).max(255),
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(1024)
});

export default signupSchema;
