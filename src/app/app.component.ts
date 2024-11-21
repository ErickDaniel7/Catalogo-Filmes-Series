import { Component, OnInit, DoCheck } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MovieListComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  showFavorites: boolean = false; // Controla a exibição da lista de favoritos
  favorites: any[] = []; // Lista de favoritos

  constructor() {}

  ngOnInit() {
    this.loadFavorites();
  }

  ngDoCheck() {
    // Verifica se a lista de favoritos foi alterada e, se sim, força a atualização
    const storedFavorites = localStorage.getItem('favorites');
    const newFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (JSON.stringify(this.favorites) !== JSON.stringify(newFavorites)) {
      this.favorites = newFavorites;
    }
  }

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
  }

  loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  addFavorite(movie: any) {
    if (!this.favorites.some(fav => fav.imdbID === movie.imdbID)) {
      this.favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

  removeFavorite(movie: any) {
    this.favorites = this.favorites.filter(fav => fav.imdbID !== movie.imdbID);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
