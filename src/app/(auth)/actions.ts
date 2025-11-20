"use server";

import { delay, generateRandomNumber } from "@/lib/utils";
import { checkHashedText, hashText, sendEmail } from "@/lib/utils/server";
import { cookies as nextCookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import {
  changeUserPassword,
  createUser,
  getUserByEmail,
} from "@/lib/data/user";

export async function signUp({
  email,
  password,
  passwordConfirmation,
}: {
  email: string;
  password: string;
  passwordConfirmation: string;
}): Promise<{ error: string | null }> {
  await delay(2);

  const cookies = await nextCookies();

  try {
    // Verify whether the password is match or not
    if (password !== passwordConfirmation)
      throw new Error("Passwords do not match");

    // Verify whether user already exist or not
    const user = await getUserByEmail(email);

    if (user) throw new Error("Email already exists");

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

    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function verifySignupCode({
  code,
}: {
  code: string;
}): Promise<{ error: string | null }> {
  await delay(2);

  const cookies = await nextCookies();

  try {
    // Get token
    const signupToken = cookies.get("signup_token")?.value;

    if (!signupToken) throw new Error("Something's wrong, please try again");

    // Verify whether the JWT is valid or not
    const payload = jwt.verify(
      signupToken,
      process.env.JWT_KEY!,
    ) as jwt.JwtPayload;

    // Verify whether the code is match or not
    const isMatch = await checkHashedText({
      text: code,
      hashedText: payload.code,
    });

    if (!isMatch) throw new Error("Incorrect code");

    // Delete cookie
    cookies.delete("signup_token");

    // Create user
    await createUser({
      email: payload.email,
      password: payload.password,
    });

    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function signOut() {
  const cookies = await nextCookies();

  cookies.delete("session_token");
  redirect("/signin");
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ error: string | null }> {
  await delay(2);

  const cookies = await nextCookies();

  let token;
  try {
    const user = await getUserByEmail(email);

    if (!user) throw new Error("Email not registered");

    // Verify whether the password is match or not
    const isMatch = await checkHashedText({
      text: password,
      hashedText: user.hashedPassword,
    });

    if (!isMatch) throw new Error("Incorrect password");

    // Generate session token
    token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!, {
      expiresIn: "7d",
    });

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
  } catch (error) {
    return { error: (error as Error).message };
  }

  // If signin success, redirect
  if (token) redirect("/");
  return { error: null };
}

export async function sendPasswordResetEmail({
  email,
}: {
  email: string;
}): Promise<{ error: string | null }> {
  await delay(2);

  const cookies = await nextCookies();

  try {
    const user = await getUserByEmail(email);

    if (!user) throw new Error("Email not registered");

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
      // Set sameSite to "strict" to prevent sending the cookie over different domains and subdomains.
      // This is useful for preventing the cookie from being sent over a non-HTTPS connection or from a different domain/subdomain.
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
    });

    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function verifyPasswordResetCode({
  code,
}: {
  code: string;
}): Promise<{ error: string | null }> {
  await delay(2);

  const cookies = await nextCookies();

  try {
    // Get password reset token
    const passwordResetToken = cookies.get("password_reset_token")?.value;

    if (!passwordResetToken)
      throw new Error("Something's wrong, please try again");

    // Verify whether the JWT is valid or not
    const payload = jwt.verify(
      passwordResetToken,
      process.env.JWT_KEY!,
    ) as jwt.JwtPayload;

    // Verify whether the code is match or not
    const isMatch = await checkHashedText({
      text: code,
      hashedText: payload.code,
    });

    if (!isMatch) throw new Error("Incorrect code");

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

    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function changePassword({
  password,
  passwordConfirmation,
}: {
  password: string;
  passwordConfirmation: string;
}): Promise<{ error: string | null }> {
  await delay(2);

  const cookies = await nextCookies();

  try {
    // Get is password reset verified token
    const isPasswordResetVerifiedToken = cookies.get(
      "is_password_reset_verified_token",
    )?.value;

    if (!isPasswordResetVerifiedToken)
      throw new Error("Something's wrong, please try again");

    // Verify whether the JWT is valid or not
    const payload = jwt.verify(
      isPasswordResetVerifiedToken,
      process.env.JWT_KEY!,
    ) as jwt.JwtPayload;

    // Verify whether the password is match or not
    if (password !== passwordConfirmation)
      throw new Error("Passwords do not match");

    // Change password
    await changeUserPassword({
      email: payload.email,
      newPassword: password,
    });

    // Delete cookie
    cookies.delete("is_password_reset_verified_token");

    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
