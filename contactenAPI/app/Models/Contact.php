<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    /** @use HasFactory<\Database\Factories\ContactFactory> */
    use HasFactory;
    
    public $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'company',
        'notes',
        'is_favorite'
    ];
    
    protected $casts = [
        'is_favorite' => 'boolean',
    ];
}
