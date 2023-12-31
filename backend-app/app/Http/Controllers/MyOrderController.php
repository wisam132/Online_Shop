<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\my_order;

class MyOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
