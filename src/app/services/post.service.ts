import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { post } from '../obj/post';

@Injectable({
  providedIn: 'root'
})
export class PostService /* da cambiare */ {
  posts: post[] = [];

  constructor(private http: HttpClient) { 
  }
  
  get(url: string): Observable<post[]>{
    return this.http.get<post[]>(url)
  }

  randomNum(): number{
    return Math.floor(Math.random() * (100 + 1));
  }
}
