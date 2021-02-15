import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConstantPool } from '@angular/compiler';

const myOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  responseType: 'text' as 'json'
};
export const api = "http://106.14.58.177";

export interface articleLink {
  title: string,
  tags: string[],
  date: string,
  show: boolean;
}

export interface articleData {
  article: articleLink,
  data: string
}

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private myConnect: HttpClient) { }

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

  showList(): Observable<articleLink[]> {
    return this.myConnect.get<articleLink[]>(api + '/list.json')
      .pipe(
        retry(3), // retry a failed request up to 3 times
        //catchError(this.handleError) // then handle the error
      )
  }

  getArticle(name: string): Observable<string> {
    console.log(name);
    return this.myConnect.get<string>(api + '/' + name, myOptions)
      .pipe(
        retry(3),
      )
  }

}
