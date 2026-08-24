<?php

namespace App\Http\Controllers;

use App\Http\Requests\Office\StoreOfficeRequest;
use App\Models\Office;
use App\Services\Office\OfficeService;
use Illuminate\Http\Request;
use Inertia\Inertia;


class OfficeController extends Controller
{

    public function __construct(
        protected OfficeService $service
    ) {
    }
    public function index(Request $request)
    {

        $search = $request->query('search');

        $offices = Office::query()
            ->select([
                'id',
                'office',
                'abbreviation'
            ])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('office', 'like', "%{$search}%")
                        ->orWhere('abbreviation', 'like', "%{$search}%");
                });
            })
            ->orderBy('office')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('DataManagement/Offices', [
            'office' => $offices,
            'filter' => [
                'search' => $search
            ]
        ]);


    }

    public function store(StoreOfficeRequest $request)
    {
        $this->service->register($request->validated());

        return redirect()
            ->route('offices.index')
            ->with('success', 'Office created successfully.');
    }

    public function update(Request $request, Office $offices)
    {
        $validated = $request->validated(['office', 'abbreviation']);

        $offices->office = $validated['office'];
        $offices->abbreviation = $validated['abbreviation'];


        $offices->save();

        return redirect()
            ->route('offices.index')
            ->with('success', 'Office updated successfully.');


    }

    public function destroy(Office $office)
    {
        //abort_if($office->id === auth()->id(), 403, "You can't delete your own account.");
        $office->delete();
        return redirect()->back()->with('success', 'Office deleted.');
    }
}
