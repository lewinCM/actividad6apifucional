import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private baseUrl:string='https://peticiones.online/api/users'

  constructor(private Http:HttpClient) { }

  getAll(pPage:number=1):Promise<any>{
    return lastValueFrom(this.Http.get<any>(`${this.baseUrl}?page=${pPage}`))
    // return lastValueFrom(this.Http.get<any>(`${this.baseUrl}/page=${pPage}`))
  }
}
