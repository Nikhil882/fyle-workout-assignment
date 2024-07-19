import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Workout } from '../model/workout.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FormComponent {
  @Output() workoutAdded = new EventEmitter<Workout>();

  newWorkout: Workout = { name: '', type: '', minutes: '' };

  addWorkout() {
    const minutes = parseFloat(this.newWorkout.minutes);
    if (this.newWorkout.name && this.newWorkout.type && !isNaN(minutes) && minutes >= 0) {
      this.workoutAdded.emit({ ...this.newWorkout });
      this.newWorkout = { name: '', type: '', minutes: '' };
    }
    else{
      alert('Please fill in all fields properly.');
    }
  }
}
