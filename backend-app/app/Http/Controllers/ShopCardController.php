<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Shop_Card;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ShopCardController extends Controller
{

    public function index()
    {
        $userId = auth()->id();

        $shopCard = Shop_Card::select(
            "shop_cards.id",
            "products.product_photo_primary",
            "products.product_name",
            "shop_cards.product_price",
            "shop_cards.Size",
            "shop_cards.quantity",
            \DB::raw("shop_cards.product_price * shop_cards.quantity AS total_price"),
            \DB::raw("SUM(shop_cards.product_price * shop_cards.quantity) AS total_price_sum")

        )
            ->from("products")
            ->join("shop_cards", "shop_cards.product_id", "=", "products.id")
            ->where("shop_cards.user_id", "=", $userId)
            ->groupBy(
                "shop_cards.id",
                "products.product_photo_primary",
                "products.product_name",
                "shop_cards.product_price",
                "shop_cards.Size",
                "shop_cards.quantity"
            )
            ->get();

        return response()->json([
            "item" => $shopCard,
        ]);
    }


    public function SelectTotalPrice()
    {
        $userId = auth()->id();

        $totalPrice = DB::select(
            "SELECT
            SUM(total_price) AS total_price_sum
        FROM
            (
                SELECT
                    shop_cards.id,
                    products.product_photo_primary,
                    products.product_name,
                    shop_cards.product_price,
                    shop_cards.Size,
                    shop_cards.quantity,
                    shop_cards.product_price * shop_cards.quantity AS total_price
                FROM
                    products
                JOIN
                    shop_cards ON shop_cards.product_id = products.id
                WHERE
                    shop_cards.user_id = $userId
            ) AS subquery;"
        );

        return response()->json([
            'total_price' => $totalPrice,
        ], 200);
    }

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }


    public function store(Request $request)
    {
        $request->validate([

            'user_id' => 'required',
            'product_id' => 'required',
            'quantity' => 'required',
            'product_price' => 'required',
            'Size' => 'required'

        ]);



        $ShopCard = Shop_Card::create($request->post());

        return response()->json([

            'message' => 'Shop Card Added Successfully',
            'item' => $ShopCard,
        ]);
    }



    public function destroy(string $id)
    {
        $shopCard = Shop_Card::findOrFail($id);

        $shopCard->delete();

        return response()->json([
            'message' => 'deleted'
        ]);
    }

}
