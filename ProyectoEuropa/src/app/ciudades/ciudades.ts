import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../shared/components/header/header';
import { CommonModule } from '@angular/common'; 

interface Ciudad {
  nombre: string;
  precio: number;
  imagen: string;
  ubicacion: string;
  descripcion: string;
}

@Component({
  selector: 'app-ciudades',
  standalone: true,
  imports: [
    RouterModule,
    Header,
    CommonModule // componente para que incluya *ngFor, *ngIf, ngStyle, ngClass, ngSwitch
  ],
  templateUrl: './ciudades.html',
  styleUrls: ['./ciudades.css']
})

//Cada vuelta del bucle expone la variable ciudad que representa una ciudad individual
export class ciudades {

  listaCiudades: Ciudad[] = [ 
    {
      nombre: 'Barcelona',
      precio: 3000,
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757948013/barcelona_lcw9qz.jpg',
      ubicacion: 'Barcelona, España',
      descripcion: 'Explora la Vibrante Barcelona'
    },
    {
      nombre: 'Londres',
      precio: 6000,
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757952158/londres_ocaty6.jpg',
      ubicacion: 'Londres, Reino Unido',
      descripcion: 'Descubre la Majestuosa Londres'
    },
    {
      nombre: 'París',
      precio: 8000,
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757952198/paris1_iunjtl.avif',
      ubicacion: 'París, Francia',
      descripcion: 'Tour Romántico por París'
    },
    {
      nombre: 'Venecia',
      precio: 5000,
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757952221/venecia_z0bwqu.jpg',
      ubicacion: 'Venecia, Italia',
      descripcion: 'Paseo en Góndola por Venecia'
    },
    {
      nombre: 'Ámsterdam',
      precio: 7500,
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757947853/amsterdam_opihgf.jpg',
      ubicacion: 'Países Bajos, Europa Occidental',
      descripcion: 'Lo que pasó en Ámsterdam se queda en Ámsterdam'
    },
    {
      nombre: 'Estambul',
      precio: 4500,
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757951981/Estambul_vqjkxr.jpg',
      ubicacion: 'Estambul, Turquía',
      descripcion: 'Maravíllate con Estambul'
    },
    {
      nombre: 'Grecia',
      precio: 8000,
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757951784/grecia_y1vraa.jpg',
      ubicacion: 'República Helénica, Sureste de Europa',
      descripcion: 'Donde podrás encontrar la montaña más alta de Grecia'
    },
    {
      nombre: 'Ciudad del Cabo',
      precio: 7000,
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757950423/ciudadCabo_oe1snl.jpg',
      ubicacion: 'Ciudad del Cabo, Sudáfrica',
      descripcion: 'Aventuras en Ciudad del Cabo'
    },
    {
      nombre: 'Vaticano',
      precio: 4500,
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757950420/baticano1_woslg9.jpg',
      ubicacion: 'Italia, al oeste de Roma',
      descripcion: 'El Vaticano'
    }
  ];

  /**
   * Clasifica el precio en 'bajo' | 'medio' | 'alto' el metodo solo puede devolver uno de estos tres valores
   * tipo de retorno restringido
   */
  getCategoriaPrecio(precio: number): 'bajo' | 'medio' | 'alto' {
    if (precio < 5000) return 'bajo';
    if (precio >= 5000 && precio <= 7000) return 'medio';
    return 'alto';
  }
}
