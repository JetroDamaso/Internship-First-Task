import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule, Plus, RotateCcw } from 'lucide-angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, LucideAngularModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('internship-day-1-task');

  //Lucide Icons
  readonly Plus = Plus;
  readonly RotateCcw = RotateCcw;

  //Forms
  bibleForm = new FormGroup({
    verse: new FormControl(),
    version: new FormControl(),
    content: new FormControl(),
  });

  submitForm(event: Event) {
    event.preventDefault();

    if (this.bibleForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.addVerse();
    console.log(this.bibleForm);
  }

  //RESTful APIs
  http = inject(HttpClient);

  verses = signal<any[]>([]);

  //Run this on initialize
  ngOnInit(): void {
    this.getAllVerses();
  }

  getAllVerses() {
    console.log('Get Verses Clicked!');
    this.http.get('http://localhost:8080/bible_verses').subscribe((data: any) => {
      this.verses.set(data);
      console.log(data);
    });
  }

  addVerse() {
    const formData = this.bibleForm.value;

    this.http.post('http://localhost:8080/bible_verses/create', formData).subscribe({
      next: (res) => {
        console.log('Successfully created verse:', res);

        this.getAllVerses();

        this.bibleForm.reset();
      },
      error: (error) => {
        alert('Error creating verse!');
        console.error('Error creating verse:', error);
      },
    });
  }
}
