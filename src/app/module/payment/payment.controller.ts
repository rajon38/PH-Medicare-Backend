/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { envVars } from "../../config/env";
import status from "http-status";
import { stripe } from "../../config/stripe.config";
import { PaymentService } from "./payment.service";
import { sendResponse } from "../../shared/sendResponse";

const handleStripeWebhookEvent = catchAsync(async (req: Request, res: Response) => {
    const signature = req.headers['stripe-signature'] as string;
    const webhookSecret = envVars.STRIPE.WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
        console.log("Missing Stripe signature or webhook secret");
        return res.status(status.BAD_REQUEST).send({ error: 'Missing Stripe signature or webhook secret' });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    } catch (error : any) {
        console.error("Error verifying webhook signature:", error);
        return res.status(status.BAD_REQUEST).send({ error: 'Invalid webhook signature' });
    }

    try {
        const result = await PaymentService.handlerStripeWebhookEvent(event);

        sendResponse(res, {
            success: true,
            httpStatusCode: status.OK,
            message: "Stripe webhook event processed successfully",
            data: result
        });
    } catch (error : any) {
        console.error("Error processing Stripe webhook event:", error);
        sendResponse(res, {
            success: false,
            httpStatusCode: status.INTERNAL_SERVER_ERROR,
            message: "Error processing Stripe webhook event",
            data: null
        });
    }
});

export const PaymentController = {
    handleStripeWebhookEvent
};