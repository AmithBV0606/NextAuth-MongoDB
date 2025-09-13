import { ConnectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/extract-token-data";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

ConnectDB();

export async function POST(request: NextRequest) {
  // Extract data from token
  const userId = await getDataFromToken(request);

  const user = await User.findOne({ _id: userId }).select("-password");

  // Check if there is user
  if (!user) {
    return NextResponse.json(
      {
        message: "Invalid token.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      message: "User found.",
      data: user,
    },
    { status: 200 }
  );
}
