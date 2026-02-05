/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

    const specialty = await SpecialtyService.createSpecialty(payload);
    res.status(201).json({
        success: true,
        message: "Specialty created successfully",
        data: specialty
    });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to create specialty",
            error: error.message
        });
    }
}

const getAllSpecialty = async (req: Request, res: Response) => {
    try {
        const specialties = await SpecialtyService.getAllSpecialty();
        res.status(200).json({
            success: true,
            message: "Specialties retrieved successfully",
            data: specialties
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to retrieve specialties",
            error: error.message
        });
    }
}

const deleteSpecialty = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await SpecialtyService.deleteSpecialty(id as string);
        res.status(200).json({
            success: true,
            message: "Specialty deleted successfully"
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to delete specialty",
            error: error.message
        });
    }
}

const updateSpecialty = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        const specialty = await SpecialtyService.updateSpecialty(id as string, payload);
        res.status(200).json({
            success: true,
            message: "Specialty updated successfully",
            data: specialty
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to update specialty",
            error: error.message
        });
    }
}

export const SpecialtyController = {
    createSpecialty,
    getAllSpecialty,
    deleteSpecialty,
    updateSpecialty
}