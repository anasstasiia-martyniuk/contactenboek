<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class IndexContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'search'=>'sometimes|string|max:100',
            'is_favorite'=>'sometimes|in:0,1',
            'sort'=>'sometimes|in:first_name,last_name,created_at',
            'direction'=>'sometimes|in:asc,desc',
            'page'=>'sometimes|integer|min:1',
            'per_page'=>'sometimes|integer|in:5,10,25,50'
        ];
    }
    
    public function messages(): array
    {
        return [
        'search.string' => 'De zoekterm moet tekst zijn.',
        'search.max' => 'De zoekterm mag maximaal 100 tekens bevatten.',
        'is_favorite.in' => 'De waarde van is_favorite moet 0 of 1 zijn.',
        'sort.in' => 'Ongeldige sorteerkolom.',
        'direction.in' => 'De sorteerrichting moet asc of desc zijn.',
        'page.integer' => 'Het paginanummer moet een geheel getal zijn.',
        'page.min' => 'Het paginanummer moet minimaal 1 zijn.',
        'per_page.integer' => 'Het aantal contacten per pagina moet een geheel getal zijn.',
        'per_page.in' => 'Het aantal contacten per pagina moet 5, 10, 25 of 50 zijn.',
    ];
    }
}
