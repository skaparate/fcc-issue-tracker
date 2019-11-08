import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Issue } from './issue.model';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private apiUri = '/api/issues';

  constructor(private http: HttpClient) {}

  list(projectSlug: string): Observable<Issue[]> {
    const uri = `${this.apiUri}/${projectSlug}`;
    return this.http
      .get<Issue[]>(uri)
      .pipe(catchError(this.handleError<Issue[]>('list', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
