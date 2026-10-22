<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFavoriteContactRequest extends FormRequest
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
            'is_favorite'=>'required|boolean'
        ];
    }
    
    public function messages(): array
    {
        return [
            'is_favorite.required' => 'De favorietenstatus is verplicht.',
            'is_favorite.boolean' => 'De favorietenstatus moet true of false zijn.',
        ];
    }
}
