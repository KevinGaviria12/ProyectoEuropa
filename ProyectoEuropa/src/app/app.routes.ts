import { Routes } from '@angular/router';
import { ciudades } from './ciudades/ciudades';
import { Home } from './home/home';
import { Hoteles } from './hoteles/hoteles';
import { Contacto } from './contacto/contacto';
import { Cultura } from './cultura/cultura';
import { Login } from './login/login';
import { Ayuda } from './ayuda/ayuda';
import { Nosotros } from './nosotros/nosotros';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'ciudades', component: ciudades, canActivate: [authGuard] },
  { path: 'hoteles', component: Hoteles, canActivate: [authGuard] },
  { path: 'contacto', component: Contacto, canActivate: [authGuard] },
  { path: 'cultura', component: Cultura, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'ayuda', component: Ayuda, canActivate: [authGuard] },
  { path: 'nosotros', component: Nosotros, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
