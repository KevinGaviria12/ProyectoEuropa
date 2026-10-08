import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  protected readonly backgroundImages = [
    'https://res.cloudinary.com/dsdp1r1uh/image/upload/v1774970546/imagenAdmin_spuhfs.jpg'
  ];

  protected readonly username = signal('');
  protected readonly password = signal('');
  protected readonly message = signal('');
  protected readonly loading = signal(false);
  protected readonly showPassword = signal(false);

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  login(): void {
    this.message.set('');

    if (!this.username() || !this.password()) {
      this.message.set('Ingresa usuario y contraseña.');
      return;
    }

    this.loading.set(true);
    this.authService.login(this.username().trim(), this.password()).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/home']);
      },
      error: (error: { status?: number }) => {
        this.loading.set(false);
        const status = error.status ?? 0;
        if (status === 0) {
          this.message.set('No se pudo conectar con el servidor local.');
        } else if (status >= 500) {
          this.message.set('El servidor no puede conectarse a MySQL. Revisa backend/.env.');
        } else {
          this.message.set('Usuario o contraseña incorrectos.');
        }
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((visible) => !visible);
  }
}
