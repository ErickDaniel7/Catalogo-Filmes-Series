import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  searchTitle: string = ''; // Título da busca
  movies: any[] = []; // Lista de filmes
  error: string = ''; // Mensagem de erro
  favorites: any[] = []; // Lista de favoritos
  hoveredMovie: any | null = null; // Filme atual para exibição de detalhes

  constructor(
    private movieService: MovieService,
    private router: Router,
    private cdr: ChangeDetectorRef // ChangeDetectorRef para detecção manual de mudanças
  ) {
  }

  ngOnInit() {
    this.loadFavorites();
  }

  search() {
    if (!this.searchTitle.trim()) {
      this.error = 'Por favor, digite um título para buscar.';
      return;
    }

    this.movieService.searchMovies(this.searchTitle).subscribe({
      next: (data: any) => {
        if (data.Response === 'True') {
          this.movies = data.Search.map((movie: any) => ({
            ...movie,
            isFavorite: this.isFavorite(movie) // Adiciona a propriedade isFavorite
          }));
          this.error = '';
        } else {
          this.movies = [];
          this.error = data.Error;
        }
      },
      error: (err) => {
        this.error = 'Erro ao buscar filmes. Tente novamente.';
        console.error(err);
      }
    });
  }

  toggleFavorite(movie: any) {
    const index = this.favorites.findIndex((fav) => fav.imdbID === movie.imdbID);
    if (index > -1) {
      this.favorites.splice(index, 1); // Remove o filme dos favoritos
    } else {
      this.favorites.push(movie); // Adiciona o filme aos favoritos
    }
    this.saveFavorites();

    // Atualiza o estado do filme na lista
    movie.isFavorite = this.isFavorite(movie);

    // Atualiza diretamente a lista de filmes para refletir a mudança
    this.movies = this.movies.map((m) =>
      m.imdbID === movie.imdbID ? { ...m, isFavorite: movie.isFavorite } : m
    );

    // Força a detecção de mudanças
    this.cdr.detectChanges();
  }

  isFavorite(movie: any): boolean {
    return this.favorites.some((fav) => fav.imdbID === movie.imdbID);
  }

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  showDetails(movie: any): void {
    this.movieService.getMovieDetails(movie.imdbID).subscribe({
      next: (details) => {
        this.hoveredMovie = details; // Atualiza o filme com os detalhes completos
        const container = document.querySelector('.container');
        if (container) {
          container.classList.add('details-active'); // Ativa o embasamento
        }
      },
      error: (err) => {
        console.error('Erro ao buscar detalhes do filme:', err);
      }
    });
  }

  hideDetails(): void {
    // Apenas esconde se o mouse não estiver sobre o popup
    const popup = document.querySelector('.details-popup');
    if (!popup || !popup.matches(':hover')) {
      this.hoveredMovie = null;
      const container = document.querySelector('.container');
      if (container) {
        container.classList.remove('details-active'); // Remove o embasamento
      }
    }
  }

  keepDetails(): void {
    // Metodo para manter o popup visível (não faz alterações no estado)
  }
}

