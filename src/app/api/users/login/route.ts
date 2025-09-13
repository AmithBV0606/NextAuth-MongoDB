import { ConnectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { LogInSchema } from "@/schemas";
import { LogInType, PayloadType } from "@/types";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

ConnectDB();

export async function POST(request: NextRequest) {
  try {
    const body: LogInType = await request.json();
    const { email, password } = body;

    // TODO: Validation
    const result = LogInSchema.safeParse(body);
    console.log(body);
    if (!result.success) {
      result.error; // ZodError instance
    } else {
      result.data; // { username: string; xp: number }
    }

    // Check if user exists :
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          error: "User doesn't exists. Please Signup.",
        },
        { status: 400 }
      );
    }

    // Compare passwords :
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: "Invalid credentials.",
        },
        { status: 400 }
      );
    }

    // Generate JWT :
    const payload: PayloadType = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Logged in successfully.",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
