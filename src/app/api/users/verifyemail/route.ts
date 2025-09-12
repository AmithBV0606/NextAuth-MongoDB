import { ConnectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { UserSchema } from "@/schemas";
import { UserType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

ConnectDB();

export async function POST(request: NextRequest) {
  try {
    // Verify User
    const body = await request.json();
    const { token } = body;
    console.log(token);

    if (!token) {
      throw new Error("No token found.");
    }

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid token.",
        },
        { status: 400 }
      );
    }

    console.log("User: ", user);

    // Change the "isVerified" to true in DB and remove the "verifyToken" and "verifyTokenExpiry" fields from DB
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
