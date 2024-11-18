import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_URL = 'http://www.omdbapi.com/';
  private API_KEY = 'bbddf143';

  constructor(private http: HttpClient) {}

  searchMovies(title: string): Observable<any> {
    return this.http.get(`${this.API_URL}?apikey=${this.API_KEY}&s=${title}`).pipe(
      catchError(this.handleError)
    );
  }

  getMovieDetails(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}?apikey=${this.API_KEY}&i=${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Algo deu errado! Tente novamente.');
  }
}
