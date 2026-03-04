import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { PokemonApiService } from '../data-access/pokemon-api.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pokemon-page',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.scss',
})
export default class PokemonPage {
  private _pokemonService = inject(PokemonApiService);

  protected $currentPage = signal(1);
  protected $pokemonResponse = toSignal(
    toObservable(this.$currentPage).pipe(
      switchMap(page => this._pokemonService.getPokemonList(page-1))
    ),
  {initialValue: null}
);

  handlePrevClick(): void {
    this.$currentPage.update(value => value-1);
  }

  handleNextClick(): void {
    this.$currentPage.update(value => value+1);
  }
}
