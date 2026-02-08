import status from "http-status";
import { prisma } from "../../lib/prisma";
import { IUpdateDoctorPayload } from "./doctor.interface";
import AppError from "../../errorHelpers/AppError";
import { Specialty } from "../../../generated/prisma/browser";

const getAllDoctors = async () => {
    const doctors = await prisma.doctor.findMany({
        include: {
            user: true,
            specialties: {
                include: {
                    specialty: true
                }
            }
        }
    })
    return doctors;
}

const getDoctorById = async (id: string) => {
    const doctor = await prisma.doctor.findUnique({
        where: {
            id
        },
        include: {
            user: true,
            specialties: {
                include: {
                    specialty: true
                }
            }
        }
    });
    return doctor;
}

const updateDoctor = async (id: string, payload: IUpdateDoctorPayload) => {
    const doctorExists = await prisma.doctor.findUnique({
        where: {
            id
        }
    });

    if (!doctorExists) {
        throw new AppError(status.NOT_FOUND, "Doctor not found");
     }
     
    const specialties: Specialty[] = [];

    if (payload.specialties) {
        for (const specialtyId of payload.specialties) {
        const specialty = await prisma.specialty.findUnique({
            where: {
                id: specialtyId
            }
        });

        if (!specialty) {
            throw new AppError(status.NOT_FOUND, `Specialty with id ${specialtyId} not found`);
        }
        specialties.push(specialty);
        }
        const doctorSpecialtyData = specialties.map(specialty => ({
            doctorId: doctorExists.id,
            specialtyId: specialty.id
        }));
        await prisma.doctorSpecialty.deleteMany({
            where: {
                doctorId: doctorExists.id
            }
        });

        await prisma.doctorSpecialty.createMany({
                 data: doctorSpecialtyData
        });
    }
    
    const doctor = await prisma.doctor.update({
        where: {
            id
        },
        data: {
            name: payload.name || doctorExists.name,
            profilePhoto: payload.profilePhoto || doctorExists.profilePhoto,
            contactNumber: payload.contactNumber || doctorExists.contactNumber,
            address: payload.address || doctorExists.address,
            registrationNumber: payload.registrationNumber || doctorExists.registrationNumber,
            experience: payload.experience || doctorExists.experience,
            gender: payload.gender || doctorExists.gender,
            appointmentFee: payload.appointmentFee || doctorExists.appointmentFee,
            qualification: payload.qualification || doctorExists.qualification,
            currentWorkplace: payload.currentWorkplace || doctorExists.currentWorkplace,
            designation: payload.designation || doctorExists.designation,
        },
        include: {
            user: true,
            specialties: {
                include: {
                    specialty: true
                }
            }
        }
    });
    return doctor;
}

//soft delete doctor by id
const deleteDoctor = async (id: string) => {
    const doctorExists = await prisma.doctor.findUnique({
        where: {
            id
        }
    });

    if (!doctorExists) {
        throw new AppError(status.NOT_FOUND, "Doctor not found");
     }

    await prisma.doctor.update({
        where: {
            id
        },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
            user: {
                update: {
                    isDeleted: true,
                    deletedAt: new Date(),
                }
            }
        }
    });

    return { message: "Doctor deleted successfully" };
}

export const DoctorService = {
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
}