import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent   {
  @Input() msg: string = "";
  notificacion: string = "";
  visible: boolean = false;
  @Input() type: string = "";

  constructor( private router:Router){}
/**
 * ngDoCheck() si msg es distinto a vacio 
 */
  ngDoCheck(): void {
    if (this.msg !== "") {
      this.notificacion = this.msg
      this.visible = true;
    }
  }
  cerrar() {
    this.notificacion = "";
    this.visible = false;
    this.router.navigate(['/home']);
  }
 
}
