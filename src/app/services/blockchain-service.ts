import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Block } from '../models/block';

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  private apiUrl = `${environment.apiUrl}${environment.blockchainPrefix}`;

  constructor(private readonly http: HttpClient) {}

  getBlocks(): Observable<Block[]> {
    return this.http.get<Block[]>(this.apiUrl);
  }
}
