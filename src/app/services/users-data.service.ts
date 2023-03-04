import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { User } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private baseUrl: string = 'https://peticiones.online/api/users/'
  //  readonly baseUrl: string = 'https://peticiones.online/api/users/'

  constructor(private httpClient: HttpClient) { }
  // metodos GET solo lectura de la data
  getAll(pPage: number = 1): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?page=${pPage}`))
  }
  // metodos GET id
  getById(pId: string): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${pId}`))
  }

  // metodo POST
  create(pUser: User): Promise<User> {
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl, pUser))

  }
  // metodo PUT
  update(pUser: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}${pUser._id}`, pUser)
  }
  // metodo DELETE

  // delete(pId: number | undefined | string): Promise<any> {
  //   return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`))
  // }

  // deleteObs(pId: string): Observable<any> {
  //   return this.httpClient.delete<any>(`${this.baseUrl}${pId}`);
  // }

  /**
   * 
   * @param id trae los elementos de la api
   * @returns regresa su id eb string
   * 
   */
deleted(id:string):Observable<any>{
  return this.httpClient.delete<any>(`${this.baseUrl}${id}`)
}

}
