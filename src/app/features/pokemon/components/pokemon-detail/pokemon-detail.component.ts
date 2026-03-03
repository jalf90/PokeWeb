import { toSignal } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonApiService } from '../../data-access/pokemon-api.service';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  imports: [],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export default class PokemonDetailComponent {
  private route = inject(ActivatedRoute);
  private api = inject(PokemonApiService);
  
  $pokemon: any = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('name')),
      filter(name => !!name),
      switchMap(name => this.api.getPokemonDetails(name!))
    ));
}
