<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class shop_card extends Model
{
  use HasFactory;

  protected $fillable = [
    'id',
    'user_id',
    'product_id',
    'quantity',
    'product_price',
    'Size'
  ];
  public function Users()
  {

    return $this->belongsTo(User::class, 'user_ID');
  }

  public function Products()
  {

    return $this->belongsTo(Product::class, 'product_id');
  }


}
