import { Injectable } from '@angular/core';
import { Workout } from './model/workout.model'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workouts: Workout[] = [];

  addWorkout(workout: Workout): void {
    this.workouts.push(workout);
  }

  getWorkouts(): Workout[] {
    return this.workouts;
  }

  clearWorkouts(): void {
    this.workouts = [];
  }
}
