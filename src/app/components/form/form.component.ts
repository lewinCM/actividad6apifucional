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
    this.activatedRoute.params.subscribe(async (params: any) => {
      // console.log(params);

      let id: string = (params.userid)
      if (id) {
        this.title = 'Actualizar usuario'
        const response = await this.usersDataService.getById(id)
        const user: User = response
        console.log(user);

        // haciendo la nueva instancia
        this.userForm = new FormGroup({
          // campo oculto
          id: new FormControl(id, []),
          // campos desde la User
          first_name: new FormControl(user?.first_name, [Validators.required]),
          last_name: new FormControl(user?.last_name, [Validators.required]),
          email: new FormControl(user?.email, [Validators.required]),

          avatar: new FormControl(user?.image, [Validators.required]),
        }, [])


      }


    })
  }

  /**
   * @async refiere que espera que los datos sean traidos completos
   * este caso espera que el form sea llenado para actualizar valores
   */

  async getDataForm() {
    let user = this.userForm.value;
    // console.log(user);
    /**
     * condicional para actulizar o registrar un user por medio de su id
     */
    if (user.id) {
      let resp = await this.usersDataService.create(user)

      this.msg = (`el usuario ${resp.first_name} y su id ${resp.id} se guardado correctamente`)
      // this.router.navigate(['/home'])
      this.type='success'
    } else {
      // si no es para actualizar, debes registralo
      try {
        let user: User = this.userForm.value
        let res = await this.usersDataService.create(user)
        // console.log(res);
        if (res.id) {
          this.msg = (`el usuario ${res.first_name} con id ${res.id} se creo correctamente`)
          // this.router.navigate(['/home'])
        }

      } catch (error) {
        console.log(error, ' hubo un error en guardar sus datos, intenlo mas tarde');

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

