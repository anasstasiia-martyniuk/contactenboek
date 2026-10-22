<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexContactRequest;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Http\Requests\UpdateFavoriteContactRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index(IndexContactRequest $request)
    {
        $validated = $request->validated();  
        $query = Contact::query();
        
        // search
        if(!empty($validated['search'])){
            $search = $validated['search'];
            
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                ->orWhere('last_name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('company', 'like', "%{$search}%");
            });
        }
        
        // is favorite filter
        if(isset($validated['is_favorite'])){
            $query->where('is_favorite', (int) $validated['is_favorite']);
        }
        
        // sorting
        $sort = $validated['sort'] ?? 'last_name';
        $direction = $validated['direction'] ?? 'asc';
        
        $query->orderBy($sort, $direction)->orderBy('id', 'asc');
        
        
        // pagination
        $perPage = (int) ($validated['per_page'] ?? 10);
        
        $contacts = $query->paginate($perPage)->appends($request->query());
    
        return ContactResource::collection($contacts)
        ->response()
        ->setStatusCode(200);
    }
    
    public function show(string $id)
    {
        $contact = Contact::find($id);
        
        if (!$contact) {
            return response()->json([
                'message' => 'Contact niet gevonden.'
            ], 404);
        }
        
        return new ContactResource($contact)
        ->response()
        ->setStatusCode(200);
    }
    
    public function store(StoreContactRequest $request)
    {
        $contact = $request->validated();
        
        return new ContactResource(Contact::create($contact))
        ->response()
        ->setStatusCode(201);
    }
    
    public function update(UpdateContactRequest $request, string $id)
    {
        $contact = Contact::find($id);
        
        if (!$contact) {
            return response()->json([
                'message' => 'Contact niet gevonden.'
            ], 404);
        }
        
        $contact->update($request->validated());
        
        return new ContactResource($contact)
        ->response()
        ->setStatusCode(200);
    }
    
    public function updateFavorite(UpdateFavoriteContactRequest $request, string $id)
    {
        $contact = Contact::find($id);
        
        if (!$contact) {
            return response()->json([
                'message' => 'Contact niet gevonden.'
            ], 404);
        }
        
        $contact->update($request->validated());
        
        return new ContactResource($contact)
        ->response()
        ->setStatusCode(200);
    }
    
    public function destroy(string $id)
    {
        $contact = Contact::find($id);
        
        if (!$contact) {
            return response()->json([
                'message' => 'Contact niet gevonden.'
            ], 404);
        }
        
        $contact->delete();
        
        return response()->noContent();
    }
}
