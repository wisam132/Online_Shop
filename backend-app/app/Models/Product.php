<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['product_name', 'product_marke', 'product_description', 'product_price', 'category_id', 'product_photo_primary','product_photo_secondary_1','product_photo_secondary_2', 'product_photo_secondary_3', 'size1', 'size2', 'size3', 'size4', 'size5', 'size6', 'size7'];


    public function Orders()
    {

        return $this->hasMany(Order::class, 'product_id');
    }

    public function shop_Card()
    {

        return $this->hasMany(Shop_Card::class, 'product_id');
    }

    public function my_Orders()
    {

        return $this->hasMany(my_Order::class, 'product_id');
    }

    public function category()
    {

        return $this->belongsTo(Category::class, 'category_id');
    }

}
