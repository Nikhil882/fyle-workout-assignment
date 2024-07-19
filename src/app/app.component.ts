import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './form/form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { CommonModule } from '@angular/common';
import { Workout } from './model/workout.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormComponent, WorkoutListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workout-task';
  workouts: Workout[] = [];

  onWorkoutAdded(workout: Workout) {
    this.workouts.push(workout);
  }
}
