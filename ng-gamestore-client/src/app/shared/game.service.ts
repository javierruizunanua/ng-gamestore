import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gamesUrl = 'api/games';

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(this.gamesUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
          
  }

  //Obtener el id máximo
  getMaxGameId(): Observable<Game> {
    return this.http.get<Game[]>(this.gamesUrl)
      .pipe(
        map(data => Math.max.apply(Math, data.map(function(o) { return o.id; }))),
        catchError(this.handleError)

      );
  }

  //Obtener el juego por id
  getGameById(id: number): Observable<Game> {
    const url = `${this.gamesUrl}/${id}`;
    return this.http.get<Game>(url)
      .pipe(
        tap(data => console.log('getGame: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  //El CRUD

  createGame(game: Game): Observable<Game> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    game.id = null;

    return this.http.post<Game>(this.gamesUrl, game, {headers: headers})
      .pipe(
        tap(data => console.log('CreateGame: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteGame(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.gamesUrl}/${id}`;

    return this.http.delete<Game>(url, {headers: headers })
      .pipe(
        tap(data => console.log('DeleteGame: ' + id)),
        catchError(this.handleError)
      );
  }


  updateGame(game: Game): Observable<Game> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.gamesUrl}/${game.id}`;

    return this.http.put<Game>(url, game, { headers: headers })
      .pipe(
        tap(() => console.log('UpdateGame: ' + game.id)),
        map(() => game),
        catchError(this.handleError)
      )
  }



  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }





}
