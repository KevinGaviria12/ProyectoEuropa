import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Header } from '../shared/components/header/header';

@Component({
  selector: 'app-login',                
  standalone: true,                      
  imports: [FormsModule, CommonModule, RouterModule, Header], 
  templateUrl: './login.html',           
  styleUrls: ['./login.css']             
})
export class Login {

  // Señal que maneja el modo actual: 'login' o 'register'
  // La plantilla reaccionará automáticamente a cambios de esta señal
  protected readonly mode = signal<'login' | 'register'>('login');

  // Señales reactivas para los campos del formulario de login
  protected readonly username = signal('');      // Campo usuario login
  protected readonly password = signal('');      // Campo contraseña login

  // Señales reactivas para los campos del formulario de registro
  protected readonly regUser = signal('');       // Campo usuario registro
  protected readonly regPassword = signal('');   // Campo contraseña registro

  // Señal para mostrar mensajes de error o éxito en la interfaz
  protected readonly message = signal('');

  // Lista de tips que se muestran dinámicamente en la plantilla con @for
  protected readonly tips = [
    'Usa una contraseña segura',
    'No compartas tus datos',
    'Recuerda cerrar sesión en computadores públicos'
  ];

  constructor(private router: Router) {} // Inyección de Router para navegación

  /**
   * Alterna entre modo 'login' y 'register'
   * @param m Opcional: fuerza un modo específico
   */
  toggleMode(m?: 'login' | 'register') {
    this.message.set(''); // Limpiamos cualquier mensaje previo

    // SWITCH para decidir el modo a establecer
    switch (m) {
      case 'login':
        this.mode.set('login'); // Fuerza modo login
        break;
      case 'register':
        this.mode.set('register'); // Fuerza modo registro
        break;
      default:
        // Si no hay parámetro, alternamos el modo actual
        this.mode.set(this.mode() === 'login' ? 'register' : 'login');
        break;
    }
  }

  /**
   * Función para registrar un nuevo usuario
   */
  register() {
    this.message.set(''); // Limpiamos mensajes

    // Validación: campos vacíos
    if (!this.regUser() || !this.regPassword()) {
      this.message.set('Por favor completa usuario y contraseña.');
      return;
    }

    // Obtenemos los usuarios existentes desde localStorage
    const raw = localStorage.getItem('pe_users');
    const users = raw ? JSON.parse(raw) : {};

    // Validación: usuario ya existe
    if (users[this.regUser()]) {
      this.message.set('Ese usuario ya existe. Elige otro.');
      return;
    }

    // Guardamos nuevo usuario en localStorage
    users[this.regUser()] = this.regPassword();
    localStorage.setItem('pe_users', JSON.stringify(users));

    // Mensaje de éxito
    this.message.set('Registro correcto. Ahora inicia sesión.');

    // Limpiamos campos de registro y cambiamos a modo login
    this.regUser.set('');
    this.regPassword.set('');
    this.mode.set('login');
  }

  /**
   * Función para iniciar sesión
   */
  login() {
    this.message.set(''); // Limpiamos mensajes

    // Validación: campos vacíos
    if (!this.username() || !this.password()) {
      this.message.set('Ingresa usuario y contraseña.');
      return;
    }

    // Acceso rápido para admin (solo ejemplo)
    if (this.username().toLowerCase() === 'admin' && this.password() === '1234') {
      this.router.navigate(['/home']); // Redirige a home
      return;
    }

    // Obtenemos usuarios guardados en localStorage
    const raw = localStorage.getItem('pe_users');
    const users = raw ? JSON.parse(raw) : {};

    // Recorremos los usuarios guardados para buscar coincidencia
    for (const user in users) {
      if (user === this.username() && users[user] === this.password()) {
        this.router.navigate(['/home']); // Login correcto
        return;
      }
    }

    // Si no coincide ningún usuario, mostramos error
    this.message.set('Credenciales incorrectas.');
  }
}
