import { z } from 'zod';

// Extension / Third Party Library Using: Zod
export const todoSchema = z.object({
  title: z.string().min(3, "Başlık çok kısa").max(50),
  status: z.enum(["OPEN", "DONE"]).default("OPEN")
});