import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../shared/components/header/header';

@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [CommonModule, RouterModule, Header],
  templateUrl: './ayuda.html',
  styleUrls: ['./ayuda.css']
})
export class Ayuda {}
