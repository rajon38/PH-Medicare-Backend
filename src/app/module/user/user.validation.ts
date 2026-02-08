import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
  password: z
    .string("Password is required and must be a string")
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),

  doctor: z.object({
    name: z
      .string("Name is required and must be a string")
      .min(4, "Name is required")
      .max(30, "Name must be less than 30 characters"),

    email: z
      .email("Email is required and must be a valid email address"),

    profilePhoto: z
      .string("Profile photo must be a string")
      .optional(),

    contactNumber: z
      .string("Contact number must be a string")
      .min(11, "Contact number must be at least 11 digits")
      .max(15, "Contact number must be at most 15 digits")
      .optional(),

    address: z
      .string("Address must be a string")
      .min(10, "Address must be at least 10 characters long")
      .max(100, "Address must be at most 100 characters long")
      .optional(),

    registrationNumber: z
      .string("Registration number is required and must be a string")
      .min(1, "Registration number is required"),

    experience: z
      .number("Experience must be a number")
      .min(0, "Experience cannot be negative")
      .optional(),

    gender: z.enum([Gender.MALE, Gender.FEMALE], "Gender is required and must be either 'MALE' or 'FEMALE'"),

    appointmentFee: z
      .number("Appointment fee is required and must be a number")
      .nonnegative("Appointment fee cannot be negative"),

    qualification: z
      .string("Qualification is required and must be a string")
      .min(1, "Qualification is required")
      .max(100, "Qualification must be less than 100 characters"),

    currentWorkplace: z
      .string("Current workplace is required and must be a string")
      .min(1, "Current workplace is required")
      .max(100, "Current workplace must be less than 100 characters"),

    designation: z
      .string("Designation is required and must be a string")
      .min(1, "Designation is required")
      .max(100, "Designation must be less than 100 characters"),
  }),

  specialties: z
    .array(z.uuid(), "specialties must be an array of UUID strings")
    .min(1, "At least one specialty is required"),
});