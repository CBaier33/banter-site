import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class BanterProcessorService {
  private apiUrl = 'https://api.banter-lang.org/run';

  constructor(private http: HttpClient) {}

  processText(inputText: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = { code: inputText };

    return this.http.post(this.apiUrl, body, { headers });
  }
}

