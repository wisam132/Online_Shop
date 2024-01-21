<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\my_order;

class MyOrderController extends Controller
{

    public function index()
    {
        $userId = auth()->id();

        $myOrders = my_order::select(
            "products.id",
            "products.product_photo_primary",
            "products.product_name",
            "my_orders.Size",
            "my_orders.quantity",
            "my_orders.product_price",
            \DB::raw("my_orders.quantity * my_orders.product_price as MulPreis")
        )
            ->from("products")
            ->leftJoin("my_orders", "my_orders.product_id", "=", "products.id")
            ->where("my_orders.user_id", '=', $userId)
            ->get();

        return response()->json([
            'message' => $myOrders,
        ], 200);

    }

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }


}
