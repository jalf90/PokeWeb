import { environment } from './../../../../environment';
import { Routes } from "@angular/router";
import { POKEMON_API_BASE_URL } from './data-access/pokemon-api-base-url.token';
import { PokemonApiService } from './data-access/pokemon-api.service';

export const pokemonRoutes: Routes = [
    {
        path: 'pokemon',
        providers: [
            {
                provide: POKEMON_API_BASE_URL,
                useValue: environment.api.pokemonBaseUrl
            },
            PokemonApiService
        ],
        loadComponent: () => import('./page/pokemon-page'),
        loadChildren: () => [
            {
                path: ':name',
                loadComponent: () => import('./components/pokemon-detail/pokemon-detail.component')
            }
        ]
    }
]