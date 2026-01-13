import { Routes } from '@angular/router';
import { HabitAppComponent } from './pages/habit-app/habit-app.component';
import { HomeHabitComponent } from './pages/habit-app/components/home-habit/home-habit.component';
import { AuthAppComponent } from './pages/auth-app/auth-app.component';
import { CadastroAuthComponent } from './pages/auth-app/components/cadastro-auth/cadastro-auth.component';
import { LoginAuthComponent } from './pages/auth-app/components/login-auth/login-auth.component';

export const routes: Routes = [
  {path:'',redirectTo:'v1',pathMatch:'full'},
  {
    path: 'habit',
    component: HabitAppComponent,
    children: [{ path: '', component: HomeHabitComponent }],
  },
  {
    path: 'v1',
    component: AuthAppComponent,
    children: [
      {path:'',redirectTo:'login',pathMatch:'full'},
      { path: 'login', component: LoginAuthComponent },
      { path: 'cadastro', component: CadastroAuthComponent },
    ],
  },
];
