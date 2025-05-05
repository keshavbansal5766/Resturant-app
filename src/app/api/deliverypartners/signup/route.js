import { connectionStr } from "@/app/lib/db";
import { deliveryPartnersSchema } from "@/app/lib/deliveryPartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const deliveryPartner = await deliveryPartnersSchema(payload);
  const result = await deliveryPartner.save();
  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}
