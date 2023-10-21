import { z } from 'zod';

const reviewSchema = z.object({
  product: z.string().min(1).max(255).nonempty(),
  rating: z.number().min(1).max(5),
  text: z.string().min(1).max(1000).nonempty(),
  url: z.string().url(),
  user: z.string().uuid() 
});

export default reviewSchema;
