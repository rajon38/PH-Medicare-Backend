import z from "zod";
const createSpecialtyZodSchema = z.object({
    title: z.string("Title must be a string").min(3, "Title must be at least 3 characters").max(50, "Title must be at most 50 characters"),
    description: z.string("Description must be a string").min(10, "Description must be at least 10 characters").max(500, "Description must be at most 500 characters").optional(),
})

export const SpecialtyValidation = {
    createSpecialtyZodSchema
}