import { connectionStr } from "@/app/lib/db";
import { deliveryPartnersSchema } from "@/app/lib/deliveryPartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const result = await deliveryPartnersSchema.findOne({
    mobile: payload.loginMobile,
    password: payload.loginPassword,
  });

  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}
