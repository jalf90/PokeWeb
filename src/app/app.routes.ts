import { Routes } from '@angular/router';
import { NotFound } from './shared/components/not-found/not-found';
import { Home } from './features/home/home';
import { pokemonRoutes } from './features/pokemon/pokemon.routes';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    ...pokemonRoutes,
    {
        path: '**',
        component: NotFound
    }
];
