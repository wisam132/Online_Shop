<?php
namespace App\Http\Controllers;

use App\Models\Order;

use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    public function index()
    {

        $order = DB::select(

            "SELECT 
          orders.id,
          orders.user_id,
          orders.product_id,
          orders.quantity,
          orders.product_price * orders.quantity AS gesamt_preis,
          orders.Size,
          users.firstname,
          users.lastname,
          users.strasse,
          users.email,
          products.product_name,
          products.product_photo_primary,
          orders.created_at

      FROM 
          orders
      LEFT JOIN 
          products ON orders.product_id = products.id
      LEFT JOIN 
          users ON orders.user_id = users.id;
      ");

        return response()->json([

            "message" => "Orders selected",
            "Orders" => $order
        ], 200);

    }

    public function deleteOrder(string $id)
    {

        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json([

            "message" => "order deleted successfully",
            "order" => $order

        ], 200);
    }
    public function storeAndDestroy()
    {
        $userId = auth()->id();

        $order = DB::insert("
            INSERT INTO orders (user_id, product_id, quantity, product_price, Size, created_at, updated_at)
            SELECT user_id, product_id, quantity, product_price, Size, now(), now() FROM shop_cards
            WHERE user_id = $userId
        ");

        $order2 = DB::insert("
            INSERT INTO my_orders (user_id, product_id, quantity, product_price, Size, created_at, updated_at)
            SELECT user_id, product_id, quantity, product_price, Size, now(), now() FROM shop_cards
            WHERE user_id = $userId
        ");

        if ($order && $order2) {
            $this->destroy();
            return response()->json([
                'message' => 'Item created and deleted successfully',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Error creating the order',
            ], 500);
        }
    }

    public function destroy()
    {
        $userId = auth()->id();

        DB::delete('DELETE FROM shop_cards WHERE user_id = ?', [$userId]);

        return response()->json([
            'message' => 'Item deleted successfully',
            'user_id' => $userId,
        ]);
    }

    public function delete()
    {
        $orderController = app(OrderController::class);

        $response = $orderController->storeAndDestroy();

        if ($response->getStatusCode() === 200) {
            return response()->json([
                'message' => 'Store and destroy completed successfully',
            ]);
        } else {
            return response()->json([
                'message' => 'Error',
            ]);
        }
    }

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
}
