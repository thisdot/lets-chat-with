import {
  Component,
  ContentChild,
  AfterContentInit,
  Renderer2,
  OnDestroy,
  Input,
  HostBinding,
} from '@angular/core';
import { TextareaDirective } from '../textarea/textarea.directive';
import { NgControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cm-textarea-wrapper',
  templateUrl: './textarea-wrapper.component.html',
  styleUrls: ['./textarea-wrapper.component.scss'],
})
export class TextareaWrapperComponent implements AfterContentInit, OnDestroy {
  @Input()
  name?: string;
  @ContentChild(TextareaDirective) textarea?: TextareaDirective;
  @ContentChild(NgControl) control?: NgControl;
  maxChars?: number;
  count = 0;

  private onDestroy$ = new Subject<void>();

  constructor(private _renderer: Renderer2) {}

  @HostBinding('class.cm-textarea-wrapper')
  get defaultClass() {
    return true;
  }

  ngAfterContentInit() {
    const nativeElement = this.textarea?.nativeElement;
    const maxChars = nativeElement.getAttribute('maxlength');
    this.maxChars = maxChars;

    this.valueChanges()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value) => {
        this.count = value ? value.length : 0;
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  private valueChanges(): Observable<string> {
    if (this.control?.valueChanges) {
      return this.control.valueChanges;
    } else {
      const nativeElement = this.textarea?.nativeElement;
      return new Observable((observer) => {
        return this._renderer.listen(nativeElement, 'input', (e) => observer.next(e.target.value));
      });
    }
  }
}
