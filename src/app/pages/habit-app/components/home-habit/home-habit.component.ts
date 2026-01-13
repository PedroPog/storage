import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Habit } from '../../Model/habit.interface';

@Component({
  selector: 'app-home-habit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './home-habit.component.html',
  styleUrl: './home-habit.component.scss'
})
export class HomeHabitComponent implements OnInit{
  habits: Habit[] = [];
  newHabitName: string = '';

  constructor(){}

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
