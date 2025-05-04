import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/OrdersModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// export async function GET(request) {
//   const userId = request.nextUrl.searchParams.get("id");
//   let success = false;
//   await mongoose.connect(connectionStr, { useNewUrlParser: true });
//   const result = await orderSchema.find({ user_id: userId });

//   if (result) {
//     let restoData = await Promise.all(
//       result.map(async (item) => {
//         let restoInfo = {};
//         restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id });
//         return restoInfo;
//       })
//     );

//     result = restoData;
//     success = true;
//   }

//   return NextResponse.json({ success, result });
// }
// 6815349e59c45b431bea7540

export async function GET(request) {
  try {
    const userId = request.nextUrl.searchParams.get("id");
    if (!userId) {
      return NextResponse.json({ success: false, error: "Missing user ID" });
    }

    // Prevent multiple connections in dev (especially with Turbopack)
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    const orders = await orderSchema.find({ user_id: userId });
    const result = await Promise.all(
      orders.map(async (order) => {
        const restaurant = await restaurantSchema
          .findById(order.resto_id)
          .lean(); // .lean() improves performance
        return { data: restaurant, amount: order.amount, status: order.status };
      })
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("GET /api error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(request) {
  const payload = await request.json();
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  let success = false;
  const orderObj = new orderSchema(payload);
  const result = await orderObj.save();
  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}
