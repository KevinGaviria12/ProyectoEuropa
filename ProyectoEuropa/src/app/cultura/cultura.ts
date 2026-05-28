import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { CommonModule } from '@angular/common';

interface Plato {
  nombre: string;
  ciudad: string;
  descripcion: string;
  imagen: string;
  precio: number;
}

@Component({
  selector: 'app-cultura',
  standalone: true,
  imports: [
    Header, 
    CommonModule // componente para que incluya *ngFor, *ngIf, ngStyle, ngClass, ngSwitch
  ],
  templateUrl: './cultura.html',
  styleUrls: ['./cultura.css']
})
export class Cultura {
  listaPlatos: Plato[] = [
    {
      nombre: 'Crema Catalana',
      ciudad: 'Barcelona, España',
      descripcion: 'Una crema española con sabor a cítricos y canela, y un toque de azúcar caramelizado.',
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757951725/cremacatalanapostre_urx6nz.jpg',
      precio: 4500
    },
    {
      nombre: 'Fish and Chips',
      ciudad: 'Londres, Reino Unido',
      descripcion: 'Un rebozado crujiente y un pescado fresco, junto con patatas bien hechas.',
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757951780/FishAndChips_yewwcq.jpg',
      precio: 5500
    },
    {
      nombre: 'Ratatouille',
      ciudad: 'París, Francia',
      descripcion: 'Guiso de verduras elaborado con calabacines, berenjenas y pimientos.',
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757952201/Ratatouille_byulok.jpg',
      precio: 7000
    },
    {
      nombre: 'Alcachofas',
      ciudad: 'Venecia, Italia',
      descripcion: 'Las alcachofas son una flor comestible deliciosa.',
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1758150720/alcachofas1_vdwid2.jpg',
      precio: 4000
    },
    {
      nombre: 'Stamppot',
      ciudad: 'Ámsterdam',
      descripcion: 'Puré de patatas con verduras frito.',
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757952219/Stamppot_zzhzoo.jpg',
      precio: 8000
    },
    {
      nombre: 'Döner Kebab',
      ciudad: 'Estambul, Turquía',
      descripcion: 'Carne asada en un pincho vertical servida en pan pita.',
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757951744/d%C3%B6ner_kebab_a9cuek.jpg',
      precio: 5200
    },
    {
      nombre: 'Mousakas',
      ciudad: 'República Helénica',
      descripcion: 'Capas de carne de cordero, berenjena y salsa bechamel horneada.',
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757952198/Mousakas1_mzgar0.jpg',
      precio: 6500
    },
    {
      nombre: 'Pasta',
      ciudad: 'Roma, Italia',
      descripcion: 'Acompaña la pasta con un suppli relleno de mozzarella fundida.',
      imagen: 'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1757952202/pasta_xx7otc.jpg',
      precio: 8000
    }
  ];

  /**
   * Clasifica el precio en 'bajo' | 'medio' | 'alto' recibe el precio de un plato devuelve uno de los tres valores segun el rango
   */
  getCategoriaPrecio(precio: number): 'bajo' | 'medio' | 'alto' {
    if (precio < 5000) return 'bajo';
    if (precio >= 5000 && precio <= 7000) return 'medio';
    return 'alto';
  }
}
