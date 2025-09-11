import { ConnectDB } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModels";
import { UserSchema } from "@/schemas";
import { UserType } from "@/types";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

ConnectDB();

export async function POST(req: NextRequest) {
  try {
    const body: UserType = await req.json();
    const { username, email, password } = body;

    // TODO: Validation
    const result = UserSchema.safeParse(body);
    console.log(body);
    if (!result.success) {
      result.error; // ZodError instance
    } else {
      result.data; // { username: string; xp: number }
    }

    // Register the User :
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          error: "User already exists.",
        },
        { status: 400 }
      );
    }

    // Hash password :
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user in DB :
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send verification mail :
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User registered successfully.",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
