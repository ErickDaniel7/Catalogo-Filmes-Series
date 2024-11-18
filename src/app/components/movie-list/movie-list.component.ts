import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Adicionar CommonModule
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,  // Adicionar CommonModule
    FormsModule,
    RouterLink
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
  searchTitle: string = ''; // Armazena o título pesquisado
  movies: any[] = []; // Lista de filmes
  error: string = ''; // Mensagem de erro

  constructor(private movieService: MovieService) {}

  search() {
    if (!this.searchTitle.trim()) {
      this.error = 'Por favor, digite um título para buscar.';
      return;
    }

    this.movieService.searchMovies(this.searchTitle).subscribe({
      next: (response) => {
        this.movies = response.Search || [];
        this.error = this.movies.length ? '' : 'Nenhum filme encontrado.';
      },
      error: (err) => (this.error = 'Erro ao buscar filmes.'),
    });
  }
}
