import { Router } from "express";
import { SpecialtyRoute } from "../module/specialty/specialty.route";
import { AuthRoute } from "../module/auth/auth.route";
import { UserRoute } from "../module/user/user.route";
import { DoctorRoutes } from "../module/doctor/doctor.route";
import { AdminRoutes } from "../module/admin/admin.route";

const router = Router()

router.use("/auth", AuthRoute)
router.use("/users", UserRoute)
router.use("/doctors", DoctorRoutes)
router.use("/admins", AdminRoutes)
router.use("/specialties", SpecialtyRoute)

export const IndexRoute = router;