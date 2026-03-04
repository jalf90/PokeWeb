import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PAGINATION_LIMIT } from '../../../shared/config/pagination';
import { IPokemonListItem } from '../models/pokemon-list-item.model';
import { IPagination, Pagination } from './../../../shared/models/pagination.model';
import { POKEMON_API_BASE_URL } from './pokemon-api-base-url.token';

interface IListResult<T> {
  count: number;
  previous: string | null;
  next: string | null;
  results: T[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private http = inject(HttpClient);
  private baseUrl = inject(POKEMON_API_BASE_URL);

  getPokemonList(pageNumber = 0): Observable<IPagination<IPokemonListItem>> {
    const offset = pageNumber * PAGINATION_LIMIT;

    return this.http.get<IListResult<IPokemonListItem>>(`${this.baseUrl}/pokemon?limit=${PAGINATION_LIMIT}&offset=${offset}`)
    .pipe(
      map((res => {
        return new Pagination<IPokemonListItem>({
          count: res.count,
          next: res.next,
          previous: res.previous,
          pageSize: PAGINATION_LIMIT,
          items: res.results
        });
      }))
    );
  }

  getPokemonDetails(name: string) {
    return this.http.get(`${this.baseUrl}/pokemon/${name}`);
  }
}
