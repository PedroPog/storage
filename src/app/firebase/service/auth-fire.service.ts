import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user,
  signOut,
  User
} from '@angular/fire/auth'; // Recomendo usar o AngularFire para facilitar
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthFireService {

  private auth: Auth = inject(Auth);

  user$ = user(this.auth);

  async signUp(email: string, pass: string, name: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, pass);

      await updateProfile(userCredential.user, {
        displayName: name
      });

      return userCredential.user;
    } catch (error: any) {
      throw new Error(this.handleError(error));
    }
  }

  async login(email: string, pass: string): Promise<User> {
    try {
      const res = await signInWithEmailAndPassword(this.auth, email, pass);
      return res.user;
    } catch (error: any) {
      throw new Error(this.handleError(error));
    }
  }

  logout() {
    return signOut(this.auth);
  }

  private handleError(error: any): string {
    switch (error?.code) {
      case 'auth/email-already-in-use':
        return 'Este e-mail já está cadastrado.';
      case 'auth/invalid-email':
        return 'Formato de e-mail inválido.';
      case 'auth/weak-password':
        return 'A senha deve ter no mínimo 6 caracteres.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
      case 'auth/invalid-login-credentials':
        return 'E-mail ou senha incorretos.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas sem sucesso. Tente novamente mais tarde.';
      case 'auth/network-request-failed':
        return 'Falha na conexão de rede. Verifique sua internet.';
      default:
        return error?.message || 'Ocorreu um erro inesperado ao autenticar.';
    }
  }
}
