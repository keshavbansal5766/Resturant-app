import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  const { id } = await content.params;
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const result = await foodSchema.find({ resto_id: id });
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
