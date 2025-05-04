import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import {
    createBrandWorkflow,
} from "../../../workflows/create-brand"
import { z } from "zod"
import { PostAdminCreateBrand } from "./validators"
type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateBrand>

export const POST = async (
    req: MedusaRequest<PostAdminCreateBrandType>,
    res: MedusaResponse
  ) => {
    try {
      const logger = req.scope.resolve("logger")
      logger.info("Request body:" + JSON.stringify(req.body))
      logger.info("Validated body:" + JSON.stringify(req.validatedBody))
      
      // If validatedBody is null, fall back to req.body
      const input = req.validatedBody
      
      const { result } = await createBrandWorkflow(req.scope).run({
        input,
      })
      res.json({ brand: result })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }