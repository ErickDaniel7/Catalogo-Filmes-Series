import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private favorites: any[] = [];

  constructor() {}

  // Metodo para pesquisar filmes
  searchMovies(title: string): Observable<any> {
    // Simulação de chamada HTTP retornando um observable
    return of({ Search: [{ Title: 'Avengers', Year: '2012', imdbID: 'tt0848228', Type: 'movie' }] });
  }

  // Metodo para obter detalhes do filme
  getMovieDetails(imdbID: string): Observable<any> {
    // Simulação de chamada HTTP retornando um observable
    return of({ Title: 'Avengers', Year: '2012', imdbID: 'tt0848228', Plot: 'Plot do filme' });
  }

  // Metodo para adicionar aos favoritos
  addToFavorites(movie: any): Observable<any[]> {
    this.favorites.push(movie);
    return of(this.favorites); // Retornando a lista atualizada de favoritos como Observable
  }

  // Metodo para remover dos favoritos
  removeFromFavorites(imdbID: string): Observable<any[]> {
    this.favorites = this.favorites.filter(movie => movie.imdbID !== imdbID);
    return of(this.favorites); // Retornando a lista atualizada de favoritos como Observable
  }

  // Metodo para obter todos os favoritos
  getFavorites(): Observable<any[]> {
    return of(this.favorites); // Retornando a lista de favoritos como Observable
  }
}
