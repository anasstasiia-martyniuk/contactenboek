<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Routing\Route;
use Illuminate\Validation\Rule;

class UpdateContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    
    protected function prepareForValidation(): void
    {
        if($this->has('email') && is_string($this->input('email'))){
            $this->merge([
                'email'=> strtolower(trim($this->input('email'))),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {        
        return [
            'first_name'=>'required|string|max:100',
            'last_name'=>'required|string|max:100',
            'email'=>['required', 'email', 'max:255', Rule::unique('contacts', 'email')->ignore($this->route('id'))],
            'phone'=>'sometimes|nullable|regex:/^[0-9\s+-]+$/|max:20',
            'company'=>'sometimes|string|nullable|max:255',
            'notes'=>'sometimes|string|nullable|max:2000',
            'is_favorite'=>'sometimes|boolean'
        ];
    }
    
    public function messages(): array
    {
        return [
            'first_name.required'=>'Voornaam is verplicht.',
            'first_name.max'=>'De voornaam mag maximaal 100 tekens bevatten.',
            'last_name.required'=>'Achternaam is verplicht.',
            'last_name.max'=>'De achternaam mag maximaal 100 tekens bevatten.',
            'email.required'=>'E-mailadres is verplicht.',
            'email.unique' => 'Dit e-mailadres is al in gebruik.',
            'email.email'=>'Vul een geldig e-mailadres in, bijv. email@example.com.',
            'email.max'=>'Het e-mailadres mag maximaal 255 tekens bevatten.',
            'phone.regex'=>'Het telefoonnummer mag alleen cijfers, spaties, een + en een - bevatten.',
            'phone.max'=>'Het telefoonnummer mag maximaal 20 tekens bevatten.',
            'company.max'=>'De bedrijfsnaam mag maximaal 255 tekens bevatten.',
            'notes.max'=>'De notitie mag maximaal 2000 tekens bevatten.',
            'is_favorite.boolean' => 'De waarde van is_favorite moet waar of onwaar zijn.'
        ];
    }
}
