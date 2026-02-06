import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
//import { prisma } from "../../lib/prisma";

interface IRegisterPatientPayload {
    name: string;
    email: string;
    password: string;
}

interface ILoginPayload {
    email: string;
    password: string;
}

const registerPatient = async (payload: IRegisterPatientPayload) => {
    const { name, email, password } = payload;
    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
        }
    })
    if (!data.user) {
        throw new Error("Failed to register patient");
    }

    // const patient = await prisma.$transaction(async (tx) => {

    // });

    return data;
}

const login = async (payload: ILoginPayload) => {
    const { email, password } = payload;
    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })
    if (!data.user) {
        throw new Error("Invalid email or password");
    }
    if (data.user.status === UserStatus.BLOCKED) {
        throw new Error("Your account has been blocked. Please contact support.");
    }
    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("Your account has been deleted. Please contact support.");
    }
    return data;
}

export const AuthService = {
    registerPatient,
    login
}