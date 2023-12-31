<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Str;

class AuthController extends Controller
{



    public function index(){

        $user = User::where('role', 'user')->get();
        return response()->json([

            'user' => $user
        ], 200);

    }


    public function register(Request $request)
    {

        $request->validate([

            'firstname'=>'required',
            'lastname'=>'required',
            'email'=>'required',
            'tel_number'=> 'nullable',
            'strasse'=> 'required',
            'ZIP_code'=>'required',
            'photo'=>'nullable',
            'password'=>'required'
        ]);

        $image = Str::random() . '.' . $request->photo->getClientOriginalExtension();
        Storage::disk('public')->putFileAs('user/image', $request->photo, $image);

        try{
            
            $user = User::create([
                'firstname' => $request->input('firstname'),
                'lastname' => $request->input('lastname'),
                'email' => $request->input('email'),
                'strasse' => $request->input('strasse'),
                'tel_number' => $request->input('tel_number'),
                'ZIP_code' => $request->input('ZIP_code'),
                'password' => Hash::make($request->input('password')),
                'photo' => $image
            ]);

        return response()->json([

            'message' => 'Benutzer wurde erfolgreich hinzugefgt',
            'user' => $user

        ]);
        } catch (\Exception $e){

        return response()->json([

            'message' => $e->getMessage()
        ]);
    }


    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response([
                'message' => 'Invalid credentials!'
            ], Response::HTTP_UNAUTHORIZED);
        }
    
        $user = Auth::user();
    
        $token = $user->createToken('token')->plainTextToken;
    
        $cookie = cookie('jwt', $token, 60 * 24); // 1 day
    
        return response([
            'message' => $token,
            'role' => $user->role

        ])->withCookie($cookie);
    }
    
    
    

   

    public function logout()
    {
        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'success',

        ])->withCookie($cookie);
    }


    public function Adminregister(Request $request)
    {

        $request->validate([
            'firstname'=>'required',
            'lastname'=>'required',
            'email'=>'required',
            'tel_number'=> 'nullable',
            'strasse'=> 'required',
            'ZIP_code'=>'required',
            'photo'=>'nullable',
            'password'=>'required'     
        ]);

        $image = Str::random() . '.' . $request->photo->getClientOriginalExtension();
        Storage::disk('public')->putFileAs('admin/image', $request->photo, $image);

        try {
            $admin = User::create([
                'firstname' => $request->input('firstname'),
                'lastname' => $request->input('lastname'),
                'email' => $request->input('email'),
                'strasse' => $request->input('strasse'),
                'tel_number' => $request->input('tel_number'),
                'ZIP_code' => $request->input('ZIP_code'),
                'password' => Hash::make($request->input('password')),
                'photo' => $image,
                'role' => 'admin'
            ]);
        
            return response()->json([
                'message' => 'Admin wurde erfolgreich hinzugefügt',
                'Admin' => $admin
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ]);
        }


    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        if ($user->photo) {
            $photoPath = 'user/image/' . $user->photo;
            if (Storage::disk('public')->exists($photoPath)) {
                Storage::disk('public')->delete($photoPath);
            }
        }
    
        $user->delete();
    
        return response()->json([
            'message' => 'User deleted successfully',
        ], 200);
    }
    


public function updateUser(Request $request, User $user)
{
    $request->validate([
        'firstname' => 'required',
        'lastname' => 'required',
        'email' => 'required|email|unique:users,email,' . $user->id,
        'tel_number' => 'nullable',
        'strasse' => 'required',
        'ZIP_code' => 'required',
        'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        'password' => 'nullable|min:6' 
    ]);

    try {
        $user->update([
            'firstname' => $request->input('firstname'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'),
            'strasse' => $request->input('strasse'),
            'tel_number' => $request->input('tel_number'),
            'ZIP_code' => $request->input('ZIP_code'),
        ]);

        if ($request->filled('password')) {
            $user->update(['password' => Hash::make($request->input('password'))]);
        }

        if ($request->hasFile('photo')) {
            $image = Str::random() . '.' . $request->photo->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('user/image', $request->photo, $image);

            if ($user->photo) {
                $exist = Storage::disk('public')->exists("user/image/{$user->photo}");
                if ($exist) {
                    Storage::disk('public')->delete("user/image/{$user->photo}");
                }
            }

            $user->update(['photo' => $image]);
        }

        return response()->json([
            'message' => 'Benutzer wurde erfolgreich aktualisiert',
            'user' => $user
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'message' => $e->getMessage()
        ]);
    }
}




    public function user()
    {
        return Auth::user();
    }
    
    public function shopCardIndex()
    {
        return app(ShopCardController::class)->index();
    }

    public function orderStore(Request $request)
    {
        return app(OrderController::class)->store($request);
    }
    

    public function orderDestroy(){

        return app(OrderController::class)->destroy();
    }

    public function myOrderIndex(){

        return app(MyOrderController::class)->index();
    }

    public function __construct()
    {
        $this->middleware('role:user', ['only' => [
        ]]);

        $this->middleware('auth:sanctum', ['except' => [
            'register', 'login' 
        ]]);
    }
    

}
