import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('internship-day-1-task');

  bibleForm = new FormGroup({
    verse: new FormControl(''),
    version: new FormControl(''),
    content: new FormControl(''),
  });

  submitForm(event: Event) {
    event.preventDefault();
    console.log('Form Submited!');
    console.log(this.bibleForm);
  }
}
