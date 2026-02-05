import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";

const router = Router()

router.get("/", SpecialtyController.getAllSpecialty);
router.post("/", SpecialtyController.createSpecialty);
router.delete("/:id", SpecialtyController.deleteSpecialty);
router.patch("/:id", SpecialtyController.updateSpecialty);

export const SpecialtyRoute = router;