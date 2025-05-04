import { z } from "zod"

console.log("Loading validation schema")
export const PostAdminCreateBrand = z.object({
  name: z.string(),
})