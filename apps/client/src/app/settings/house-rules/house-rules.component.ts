import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

// TODO: this should be removed/replaced with the proper service later when available
@Injectable({ providedIn: 'root' })
export class HouseRulesService {
  getAll() {
    return of([
      {
        title: 'I will have empathy',
        text: 'We all express ourselfs differently. Do not judge.',
        icon: 'Flash',
      },
      {
        title: 'I will have empathy',
        text: 'We all express ourselfs differently. Do not judge.',
        icon: 'Flash',
      },
      {
        title: 'I will have empathy',
        text: 'We all express ourselfs differently. Do not judge.',
        icon: 'Flash',
      },
    ]);
  }
}

@Component({
  selector: 'cm-house-rules',
  templateUrl: './house-rules.component.html',
  styleUrls: ['./house-rules.component.scss'],
})
export class HouseRulesComponent implements OnInit {
  houseRules$ = this._service.getAll();
  constructor(private _router: Router, private _service: HouseRulesService) {}

  ngOnInit(): void {}

  onBack() {
    this._router.navigate(['settings']);
  }
}
