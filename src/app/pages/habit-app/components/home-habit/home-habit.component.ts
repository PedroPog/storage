import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Habit } from '../../Model/habit.interface';
import { AuthFireService } from '../../../../firebase/service/auth-fire.service';

@Component({
  selector: 'app-home-habit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home-habit.component.html',
  styleUrl: './home-habit.component.scss'
})
export class HomeHabitComponent implements OnInit {
  private authService = inject(AuthFireService);
  private router = inject(Router);

  user$ = this.authService.user$;
  habits: Habit[] = [];
  newHabitName: string = '';

  ngOnInit() {
    const saved = localStorage.getItem('habits');
    if (saved) {
      try {
        this.habits = JSON.parse(saved);
      } catch {
        this.habits = [];
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      await this.router.navigate(['/v1/login']);
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  }


  addHabit() {
    if (this.newHabitName.trim()) {
      const newHabit: Habit = {
        id: Date.now(),
        name: this.newHabitName,
        completed: false,
      };
      this.habits.push(newHabit);
      this.newHabitName = '';
      this.save();
    }
  }

  toggleHabit(habit: Habit) {
    habit.completed = !habit.completed;
    this.save();
  }

  deleteHabit(id: number) {
    this.habits = this.habits.filter((h) => h.id !== id);
    this.save();
  }

  private save() {
    localStorage.setItem('habits', JSON.stringify(this.habits));
  }
}
