import { Router } from "express";
import { SpecialtyRoute } from "../module/specialty/specialty.route";
import { AuthRoute } from "../module/auth/auth.route";
import { UserRoute } from "../module/user/user.route";
import { DoctorRoutes } from "../module/doctor/doctor.route";
import { AdminRoutes } from "../module/admin/admin.route";
import { ScheduleRoutes } from "../module/schedule/schedule.route";
import { DoctorScheduleRoutes } from "../module/doctorSchedule/doctorSchedule.route";
import { AppointmentRoutes } from "../module/appointment/appointment.route";
import { PatientRoutes } from "../module/patient/patient.route";

const router = Router()

router.use("/auth", AuthRoute)
router.use("/users", UserRoute)
router.use("/doctors", DoctorRoutes)
router.use("/admins", AdminRoutes)
router.use("/specialties", SpecialtyRoute)
router.use("/schedules", ScheduleRoutes)
router.use("/doctor-schedules", DoctorScheduleRoutes)
router.use("/appointments", AppointmentRoutes)
router.use("/patients", PatientRoutes)

export const IndexRoute = router;