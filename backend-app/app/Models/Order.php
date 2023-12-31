<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'product_id', 'quantity', 'product_price'];


    public function myOrders(){

       return $this->hasMany(my_Order::class, 'order_id');
    }

    public function Users(){

        return $this->belongsTo(User::class, 'user_id');
     }

     public function Products(){

        return $this->belongsTo(User::class, 'product_ID');
     }

}
