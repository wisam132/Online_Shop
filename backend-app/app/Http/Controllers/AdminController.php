<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;
use App\Models\User;

use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Str;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // Change this in your AdminController.php
    public function index()
    {
        return Product::select(
            'id',
            'product_name',
            'product_price',
            'category_id',
            'product_photo_primary',
            'product_photo_secondary_1',
            'product_photo_secondary_2',
            'product_photo_secondary_3',
            'size1',
            'size2',
            'size3',
            'size4',
            'size5',
            'size6',
            'size7'
        )->get();
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

     public function store(Request $request)
     {
         $request->validate([
             'product_name' => 'required',
             'product_description' => 'required',
             'product_price' => 'required',
             'category_id' => 'required',
             'product_photo_primary' => 'required|image|mimes:jpeg,png,jpg,gif,webp',
             'product_photo_secondary_1' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp',
             'product_photo_secondary_2' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp',
             'product_photo_secondary_3' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp',
             'size1' => 'nullable',
             'size2' => 'nullable',
             'size3' => 'nullable',
             'size4' => 'nullable',
             'size5' => 'nullable',
             'size6' => 'nullable',
             'size7' => 'nullable',
         ]);
 
         $imageNamePrimary = Str::random() . '.' . $request->product_photo_primary->getClientOriginalExtension();
         Storage::disk('public')->putFileAs('product/image', $request->product_photo_primary, $imageNamePrimary);
 
         $imageNameSecondary1 = null;
         $imageNameSecondary2 = null;
         $imageNameSecondary3 = null;
 
         if ($request->hasFile('product_photo_secondary_1')) {
             $imageNameSecondary1 = Str::random() . '.' . $request->product_photo_secondary_1->getClientOriginalExtension();
             Storage::disk('public')->putFileAs('product/image/secondary1', $request->product_photo_secondary_1, $imageNameSecondary1);
         }
 
         if ($request->hasFile('product_photo_secondary_2')) {
             $imageNameSecondary2 = Str::random() . '.' . $request->product_photo_secondary_2->getClientOriginalExtension();
             Storage::disk('public')->putFileAs('product/image/secondary2', $request->product_photo_secondary_2, $imageNameSecondary2);
         }
 
         if ($request->hasFile('product_photo_secondary_3')) {
             $imageNameSecondary3 = Str::random() . '.' . $request->product_photo_secondary_3->getClientOriginalExtension();
             Storage::disk('public')->putFileAs('product/image/secondary3', $request->product_photo_secondary_3, $imageNameSecondary3);
         }
 
         try {
             Product::create($request->post() + [
                 'product_photo_primary' => $imageNamePrimary,
                  'product_photo_secondary_1' => $imageNameSecondary1,
                  'product_photo_secondary_2' => $imageNameSecondary2,
                  'product_photo_secondary_3' => $imageNameSecondary3,
             ]);
 
             return response()->json([
                 'message' => 'Item added successfully'
             ]);
         } catch (\Exception $e) {
             return response()->json([
                 'message' => $e->getMessage()
             ]);
         }
     }


  

     public function updateProduct(Request $request, Product $product) {
        try {
            $request->validate([
            'product_name' => 'required',
             'product_description' => 'required',
             'product_price' => 'required',
             'product_photo_primary' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp',
             'product_photo_secondary_1' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp',
             'product_photo_secondary_2' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp',
             'product_photo_secondary_3' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp',
             'size1' => 'nullable',
             'size2' => 'nullable',
             'size3' => 'nullable',
             'size4' => 'nullable',
             'size5' => 'nullable',
             'size6' => 'nullable',
             'size7' => 'nullable',
            ]);
            $request->merge(['_method' => 'PATCH']);

    
            $product->update([
                'product_name' => $request->input('product_name'),
                'product_description' => $request->input('product_description'),
                'product_price' => $request->input('product_price'),
                'size1' => $request->input('size1'),
                'size2' => $request->input('size2'),
                'size3' => $request->input('size3'),
                'size4' => $request->input('size4'),
                'size5' => $request->input('size5'),
                'size6' => $request->input('size6'),
                'size7' => $request->input('size7'),
             
            ]);
    
            if ($request->hasFile('product_photo_primary')) {
                $image = Str::random() . '.' . $request->product_photo_primary->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('product/image', $request->product_photo_primary, $image);
    
                if ($product->product_photo_primary) {
                    $exist = Storage::disk('public')->exists("product/image/{$product->product_photo_primary}");
    
                    if ($exist) {
                        Storage::disk('public')->delete("product/image/{$product->product_photo_primary}");
                    }
    
                    $product->update(['product_photo_primary' => $image]);
                }
            }


            if ($request->hasFile('product_photo_secondary_1')) {
                $imageSec1 = Str::random() . '.' . $request->product_photo_primary->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('product/image/secondary1', $request->product_photo_secondary_1, $imageSec1);
    
                if ($product->product_photo_primary) {
                    $exist = Storage::disk('public')->exists("product/image/secondary1/{$product->product_photo_secondary_1}");
    
                    if ($exist) {
                        Storage::disk('public')->delete("product/image/secondary1/{$product->product_photo_secondary_1}");
                    }
    
                    $product->update(['product_photo_secondary_1' => $imageSec1]);
                }
            }

            if ($request->hasFile('product_photo_secondary_2')) {
                $imageSec2 = Str::random() . '.' . $request->product_photo_primary->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('product/image/secondary2', $request->product_photo_secondary_2, $imageSec2);
    
                if ($product->product_photo_primary) {
                    $exist = Storage::disk('public')->exists("product/image/secondary2/{$product->product_photo_secondary_2}");
    
                    if ($exist) {
                        Storage::disk('public')->delete("product/image/secondary2/{$product->product_photo_secondary_2}");
                    }
    
                    $product->update(['product_photo_secondary_2' => $imageSec2]);
                }
            }


            if ($request->hasFile('product_photo_secondary_3')) {
                $imageSec3 = Str::random() . '.' . $request->product_photo_primary->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('product/image/secondary3', $request->product_photo_secondary_3, $imageSec3);
    
                if ($product->product_photo_primary) {
                    $exist = Storage::disk('public')->exists("product/image/secondary3/{$product->product_photo_secondary_3}");
    
                    if ($exist) {
                        Storage::disk('public')->delete("product/image/secondary3/{$product->product_photo_secondary_3}");
                    }
    
                    $product->update(['product_photo_secondary_3' => $imageSec3]);
                }
            }
    
            return response()->json([
                'message' => 'Product wurde erfolgreich aktualisiert',
                'Product' => $product
            ]);
    
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
     





    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->product_photo_primary) {
            $primaryPhotoPath = 'product/image/' . $product->product_photo_primary;
            if (Storage::disk('public')->exists($primaryPhotoPath)) {
                Storage::disk('public')->delete($primaryPhotoPath);
            }
        }

        $secondaryPhotos = [
            'product_photo_secondary_1',
            'product_photo_secondary_2',
            'product_photo_secondary_3',
        ];

        foreach ($secondaryPhotos as $photoKey) {
            if ($product->$photoKey) {
                $photoPath = 'product/image/secondary' . substr($photoKey, -1) . '/' . $product->$photoKey;
                if (Storage::disk('public')->exists($photoPath)) {
                    Storage::disk('public')->delete($photoPath);
                }
            }
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ], 200);
    }



    public function getAllUsers()
    {

        try {
            $user = User::all();

            return response()->json([
                'users' => $user
            ]);
        } catch (\Exception $e) {

            return response()->json([
                'message' => $e->getMessage()
            ]);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showProduct($id)
    {
        $product = Product::findOrFail($id);
        return response()->json([

            'products' => $product
        ]);
    }


  


    public function __construct()
    {
        $this->middleware('role:admin', ['only' => [
            'updateProduct', 'showProduct', 'index', 'destroy', 'store' 
        ]]);

        $this->middleware('auth:sanctum', ['except' => [
            'Adminregister' 
        ]]);
    }






}
