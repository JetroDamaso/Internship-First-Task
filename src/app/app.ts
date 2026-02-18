import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule, Plus, RotateCcw } from 'lucide-angular';

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
    verse: new FormControl(''),
    version: new FormControl(''),
    content: new FormControl(''),
  });

  submitForm(event: Event) {
    event.preventDefault();
    console.log('Form Submited!');
    console.log(this.bibleForm);
  }

  //RESTful APIs
  http = inject(HttpClient);

  verses: any[] = [];

  //Run this on initialize
  ngOnInit(): void {
    this.getAllVerses();
  }

  getAllVerses() {
    console.log('Get Verses Clicked!');
    this.http.get('http://localhost:8080/bible_verses').subscribe((data: any) => {
      this.verses = data;
      console.log(data);
    });
  }
}
