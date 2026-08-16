<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCountryRequest;
use App\Http\Requests\UpdateCountryRequest;
use App\Services\CountryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CountryController extends Controller
{
     public function __construct(protected CountryService $countryService) {}
    public function index()
    {
        return Inertia::render('admin/countries/index', [
            'countries' => $this->countryService->getAll(),
        ]);
    }

    public function store(StoreCountryRequest $request)
    {
        $this->countryService->storeCountry($request->validated());
        return redirect()->back();
    }

    public function edit(int $id)
    {
        return Inertia::render('admin/countries/edit', [
            'country'   => $this->countryService->getById($id),
            'countries' => $this->countryService->getAll(),
        ]);
    }

    public function update(UpdateCountryRequest $request, int $id)
    {
        $this->countryService->updateCountry($id, $request->validated());
        return redirect()->route('countries.page');
    }

    public function delete(int $id)
    {
          $this->countryService->deleteCountry($id);
            return redirect()->back();
    }
}
