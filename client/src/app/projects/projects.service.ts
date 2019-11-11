import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl: string = '/api/projects';

  constructor(private http: HttpClient) {}

  list(): Observable<Project[]> {
    return this.http
      .get<Project[]>(this.apiUrl)
      .pipe(catchError(this.handleError<Project[]>('list', [])));
  }

  byId(id: string): Observable<Project> {
    const uri = `${this.apiUrl}/${id}`;
    console.debug('Retrieving project by id:', uri);
    return this.http.get<Project>(uri).pipe(
      tap(_ => console.log(`Fetched project id=${id}`)),
      catchError(this.handleError<Project>(`byId id=${id}`))
    );
  }

  bySlug(slug: string): Observable<Project> {
    const uri = `${this.apiUrl}/s/${slug}`;
    console.debug('Retrieving project by slug:', uri);
    return this.http.get<Project>(uri).pipe(
      tap(_ => console.log(`Fetched project by slug=${slug}`)),
      catchError(this.handleError<Project>(`bySlug slug=${slug}`))
    );
  }

  update(project: Project): Observable<string> {
    return this.http
      .put<string>(this.apiUrl, project)
      .pipe(
        tap(
          _ => console.log(`Updated project id=${project._id}`),
          catchError(this.handleError<string>(`update id=${project._id}`))
        )
      );
  }

  create(project: Project): Observable<Project> {
    return this.http
      .post<Project>(this.apiUrl, project)
      .pipe(
        tap(
          _ => console.log(`Created project id=${project._id}`),
          catchError(this.handleError<Project>(`create project`))
        )
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
