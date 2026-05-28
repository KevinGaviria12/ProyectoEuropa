import { Component, signal } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  //  Señal con un mensaje dinámico
  protected readonly mensaje = signal('Bienvenido a Proyecto Europa');
}
