import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interfaces';
import { UsersDataService } from 'src/app/services/users-data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  userForm: FormGroup;
  title: string = 'Registro Usuario '
  msg: string = "";
  type: string = "";
  /**
   * @param router nos permite hacer navegacion entre component
   * @param usersDataService consume la api y logica general
   * @param activatedRoute nos sirve para capturar la ruta donde el user esta
   */
  constructor(
    private router: Router,
    private usersDataService: UsersDataService,
    private activatedRoute: ActivatedRoute
  ) {
    // validaciones
    this.userForm = new FormGroup({
      first_name: new FormControl('',
        [Validators.required,
        Validators.minLength(3)
        ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(6)

      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      avatar: new FormControl('', []),
    }, [])
  }
  ngOnInit(): void {
  this.activatedRoute.params.subscribe(async(params:any)=>{
    // console.log(params);
    
    let id:string=  (params.userid)
    if(id){
      this.title='Actualizar usuario'
      const response= await this.usersDataService.getById(id)
      const user:User=response
      console.log(user);

      // haciendo la nueva instancia
      this.userForm = new FormGroup({
        // campo oculto
        id:new FormControl(id,[]),
        // campos desde la User
        first_name: new FormControl(user.first_name,[]),
        last_name: new FormControl(user.last_name, []),
        email: new FormControl(user.email, []),

        avatar: new FormControl(user, []),
      }, [])


    }
    

  })


    // this.activatedRoute.params.subscribe(async (params: any) => {
    //   console.log(params); //esta son las coleccion de matricex basado a la Router
    //   let id = (params.userid)
    //   if (id) {
    //     //actualizar los campos pidiendolos previamente a la bd
    //     this.title = 'Actualizar Usuario'
    //     // consultado los user de la api
    //     const response = await this.usersDataService.getById(id);
    //     const user: User = response.results;
    //     // const user1: User = response.data;

    //     this.userForm = new FormGroup({
    //       id: new FormControl(id, []),
    //       first_name: new FormControl(user?.first_name, []),
    //       last_name: new FormControl(user?.last_name, []),
    //       email: new FormControl(user?.email, []),
    //       avatar: new FormControl(user?.image, []),
    //     }, []);

    //   }
    // })



  }















  async getDataForm() {
    let user = this.userForm.value
    if (user.id) {
      //Actualizando
      this.usersDataService.update(user).subscribe((data: User) => {
        if (data.updatedat) {
          this.msg = `usuario ${data.first_name} con id ${data._id} se actualizado correctamente`
          this.type = 'success'
          //this.router.navigate(['/home']);
        }
      });

    } else {
      //Registrando
      try {
        let response = await this.usersDataService.create(user)
        if (response._id) {
          this.msg = `usuario ${response.first_name} con id ${response._id} se creado correctamente`;
          this.type = 'success'
          //this.router.navigate(['/home']);
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  }


  checkControl(pControlName: string, pError: string): boolean {
    if (this.userForm.get(pControlName)?.hasError(pError) && this.userForm.get(pControlName)?.touched) {
      return true
    }
    return false
  }

}

