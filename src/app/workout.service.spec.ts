import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { Workout } from './model/workout.model'; // Correct import path

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a workout', () => {
    const workout: Workout = { name: 'John', type: 'Running', minutes: '30' };
    service.addWorkout(workout);
    expect(service.getWorkouts()).toContain(workout);
  });

  it('should return all workouts', () => {
    const workout1: Workout = { name: 'John', type: 'Running', minutes: '30' };
    const workout2: Workout = { name: 'Jane', type: 'Cycling', minutes: '45' };
    service.addWorkout(workout1);
    service.addWorkout(workout2);
    expect(service.getWorkouts().length).toBe(2);
  });

  it('should clear all workouts', () => {
    const workout: Workout = { name: 'John', type: 'Running', minutes: '30' };
    service.addWorkout(workout);
    service.clearWorkouts();
    expect(service.getWorkouts().length).toBe(0);
  });
});
