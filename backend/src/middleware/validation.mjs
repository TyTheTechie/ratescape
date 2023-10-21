import { z } from 'zod';

// Signup validation schema
export const signupValidation = (data) => {
    try {
      signupSchema.parse(data);
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  };