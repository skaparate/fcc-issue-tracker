import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Issue } from './issue.model';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private apiUri = '/api/issues';

  constructor(private http: HttpClient) {}

  uri(path: string = '') {
    return `${this.apiUri}/${path}`;
  }

  list(projectSlug: string): Observable<Issue[]> {
    const uri = this.uri(projectSlug);
    return this.http
      .get<Issue[]>(uri)
      .pipe(catchError(this.handleError<Issue[]>('list', [])));
  }

  byId(projectSlug: string, id: string): Observable<Issue> {
    const uri = `${this.apiUri}/${projectSlug}/${id}`;
    return this.http.get<Issue>(uri).pipe(
      tap(_ => console.log(`Fetched issue id=${id}`)),
      catchError(this.handleError<Issue>(`byId id=${id}`))
    );
  }

  remove(projectSlug: string, id: string) {
    const uri = this.uri(`${projectSlug}/${id}`);
    return this.http
      .delete(uri)
      .pipe(
        tap(
          _ => console.log(`Deleting issue id=${id}`),
          catchError(this.handleError(`remove id=${id}`))
        )
      );
  }

  create(projectSlug: string, issue: Issue) {
    const uri = this.uri(projectSlug);
    return this.http
      .post<Issue>(uri, issue)
      .pipe(
        tap(
          _ => console.log(`Created new issue`),
          catchError(this.handleError(`create issue`))
        )
      );
  }

  update(projectSlug: string, issue: Issue): Observable<string> {
    const uri = this.uri(`${projectSlug}/${issue._id}`);
    return this.http.put<string>(uri, issue).pipe(
      tap(_ => console.log(`Update issue ${issue._id}`)),
      catchError(this.handleError<string>())
    );
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
