import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { WorkoutService } from '../workout.service';
import { Workout } from '../model/workout.model';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule]
})
export class WorkoutListComponent {
  @Input() workouts: Workout[] = [];

  page: number = 1;
  itemsPerPage: number = 5;

  searchTerm: string = '';
  filterType: string = 'All';

  get aggregatedWorkouts() {
    const workoutMap = new Map<string, { types: string[], totalMinutes: number }>();

    this.filteredWorkouts.forEach(workout => {
      const { name, type, minutes } = workout;
      const normalizedName = name.trim().toLowerCase();

      if (!workoutMap.has(normalizedName)) {
        workoutMap.set(normalizedName, { types: [], totalMinutes: 0 });
      }
      const entry = workoutMap.get(normalizedName)!;
      if (!entry.types.includes(type)) {
        entry.types.push(type);
      }
      entry.totalMinutes += parseFloat(minutes) || 0;
    });

    return Array.from(workoutMap.entries()).map(([name, { types, totalMinutes }]) => ({
      name,
      types: types.join(', '),
      totalMinutes
    }));
  }

  get filteredWorkouts() {
    let filtered = this.workouts;

    if (this.searchTerm) {
      filtered = filtered.filter(workout =>
        workout.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.filterType && this.filterType !== 'All') {
      filtered = filtered.filter(workout => workout.type === this.filterType);
    }

    return filtered;
  }

  getWorkoutCount(name: string): number {
    return this.workouts.filter(workout => workout.name === name).length;
  }

  getTotalWorkoutMinutes(name: string): number {
    return this.workouts
      .filter(workout => workout.name === name)
      .reduce((total, workout) => total + (parseFloat(workout.minutes) || 0), 0);
  }
}
