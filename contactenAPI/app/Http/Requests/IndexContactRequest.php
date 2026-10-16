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
}
