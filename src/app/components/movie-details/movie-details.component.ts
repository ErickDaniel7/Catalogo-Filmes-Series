import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: any | null = null;  // Armazena detalhes do filme
  error: string = '';        // Mensagem de erro
  isLoading: boolean = false; // Estado de carregamento
  imdbID: string = '';       // ID do filme

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    // Obtém o ID do filme da rota
    this.imdbID = this.route.snapshot.paramMap.get('id') || '';

    // Busca os detalhes do filme caso o ID exista
    if (this.imdbID) {
      this.isLoading = true; // Indica que está carregando
      this.movieService.getMovieDetails(this.imdbID).subscribe({
        next: (data: any) => {
          if (data.Response === 'True') {
            this.movie = data;
            this.error = '';
          } else {
            this.movie = null;
            this.error = data.Error;
          }
          this.isLoading = false; // Finaliza o carregamento
        },
        error: (err) => {
          this.error = 'Erro ao carregar detalhes do filme.';
          console.error(err);
          this.isLoading = false; // Finaliza o carregamento em caso de erro
        }
      });
    }
  }
}
