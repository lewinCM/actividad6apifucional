import { User } from './../../interfaces/user.interfaces';
import { Component, OnInit } from '@angular/core';
import { UsersDataService } from 'src/app/services/users-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  arrUsers: User[] = []
  currentPage: number = 1;
  totalPages: number = 1;


  constructor(private usersDataService: UsersDataService) { }
  ngOnInit(): void {
    this.gotoPage()


  }
  async gotoPage(pNum: number = 1): Promise<void> {
    try {
      let response = await this.usersDataService.getAll(pNum)
       console.log(response);
      this.currentPage=response.page
      this.totalPages = response.total_pages;

      this.arrUsers = response.results
   
     

    } catch (error) {
      alert('hay un error en la lectura de los datos de la api');

    }

  }

}
