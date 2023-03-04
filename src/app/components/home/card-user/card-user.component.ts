import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interfaces';
import { UsersDataService } from 'src/app/services/users-data.service';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent {
  @Input() myUser!: User
  /**
   * 
   * @param pId metodo para eliminar un user por medio de su id
   */

  constructor(
    private router: Router,
    private usersDataService: UsersDataService
  ) { }


  // async deleteUser(pId: number | undefined): Promise<void> {
  //   //consultar al servicio para hacer el borrado.
  //   if (pId !== undefined) {
  //     try {
  //       let response = await this.usersDataService.delete(pId);
  //       if (!response) {
  //         alert('Usuario borrado correctamente')
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

  // deleteUser(pId: string | undefined): void {
  //   const miObservable = {
  //     next: (response: any) => {
  //       if (!response) {
  //         alert('Usuarios borrado correctamente')
  //       }
  //     },
  //     error: (error: any) => {
  //       console.log(error)
  //     }
  //   }
  //   if (pId) {
  //     this.usersDataService.deleteObs(pId).subscribe(miObservable)
  //   }
  // }
/**
 * this.myUser._id!  resolvido
 */
  deleteUserdos() {
    this.usersDataService.deleted(this.myUser._id!).subscribe(response => {
      // console.log(response);
      alert(`El user ${this.myUser.first_name} ${this.myUser._id} fue Borrado`)
      

    })
  }


}
