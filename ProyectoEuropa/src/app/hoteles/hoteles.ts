import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hoteles',
  standalone: true,
  imports: [
    Header, 
    RouterModule,
    CommonModule // componente para que incluya *ngFor, *ngIf, ngStyle, ngClass, ngSwitch
  ],
  templateUrl: './hoteles.html',
  styleUrls: ['./hoteles.css']
})
export class Hoteles {
  listaHoteles = [
    {
      name: 'Hotel Mandarin Oriental, Barcelona',
      location: 'Barcelona, España',
      price: 800,
      currency: 'EUR',
      image: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757952123/HotelMandarin_myyf6n.webp'
    },
    {
      name: 'The London Suites Hotel',
      location: 'Londres, Reino Unido',
      price: 600,
      currency: 'GBP',
      image: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757952060/HotelLondon_r3g5if.jpg'
    },
    {
      name: 'Hotel Lutetia',
      location: 'París, Francia',
      price: 1000,
      currency: 'EUR',
      image: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757952170/lutetia-paris_aqgctn.jpg'
    },
    {
      name: 'Hotel Danieli, Venice',
      location: 'Venecia, Italia',
      price: 800,
      currency: 'EUR',
      image: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757951878/HotelDanieli_c0gzik.jpg'
    },
    {
      name: 'Hilton Ámsterdam',
      location: 'Ámsterdam, Países Bajos',
      price: 1000,
      currency: 'EUR',
      image: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757951875/Hiltonamsterdam_vhutwh.jpg'
    },
    {
      name: 'AJWA Sultanahmet',
      location: 'Estambul, Turquía',
      price: 900,
      currency: 'EUR',
      image: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757952024/HotelEstambul_o7j2dq.jpg'
    },
    {
      name: 'Hotel Grande Bretagne',
      location: 'Atenas, Grecia',
      price: 3100,
      currency: 'EUR',
      image: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757952047/HotelGrecia1_q9znkk.jpg'
    },
    {
      name: 'Mount Nelson, A Belmond Hotel',
      location: 'Ciudad del Cabo, Sudáfrica',
      price: 2100,
      currency: 'EUR',
      image: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757950422/belmon_h92m1f.jpg'
    },
    {
      name: 'Hotel Amalia',
      location: 'Vaticano, Roma',
      price: 2500,
      currency: 'EUR',
      image: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1758160904/amalia1_am23cl.jpg'
    }
  ];

  /** Clasifica el precio en 'bajo' | 'medio' | 'alto' es el tipo de retorno restringido */
  getCategoriaPrecio(precio: number): 'bajo' | 'medio' | 'alto' {
    if (precio < 1000) return 'bajo';
    if (precio >= 1000 && precio <= 2000) return 'medio';
    return 'alto';
  }
}
