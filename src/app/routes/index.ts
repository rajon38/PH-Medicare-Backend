import { Router } from "express";
import { SpecialtyRoute } from "../module/specialty/specialty.route";
import { AuthRoute } from "../module/auth/auth.route";

const router = Router()

router.use("/auth", AuthRoute)
router.use("/specialties", SpecialtyRoute)

export const IndexRoute = router;