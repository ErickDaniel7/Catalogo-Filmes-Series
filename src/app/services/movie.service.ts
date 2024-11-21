import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'bbddf143';  // Substitua pela sua chave da API OMDb
  private apiUrl = 'https://www.omdbapi.com/';

  constructor(private http: HttpClient) {}

  getMovieDetails(imdbID: string): Observable<any> {
    const url = `${this.apiUrl}?i=${imdbID}&apikey=${this.apiKey}&plot=full`; // Adicionado &plot=full
    return this.http.get<any>(url);
  }

  searchMovies(searchTitle: string): Observable<any> {
    const url = `${this.apiUrl}?s=${searchTitle}&apikey=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
