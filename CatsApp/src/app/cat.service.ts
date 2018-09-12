import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Cat } from './cat';
import { MessagesService } from './messages.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CatService {

  private CatesUrl = 'api/Cates';  // URL to web api

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService) { }

  /** GET Cates from the server */
  getCats (): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.CatesUrl)
      .pipe(
        tap(Cates => this.log('fetched Cates')),
        catchError(this.handleError('getCates', []))
      );
  }

  /** GET Cat by id. Return `undefined` when id not found */
  getCatNo404<Data>(id: number): Observable<Cat> {
    const url = `${this.CatesUrl}/?id=${id}`;
    return this.http.get<Cat[]>(url)
      .pipe(
        map(Cates => Cates[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Cat id=${id}`);
        }),
        catchError(this.handleError<Cat>(`getCat id=${id}`))
      );
  }

  /** GET Cat by id. Will 404 if id not found */
  getCat(id: number): Observable<Cat> {
    const url = `${this.CatesUrl}/${id}`;
    return this.http.get<Cat>(url).pipe(
      tap(_ => this.log(`fetched Cat id=${id}`)),
      catchError(this.handleError<Cat>(`getCat id=${id}`))
    );
  }

  /* GET Cates whose name contains search term */
  searchCates(term: string): Observable<Cat[]> {
    if (!term.trim()) {
      // if not search term, return empty Cat array.
      return of([]);
    }
    return this.http.get<Cat[]>(`${this.CatesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found Cates matching "${term}"`)),
      catchError(this.handleError<Cat[]>('searchCates', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Cat to the server */
  addCat (Cat: Cat): Observable<Cat> {
    return this.http.post<Cat>(this.CatesUrl, Cat, httpOptions).pipe(
      tap((Cat: Cat) => this.log(`added Cat w/ id=${Cat.id}`)),
      catchError(this.handleError<Cat>('addCat'))
    );
  }

  /** DELETE: delete the Cat from the server */
  deleteCat (Cat: Cat | number): Observable<Cat> {
    const id = typeof Cat === 'number' ? Cat : Cat.id;
    const url = `${this.CatesUrl}/${id}`;

    return this.http.delete<Cat>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Cat id=${id}`)),
      catchError(this.handleError<Cat>('deleteCat'))
    );
  }

  /** PUT: update the Cat on the server */
  updateCat (Cat: Cat): Observable<any> {
    return this.http.put(this.CatesUrl, Cat, httpOptions).pipe(
      tap(_ => this.log(`updated Cat id=${Cat.id}`)),
      catchError(this.handleError<any>('updateCat'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a CatService message with the MessageService */
  private log(message: string) {
    this.messagesService.add(`CatService: ${message}`);
  }
}


