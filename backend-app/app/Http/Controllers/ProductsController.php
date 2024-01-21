<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;
use App\Models\Category;

class ProductsController extends Controller
{

    public function getClothes()
    {

        return Product::select(
            'products.id',
            'products.product_name',
            'products.product_marke',
            'products.product_description',
            'products.product_price',
            'products.product_photo_primary',
            'products.product_photo_secondary_1',
            'products.product_photo_secondary_2',
            'products.product_photo_secondary_3',
            'categories.category_name'
        )
            ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->where('categories.category_name', 'kleidung')
            ->get();

    }


    public function getUniqueProductNames()
    {
        $uniqueProductNames = Product::distinct()->pluck('product_name')->merge(Product::distinct()->pluck('product_marke'));

        return response()->json([
            'uniqueProductNames' => $uniqueProductNames,
        ]);
    }


    public function getDevicess()
    {

        return Product::select('products.id', 'products.product_marke', 'products.product_description', 'products.product_price', 'products.product_photo_primary', 'products.product_photo_secondary_1', 'products.product_photo_secondary_2', 'products.product_photo_secondary_3', 'categories.category_name')
            ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->where('categories.category_name', 'geraete')
            ->get();

    }

    public function getFurniture()
    {

        return Product::select('products.id', 'products.product_marke', 'products.product_description', 'products.product_price', 'products.product_photo_primary', 'products.product_photo_secondary_1', 'products.product_photo_secondary_2', 'products.product_photo_secondary_3', 'categories.category_name')
            ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->where('categories.category_name', 'moebel')
            ->get();

    }

    public function getHomeClothes()
    {
        return Product::select('id', 'product_marke', 'product_price', 'product_photo_primary')
            ->from('products')
            ->where('category_id', 1)
            ->orderByRaw('RAND()')
            ->limit(5)
            ->get();
    }


    public function getHomeDevicess()
    {
        return Product::select('id', 'product_marke', 'product_price', 'product_photo_primary')
            ->from('products')
            ->where('category_id', 2)
            ->orderByRaw('RAND()')
            ->limit(5)
            ->get();
    }


    public function getHomeFurniture()
    {
        return Product::select('id', 'product_marke', 'product_price', 'product_photo_primary')
            ->from('products')
            ->where('category_id', 3)
            ->orderByRaw('RAND()')
            ->limit(5)
            ->get();
    }

    public function show(Product $product)
    {

        return response()->json([

            'product' => $product
        ]);

    }

    public function showByName($product_name, $product_marke)
    {
        $products = Product::where('product_name', $product_name)
            ->orWhere('product_marke', $product_marke)
            ->get();

        if ($products->isNotEmpty()) {
            return response()->json([
                'products' => $products
            ]);
        } else {
            return response()->json([
                'message' => 'Produkt nicht gefunden'
            ], 404);
        }
    }



    public function index()
    {
        $products = Product::all();
        return response()->json([
            'products' => $products

        ], 200);
    }

    public function __construct()
    {
        $this->middleware('auth:sanctum', [
            'except' => [
                'getHomeClothes',
                'getHomeDevicess',
                'getHomeFurniture'
            ]
        ]);
    }


}
