import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../shared/components/header/header';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule, RouterModule, Header],
  templateUrl: './nosotros.html',
  styleUrls: ['./nosotros.css']
})
export class Nosotros {}
