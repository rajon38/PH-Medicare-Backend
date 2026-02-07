
import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const specialty = await SpecialtyService.createSpecialty(payload);
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Specialty created successfully",
        data: specialty
    });
});

const getAllSpecialty = catchAsync(async (req: Request, res: Response) => {
    const specialties = await SpecialtyService.getAllSpecialty();
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Specialties retrieved successfully",
        data: specialties
    });
});

const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    await SpecialtyService.deleteSpecialty(id as string);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Specialty deleted successfully"
    });
});

const updateSpecialty = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const specialty = await SpecialtyService.updateSpecialty(id as string, payload);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Specialty updated successfully",
        data: specialty
    });
});

export const SpecialtyController = {
    createSpecialty,
    getAllSpecialty,
    deleteSpecialty,
    updateSpecialty
}