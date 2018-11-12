import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

interface Object {
  [key: string]: any;
}

// Generic API service for all basic CRUD operations.
// Provides generics for type checking.
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`);
  }

  getOne<T>(url: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}/${id}`);
  }

  post<T>(url: string, body: Object): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body);
  }

  put<T>(url: string, body: Object): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${url}/${body.id}`, body);
  }

  delete<T>(url: string, body: Object): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${url}/${body.id}`);
  }

  search<T>(url: string, params: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}/search`, { params });
  }

  onRequestError(res) {
    const error = {
      statusCode: res.status,
      statusText: res.statusText
    };

    if (res instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error);
    } else {
      // The backend returned an unsuccessful response code.
      console.log(
        `Backend returned code ${error.statusCode}, status text was: ${error.statusText}`
      );
    }
  }
}
