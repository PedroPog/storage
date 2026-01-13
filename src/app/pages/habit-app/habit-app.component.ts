import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-habit-app',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './habit-app.component.html',
  styleUrl: './habit-app.component.scss'
})
export class HabitAppComponent {

}
