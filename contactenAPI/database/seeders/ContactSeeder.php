<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use function Laravel\Prompts\note;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Contact::factory()->count(60)->create();
        
        Contact::create([
            'first_name'=>str_repeat('A', 100),
            'last_name'=>str_repeat('B', 100),
            'email'=>'longnames@example.com',
            'phone'=>null,
            'company'=>null,
            'notes'=>null,
            'is_favorite'=>false
        ]);
        
        Contact::create([
            'first_name'=>'Long',
            'last_name'=>'Email',
            'email'=>'this.is.a.very.long.email.adres.for.testing@example.com',
            'phone'=>null,
            'company'=>null,
            'notes'=>null,
            'is_favorite'=>true
        ]);
        
        Contact::create([
            'first_name'=>'Multiple',
            'last_name'=>'Lines',
            'email'=>'multiplelines@example.com',
            'phone'=>null,
            'company'=>null,
            'notes'=>"This is the first line.\nThis is the second line.\nThis is the third line.",
            'is_favorite'=>true
        ]);
    }
}
