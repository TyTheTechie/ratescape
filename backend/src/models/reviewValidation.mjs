import { z } from 'zod';

const reviewValidationSchema = z.object({
  product: z.string().min(1).max(255).nonempty("Product name is required."),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(1).max(1000).nonempty("Review text is required."),
  url: z.string().url("Invalid product URL."),
  user: z.string().uuid("Invalid user ID.")
});

export default reviewValidationSchema;
