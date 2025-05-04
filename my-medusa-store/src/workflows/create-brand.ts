import {
    createStep,
    createWorkflow,
    StepResponse,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { BRAND_MODULE } from "../modules/brand"
import BrandModuleService from "../modules/brand/service"

export type CreateBrandSteopInput = {
    name: string
}

export type CreateBrandWorkflowInput = {
    name: string
}


export const createBrandStep = createStep(
    "create-brand-step",
    async (input: CreateBrandSteopInput, { container}) => {
        const BrandModuleService: BrandModuleService = container.resolve(BRAND_MODULE)
        const brand = await BrandModuleService.createBrands(input)

        return new StepResponse(brand, brand.id)
    },
    async (id: string, { container}) => {
        const brandModuleService: BrandModuleService = container.resolve(BRAND_MODULE)
        await brandModuleService.deleteBrands(id)
    }
)

export const createBrandWorkflow = createWorkflow(
    "create-brand",
    (input: CreateBrandWorkflowInput) => {
        try {
            const brand = createBrandStep(input)

            return new WorkflowResponse(brand)
        } catch (error) {
            return new WorkflowResponse(error)
        }
    }
)
