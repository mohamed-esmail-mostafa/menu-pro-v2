<?php

namespace App\Services;

use App\Models\Store;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\File;

class TableService
{
   public function __construct(protected CloudinaryService $cloudinaryService) {}

    public function createTable(Request $request)
    {
       
        $validated = $request->validate([
            'store_id'=>'required',
            'name'     => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
        ]);
        $store = Store::findOrFail($request->store_id);
        $table = new Table();
        $table->store_id =$validated["store_id"];
        $table->name =  $validated['name'];
        $table->capacity =  $validated['capacity'];
        $table->save();
        // Generate QR Code
        $qrCode = $this->generateAndUploadQRCode($table, $store);
        $table->update(['qr_code' => $qrCode]);
        return $table;
    }


    public function UpdateTable(Request $request, int $id)
    {
        $table = Table::findOrFail($id);
        $store = $table->store;
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
        ]);

        $table->update([
            'name'     => $validated['name'],
            'capacity' => $validated['capacity'],
        ]);

        // Regenerate QR Code if name changed
        if ($table->wasChanged('name')) {
            $qrCode = $this->generateAndUploadQRCode($table, $store);
            $table->update(['qr_code' => $qrCode]);
        }
    }


    public function Destroy(int $id){
       
            $table = Table::findOrFail($id);
            $this->cloudinaryService->deleteFromCloudinary($table->public_id);
            $table->delete();
            return true;
    }


    private function generateAndUploadQRCode($table, $store)
    {
        try {

            $slug = $store->slug ?? Str::slug($store->name);

            $url = route('store.menu', [
                'slug'     => $slug,
                'store_id' => $store->id,
                'table'    => $table->id,
            ]);


            $result = (new \Endroid\QrCode\Builder\Builder(
                writer: new \Endroid\QrCode\Writer\PngWriter(),
                writerOptions: [],
                validateResult: false,
                data: $url,
                encoding: new \Endroid\QrCode\Encoding\Encoding('UTF-8'),
                errorCorrectionLevel: \Endroid\QrCode\ErrorCorrectionLevel::High,
                size: 500,
                margin: 10,
                roundBlockSizeMode: \Endroid\QrCode\RoundBlockSizeMode::Margin
            ))->build();


            // حفظ مؤقت في storage
            $fileName = 'qr_' . $table->id . '_' . time() . '.png';
            $tempPath = storage_path('app/public/' . $fileName);

            file_put_contents($tempPath, $result->getString());


            $uploadedUrl = $this->cloudinaryService->uploadToCloudinary(
                new File($tempPath),
                'qr_codes'
            );
            unlink($tempPath);
            return $uploadedUrl;
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
}
