import { NextFunction, Request, Response } from "express";
import { IUpdatePrescriptionPayload } from "./prescription.interface.js";

export const updatePrescriptionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.data) {
    req.body = JSON.parse(req.body.data);
  }

  const payload: IUpdatePrescriptionPayload = req.body;
  const files = req.files as { [fieldName: string]: Express.Multer.File[] | undefined };

  if (files?.profilePhoto?.[0]) {
    if (!payload) req.body = {};
    req.body.profilePhoto = files.profilePhoto[0].path;
  }

  req.body = payload;
  next();
};
