import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';  // Importando o CommonModule

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],  // Adicionando o CommonModule aos imports
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieDetails(id).subscribe({
        next: (data) => (this.movie = data),
        error: (err) => (this.error = err)
      });
    }
  }
}
