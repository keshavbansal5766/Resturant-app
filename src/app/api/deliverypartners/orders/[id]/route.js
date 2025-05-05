import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/OrdersModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  try {
    const deliveryBoyId = content.params.id;
    if (!deliveryBoyId) {
      return NextResponse.json({ success: false, error: "Missing user ID" });
    }

    // Prevent multiple connections in dev (especially with Turbopack)
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    const orders = await orderSchema.find({
      deliveryBoy_id: deliveryBoyId,
    });
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
