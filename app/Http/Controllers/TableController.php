<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Services\TableService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TableController extends Controller
{
     public function __construct(protected TableService $tableService) {}
    public function store_tables_page(string $slug){
        $store = Store::with("tables")->where("slug",$slug)->firstOrFail();
        return Inertia::render("tables/index",[
            "store"=>$store
        ]);
    }


    public function storeTable(Request $request){
        $this->tableService->createTable($request);
        return redirect()->back();
    }


    public function updateTable(Request $request, int $id)
    {
        $this->tableService->UpdateTable($request, $id);
        return redirect()->back();
    }

   
    public function deleteTable(int $id)
    {
        $this->tableService->Destroy($id);
        return redirect()->back();
    }
}
