<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Admin extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * 
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'tel_number',
        'ZIP_code',
        'photo',
        'password',
        'strasse',
    ];

    /**
     * 
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password'

    ];
}
