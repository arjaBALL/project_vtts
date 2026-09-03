<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();

            $table->string('plate_number')->unique();

            $table->foreignId('office_id')
                ->constrained('offices');

            $table->foreignId('vehicle_type_id')
                ->constrained('vehicle_types');

            $table->string('model');
            $table->unsignedSmallInteger('year_model');

            $table->unsignedTinyInteger('capacity')->nullable();

            $table->enum('fuel_type', [
                'gasoline',
                'diesel',
                'electric',
                'hybrid',
            ])->nullable();

            $table->string('fleet_card_number')
                ->nullable()
                ->unique();

            $table->decimal('fuel_consumption', 5, 2)
                ->nullable();

            $table->enum('status', [
                'active',
                'under_maintenance',
                'inactive',
                'disposed',
                'retired',
            ])->default('active');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};