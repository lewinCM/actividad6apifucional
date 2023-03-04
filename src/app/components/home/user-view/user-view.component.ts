import { UsersDataService } from './../../../services/users-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interfaces';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  // propiedad de comunicacion bidiricional
  user: User | any;
  @Input() myUser!: User

  constructor(
    private usersDataService: UsersDataService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    // capturando user desde la ruta
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: string = (params.userid)
      // console.log(params);
      // console.log(id);
      let response: any = await this.usersDataService.getById(id)

      this.user=response
      // console.log(response);
    })


    

  }
  
}
