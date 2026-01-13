import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Habit } from './Model/habit.interface';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  habits: Habit[] = [];
  newHabitName: string = '';

  ngOnInit() {
    const saved = localStorage.getItem('habits');
    if (saved) this.habits = JSON.parse(saved);
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
