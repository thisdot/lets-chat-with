import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  HostBinding,
  Renderer2,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  OnInit,
  NgZone,
  OnDestroy,
} from '@angular/core';

import {
  StepperContentComponent,
  ContentPosition,
} from './stepper-content/stepper-content.component';

export interface SwipeStepperChangeEvent {
  current: number;
  total: number;
}

enum SwipeDirection {
  Left = 'left',
  Right = 'right',
}

// Determines after what percent of the width of
// the container the content should be swapped.
const ConsiderAsSwipeAfter = 0.33;

const TransitionDuration = 300; // ms
const SwipeTransition = `transform ${TransitionDuration}ms ease`;

type ContentUpdateFunc = (content: StepperContentComponent | null, arg: string | null) => void;

const getXPos = (e: MouseEvent | TouchEvent) => {
  if (e instanceof TouchEvent) {
    return e.touches[0].clientX;
  }
  return e.clientX;
};

@Component({
  selector: 'cm-swipe-stepper',
  templateUrl: './swipe-stepper.component.html',
  styleUrls: ['./swipe-stepper.component.scss'],
})
export class SwipeStepperComponent implements AfterContentInit, OnInit, OnDestroy {
  private _left: StepperContentComponent | null = null;
  private _focused: StepperContentComponent | null = null;
  private _right: StepperContentComponent | null = null;
  private _focusedIdx = 0;
  private _dragging = false;
  private _pivot = 0;
  private _lastX = 0;
  private _direction = SwipeDirection.Right;
  private _listenersCbs: (() => void)[] = [];

  @ViewChild('content') content?: ElementRef;
  @ContentChildren(StepperContentComponent)
  children?: QueryList<StepperContentComponent>;
  // tslint:disable-next-line: no-output-native
  @Output() change = new EventEmitter<SwipeStepperChangeEvent>();

  constructor(private _renderer: Renderer2, private _zone: NgZone) {}

  @HostBinding('class.cm-swipe-stepper')
  get defaultClass() {
    return true;
  }

  get markers() {
    const markers = new Array(this.children?.length).fill(false);
    markers[this._focusedIdx] = true;

    return markers;
  }

  get focusedIdx() {
    return this._focusedIdx;
  }

  private get _width() {
    return this.content?.nativeElement.offsetWidth ?? 0;
  }

  private get _isFirst() {
    return this._focusedIdx === 0;
  }

  private get _isLast() {
    return this._focusedIdx === (this.children?.length ?? 0) - 1;
  }

  ngOnInit() {
    this._zone.runOutsideAngular(() => {
      this._listenersCbs = [
        this._renderer.listen('document', 'mouseup', () => this.onDocumentTouchEnd()),
        this._renderer.listen('document', 'touchend', () => this.onDocumentTouchEnd()),
        this._renderer.listen('document', 'mousemove', (e) => this.onDocumentTouchMove(e)),
        this._renderer.listen('document', 'touchmove', (e) => this.onDocumentTouchMove(e)),
      ];
    });
  }

  ngOnDestroy() {
    this._listenersCbs.forEach((cb) => cb());
  }

  ngAfterContentInit() {
    this._updatePositions();
  }

  onContentTouchStart(e: TouchEvent | MouseEvent) {
    this._zone.runOutsideAngular(() => {
      this._dragging = true;
      this._pivot = getXPos(e);
    });
  }

  onDocumentTouchEnd() {
    this._dragging = false;

    const diff = Math.abs(this._lastX - this._pivot);
    const travelled = diff / this._width;

    const isSwipe = travelled > ConsiderAsSwipeAfter;
    const isRightSwipeOnFirst = this._isFirst && this._direction === SwipeDirection.Right;
    const isLeftSwipeOnLast = this._isLast && this._direction === SwipeDirection.Left;

    if (isSwipe && !(isRightSwipeOnFirst || isLeftSwipeOnLast)) {
      this._zone.run(() => {
        this._swipe(this._direction);
      });
    } else {
      this._swipeBack();
    }
  }

  onDocumentTouchMove(e: TouchEvent | MouseEvent) {
    if (!this._dragging) {
      return;
    }

    const currentX = getXPos(e);

    this._direction = currentX - this._lastX > 0 ? SwipeDirection.Right : SwipeDirection.Left;

    const diff = currentX - this._pivot;

    if (Math.abs(diff) < this._width) {
      this._updateContent(this._moveX, {
        left: `${diff - this._width}px`,
        focused: `${diff}px`,
        right: `${diff + this._width}px`,
      });

      this._lastX = currentX;
    }
  }

  swipeLeft() {
    this._swipe(SwipeDirection.Left);
  }

  swipeRight() {
    this._swipe(SwipeDirection.Right);
  }

  private _swipeBack() {
    this._addTransitions();
    this._updateContent(this._moveX, {
      left: null,
      focused: null,
      right: null,
    });

    setTimeout(() => this._removeTransitions(), TransitionDuration);
  }

  private _swipe(direction: SwipeDirection) {
    this._addTransitions();

    const isRightSwipe = direction === SwipeDirection.Right;
    this._updateContent(this._moveX, {
      left: isRightSwipe ? '0' : '-200%',
      focused: isRightSwipe ? '100%' : '-100%',
      right: isRightSwipe ? '200%' : '0',
    });

    setTimeout(() => {
      this._removeTransitions();

      this._updateContent(this._moveX, {
        left: null,
        focused: null,
        right: null,
      });
      this._focusedIdx = isRightSwipe ? this._focusedIdx - 1 : this._focusedIdx + 1;
      this._updatePositions();
    }, TransitionDuration);
  }

  private _updatePositions() {
    this.children?.forEach((item: StepperContentComponent, idx: number) => {
      switch (idx) {
        case this._focusedIdx - 1:
          item.position = ContentPosition.Left;
          this._left = item;
          break;
        case this._focusedIdx:
          item.position = ContentPosition.Focused;
          this._focused = item;
          break;
        case this._focusedIdx + 1:
          item.position = ContentPosition.Right;
          this._right = item;
          break;
        default:
          item.position = ContentPosition.Hidden;
      }
    });
    if (this._isFirst) {
      this._left = null;
    }
    if (this._isLast) {
      this._right = null;
    }
    this.change.emit({
      current: this._focusedIdx,
      total: this.children?.length ?? 0,
    });
  }

  private _addTransitions() {
    this._updateContent(this._transition, {
      left: SwipeTransition,
      focused: SwipeTransition,
      right: SwipeTransition,
    });
  }

  private _removeTransitions() {
    this._updateContent(this._transition, {
      left: null,
      focused: null,
      right: null,
    });
  }

  private _updateContent(
    operation: ContentUpdateFunc,
    args: { left: string | null; focused: string | null; right: string | null }
  ) {
    operation(this._focused, args.focused);

    if (this._right) {
      operation(this._right, args.right);
    }
    if (this._left) {
      operation(this._left, args.left);
    }
  }

  private _moveX: ContentUpdateFunc = (
    content: StepperContentComponent | null,
    translate: string | null
  ) => {
    const nativeElement = content?.ref?.nativeElement;

    if (translate) {
      this._renderer.setStyle(nativeElement, 'transform', `translateX(${translate})`);
    } else {
      this._renderer.removeStyle(nativeElement, 'transform');
    }
  };

  private _transition: ContentUpdateFunc = (
    content: StepperContentComponent | null,
    transition: string | null
  ) => {
    const nativeElement = content?.ref?.nativeElement;

    if (transition) {
      this._renderer.setStyle(nativeElement, 'transition', transition);
    } else {
      this._renderer.removeStyle(nativeElement, 'transition');
    }
  };
}
