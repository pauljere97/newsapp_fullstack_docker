<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\UserPreference;
use DB;

class AuthLoginController extends Controller{
    public function createUser(Request $request){
        $data = [];
        $data['email'] = $request['email'];
        $data['name'] = $request['name'];
        $data['password'] = Hash::make($request['password']);
        try{
            $user = User::create($data);
        }catch(\Exception $e){
            return response()->json([
                'message'=>$e->getMessage()
            ]);
        }

        if(!$user){
            return response()->json([
                'message'=>'User could no be created'
            ]);
        }

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('AuthToken')->plainTextToken;
            return response()->json([
                'token' => $token,
                'user' => $user
            ], 200);
        }

        return response()->json([
            'success'=>true
        ]);
    }

    public function autoLogin(Request $request){
        $access_id = $myArray = explode('|', $request['token']);
        $tokenable_id  = \DB::table('personal_access_tokens')->where('id', $access_id[0])->get()->first();
        $user = User::where('id',$tokenable_id->tokenable_id)->get()->first();
        $preference = UserPreference::where(['user_id' => $tokenable_id->tokenable_id])->get()->first();
        return response()->json([
            'token' => $request['token'],
            'preference' => $preference,
            'user' => $user,
        ], 200);
    }

    public function login(Request $request){
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('AuthToken')->plainTextToken;
            $preference = UserPreference::where('user_id', $user['id'])->get()->first();
            return response()->json([
                'token' => $token,
                'user' => $user,
                'preference' => $preference,
            ], 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function logout(Request $request){
        $data = \DB::table('personal_access_tokens')->where('tokenable_id', $request['user_id'])->delete();
        return response()->json([
            'message' => 'Logged out successfully',
            'data' => $data,
        ], 200);
    }
    
}
