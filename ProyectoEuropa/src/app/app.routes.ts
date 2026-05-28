import { Routes } from '@angular/router';
import { ciudades } from './ciudades/ciudades';
import { Home } from './home/home';
import { Hoteles } from './hoteles/hoteles';
import { Contacto } from './contacto/contacto';
import { Cultura } from './cultura/cultura';
import { Login } from './login/login';
import { Ayuda } from './ayuda/ayuda';
import { Nosotros } from './nosotros/nosotros';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'ciudades', component: ciudades },
  { path: 'hoteles', component: Hoteles },
  { path: 'contacto', component: Contacto },
  { path: 'cultura', component: Cultura },
  { path: 'login', component: Login },
  { path: 'ayuda', component: Ayuda },
  { path: 'nosotros', component: Nosotros },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
