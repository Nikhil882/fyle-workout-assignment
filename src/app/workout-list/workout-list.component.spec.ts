import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { Workout } from '../model/workout.model'; 
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../workout.service'; 

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, NgxPaginationModule, WorkoutListComponent],
      providers: [WorkoutService]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter workouts by name', () => {
    component.workouts = [
      { name: 'John', type: 'Running', minutes: '30' },
      { name: 'Jane', type: 'Cycling', minutes: '45' }
    ];
    component.searchTerm = 'John';
    const filteredWorkouts = component.filteredWorkouts;
    expect(filteredWorkouts.length).toBe(1);
    expect(filteredWorkouts[0].name).toBe('John');
  });

  it('should filter workouts by type', () => {
    component.workouts = [
      { name: 'John', type: 'Running', minutes: '30' },
      { name: 'Jane', type: 'Cycling', minutes: '45' }
    ];
    component.filterType = 'Running';
    const filteredWorkouts = component.filteredWorkouts;
    expect(filteredWorkouts.length).toBe(1);
    expect(filteredWorkouts[0].type).toBe('Running');
  });

  it('should aggregate workouts correctly', () => {
    component.workouts = [
      { name: 'John', type: 'Running', minutes: '30' },
      { name: 'John', type: 'Cycling', minutes: '20' },
      { name: 'Jane', type: 'Swimming', minutes: '25' }
    ];
    const aggregated = component.aggregatedWorkouts;
    expect(aggregated.length).toBe(2);
    expect(aggregated[0].types).toBe('Running, Cycling');
    expect(aggregated[0].totalMinutes).toBe(50);
    expect(aggregated[1].types).toBe('Swimming');
    expect(aggregated[1].totalMinutes).toBe(25);
  });
});
