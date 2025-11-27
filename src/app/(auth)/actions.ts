"use server";

import { generateRandomNumber } from "@/lib/utils";
import { sendEmail, verifyHashedText, hashText } from "@/lib/utils/server";
import { getErrorMessage } from "@/lib/utils";
import { cookies as nextCookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import { ServerResponse } from "@/lib/types";

export async function signUp({
  email,
  password,
  passwordConfirmation,
}: {
  email: string;
  password: string;
  passwordConfirmation: string;
}): Promise<ServerResponse> {
  try {
    const cookies = await nextCookies();

    // Verify whether the password is match or not
    if (password !== passwordConfirmation) {
      return { isError: true, message: "Passwords do not match", data: null };
    }

    // Verify whether user already exist or not
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return { isError: true, message: "Email already exists", data: null };
    }

    // Generate verification code
    const code = generateRandomNumber(100000, 999999).toString();

    // Send email
    await sendEmail({
      to: email,
      subject: "NextJS E-commerce - Signup",
      text: `Your signup verification code is: ${code}`,
      html: `Your signup verification code is: <b>${code}</b>`,
    });

    // Hash verification code (For JWT)
    const hashedCode = await hashText(code);

    // Create JWT
    const token = jwt.sign(
      {
        email: email,
        password: password,
        code: hashedCode,
      },
      process.env.JWT_KEY!,
      {
        expiresIn: "15m",
      },
    );

    // Set cookie
    cookies.set({
      name: "signup_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, //15 minutes
    });

    return {
      isError: false,
      message: "Verification code sent to your email",
      data: null,
    };
  } catch (error) {
    return { isError: true, message: getErrorMessage(error), data: null };
  }
}

export async function verifySignupCode({
  code,
}: {
  code: string;
}): Promise<ServerResponse> {
  try {
    const cookies = await nextCookies();

    // Get token
    const signupToken = cookies.get("signup_token")?.value;
    if (!signupToken) {
      return {
        isError: true,
        message: "Something's wrong, please try again",
        data: null,
      };
    }

    // Verify whether the JWT is valid or not
    const payload = jwt.verify(
      signupToken,
      process.env.JWT_KEY!,
    ) as jwt.JwtPayload;

    // Verify whether the code is match or not
    const isMatch = await verifyHashedText({
      text: code,
      hashedText: payload.code,
    });

    if (!isMatch) {
      return { isError: true, message: "Incorrect code", data: null };
    }

    // Delete cookie
    cookies.delete("signup_token");

    // Create user
    await prisma.user.create({
      data: {
        email: payload.email,
        hashedPassword: await hashText(payload.password),
      },
    });

    return {
      isError: false,
      message: "Account created successfully",
      data: null,
    };
  } catch (error) {
    return { isError: true, message: getErrorMessage(error), data: null };
  }
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ServerResponse> {
  try {
    const cookies = await nextCookies();

    // Verify whether the user is registered or not
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { isError: true, message: "Email not registered", data: null };
    }

    // Verify whether the password is match or not
    const isMatch = await verifyHashedText({
      text: password,
      hashedText: user.hashedPassword,
    });
    if (!isMatch) {
      return { isError: true, message: "Incorrect password", data: null };
    }

    // Create session token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!,
      {
        expiresIn: "7d",
      },
    );

    // Set cookie
    cookies.set({
      name: "session_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { isError: false, message: "Signed in successfully", data: null };
  } catch (error) {
    return { isError: true, message: getErrorMessage(error), data: null };
  }
}

export async function requestPasswordResetEmail({
  email,
}: {
  email: string;
}): Promise<ServerResponse> {
  try {
    const cookies = await nextCookies();

    // Verify whether the user is registered or not
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { isError: true, message: "Email not registered", data: null };
    }

    // Generate verification code
    const code = generateRandomNumber(100000, 999999).toString();

    // Send email
    await sendEmail({
      to: email,
      subject: "NextJS E-commerce - Password Reset",
      text: `Your password reset verification code is: ${code}`,
      html: `Your password reset verification code is: <b>${code}</b>`,
    });

    // Hash verification code (For JWT)
    const hashedCode = await hashText(code);

    const token = jwt.sign(
      { email: email, code: hashedCode },
      process.env.JWT_KEY!,
      { expiresIn: "15m" },
    );

    // Set cookie
    cookies.set({
      name: "password_reset_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
    });

    return {
      isError: false,
      message: "Password reset code sent to your email",
      data: null,
    };
  } catch (error) {
    return { isError: true, message: getErrorMessage(error), data: null };
  }
}

export async function verifyPasswordResetCode({
  code,
}: {
  code: string;
}): Promise<ServerResponse> {
  try {
    const cookies = await nextCookies();

    // Get password reset token
    const passwordResetToken = cookies.get("password_reset_token")?.value;
    if (!passwordResetToken) {
      return {
        isError: true,
        message: "Something's wrong, please try again",
        data: null,
      };
    }

    // Verify whether the JWT is valid or not
    const payload = jwt.verify(
      passwordResetToken,
      process.env.JWT_KEY!,
    ) as jwt.JwtPayload;

    // Verify whether the code is match or not
    const isMatch = await verifyHashedText({
      text: code,
      hashedText: payload.code,
    });

    if (!isMatch) {
      return { isError: true, message: "Incorrect code", data: null };
    }

    // Delete cookie
    cookies.delete("password_reset_token");

    const token = jwt.sign(
      { id: payload.id, email: payload.email, isVerified: true },
      process.env.JWT_KEY!,
      { expiresIn: "15m" },
    );

    // Create is verification code valid cookie
    cookies.set({
      name: "is_password_reset_verified_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
    });

    return {
      isError: false,
      message: "Password reset code verified",
      data: null,
    };
  } catch (error) {
    return { isError: true, message: getErrorMessage(error), data: null };
  }
}

export async function changePassword({
  password,
  passwordConfirmation,
}: {
  password: string;
  passwordConfirmation: string;
}): Promise<ServerResponse> {
  try {
    const cookies = await nextCookies();

    // Get token
    const token = cookies.get("is_password_reset_verified_token")?.value;
    if (!token) {
      return {
        isError: true,
        message: "Something's wrong, please try again",
        data: null,
      };
    }

    // Verify whether the JWT is valid or not
    const payload = jwt.verify(token, process.env.JWT_KEY!) as jwt.JwtPayload;

    // Verify whether the password is match or not
    if (password !== passwordConfirmation) {
      return { isError: true, message: "Passwords do not match", data: null };
    }

    // Change password
    await prisma.user.update({
      where: { email: payload.email },
      data: { hashedPassword: await hashText(password) },
    });

    // Delete cookie
    cookies.delete("is_password_reset_verified_token");

    return {
      isError: false,
      message: "Password changed successfully",
      data: null,
    };
  } catch (error) {
    return { isError: true, message: getErrorMessage(error), data: null };
  }
}

export async function signOut(): Promise<ServerResponse> {
  try {
    const cookies = await nextCookies();

    // Delete cookie
    cookies.delete("session_token");

    return { isError: false, message: "Signed out successfully", data: null };
  } catch (error) {
    return { isError: true, message: getErrorMessage(error), data: null };
  }
}
