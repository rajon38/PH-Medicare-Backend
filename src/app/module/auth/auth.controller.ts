import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await AuthService.registerPatient(payload);
    sendResponse(res, {
        httpStatusCode: 201,
        success: true,
        message: "Patient registered successfully",
        data: result
    });
})

const login = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await AuthService.login(payload);
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "Login successful",
        data: result
    });
});

export const AuthController = {
    registerPatient,
    login
}