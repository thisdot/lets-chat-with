import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

export interface Question {
  question: string;
  answer: string;
}

// TODO: this should be removed/replaced with the proper service later when available
@Injectable({ providedIn: 'root' })
export class HelpService {
  getAll(): Observable<Question[]> {
    return of([
      {
        question: 'Question 1',
        answer:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque reiciendis accusamus iure velit tenetur assumenda eos tempore omnis! Consequatur rerum dignissimos temporibus. Adipisci enim et expedita saepe, ea porro autem.',
      },
      {
        question: 'Question 2',
        answer:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque reiciendis accusamus iure velit tenetur assumenda eos tempore omnis! Consequatur rerum dignissimos temporibus. Adipisci enim et expedita saepe, ea porro autem.',
      },
      {
        question: 'Question 3',
        answer:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque reiciendis accusamus iure velit tenetur assumenda eos tempore omnis! Consequatur rerum dignissimos temporibus. Adipisci enim et expedita saepe, ea porro autem.',
      },
      {
        question: 'Question 4',
        answer:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque reiciendis accusamus iure velit tenetur assumenda eos tempore omnis! Consequatur rerum dignissimos temporibus. Adipisci enim et expedita saepe, ea porro autem.',
      },
      {
        question: 'Question 5',
        answer:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque reiciendis accusamus iure velit tenetur assumenda eos tempore omnis! Consequatur rerum dignissimos temporibus. Adipisci enim et expedita saepe, ea porro autem.',
      },
      {
        question: 'Question 6',
        answer:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque reiciendis accusamus iure velit tenetur assumenda eos tempore omnis! Consequatur rerum dignissimos temporibus. Adipisci enim et expedita saepe, ea porro autem.',
      },
    ]);
  }
}

@Component({
  selector: 'cm-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  selectedQuestion: Question = null;

  questions$ = this._service.getAll();

  constructor(private _router: Router, private _service: HelpService) {}

  ngOnInit(): void {}

  selectQuestion(question) {
    if (this.selectedQuestion !== question) {
      this.selectedQuestion = question;
    } else {
      this.selectedQuestion = null;
    }
  }

  onBack() {
    this._router.navigate(['settings']);
  }
}
