import { Router } from "express";
import { SpecialtyRoute } from "../module/specialty/specialty.route";
import { AuthRoute } from "../module/auth/auth.route";
import { UserRoute } from "../module/user/user.route";
import { DoctorRoute } from "../module/doctor/doctor.route";

const router = Router()

router.use("/auth", AuthRoute)
router.use("/users", UserRoute)
router.use("/doctors", DoctorRoute)
router.use("/specialties", SpecialtyRoute)

export const IndexRoute = router;