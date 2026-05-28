import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [Header],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css']
})
export class Contacto {}
