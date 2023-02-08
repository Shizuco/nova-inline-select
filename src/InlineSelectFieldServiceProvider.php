<?php

namespace Shizuco\Nova;

use Laravel\Nova\Nova;
use Illuminate\Support\ServiceProvider;

class InlineSelectFieldServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Nova::serving(function () {
            Nova::script('inline-select', __DIR__ . '/../dist/js/field.js');
            Nova::style('inline-select', __DIR__ . '/../dist/css/field.css');
        });
    }

    protected function routes()
    {
        if ($this->app->routesAreCached()) return;

        Route::middleware(['nova'])->prefix('nova-vendor/nova-inline-select-field')->group(function () {
            Route::post('/update/{resource}', [NovaInlineSelectFieldController::class, 'update']);
        });
    }
}
