import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interfaces';
import {UsersDataService} from '../../services/users-data.service'
@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent {
  arrUsers: User[] = []
 constructor( private usersDataService:UsersDataService ){}
 @Input() async gotoPage( pNum:number){
    try {
      let response = await this.usersDataService.getAll(pNum)
      console.log(response);
      this.arrUsers = response.results
      
    } catch (error) {
      console.log(error);
      
    }
  
  }
}
