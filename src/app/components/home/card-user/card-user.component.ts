import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interfaces';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent {
  @Input() myUser!: User

}
