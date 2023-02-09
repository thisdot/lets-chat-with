import {
  Component,
  HostBinding,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Candidate, Identifier, Interest } from '@conf-match/api';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cm-chatting-reasons-card',
  templateUrl: './chatting-reasons-card.component.html',
  styleUrls: ['./chatting-reasons-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChattingReasonsCardComponent {
  @Input()
  candidate?: Candidate;

  @Output()
  liked = new EventEmitter<{ id: string; identifiers: Identifier[]; interests: Interest[] }>();

  @HostBinding('class.cm-connect-card')
  get defaultClass() {
    return true;
  }

  public selectedInterests: Interest[] = [];
  public selectedIdentifiers: Identifier[] = [];

  onIdentifierStateChange(changedIdentifier: Identifier) {
    if (this.isIdentifierSelected(changedIdentifier)) {
      this.selectedIdentifiers = this.selectedIdentifiers.filter(
        (identifier) => identifier.id !== changedIdentifier.id
      );
    } else {
      this.selectedIdentifiers.push(changedIdentifier);
    }
  }

  isIdentifierSelected(identifier: Identifier): boolean {
    return this.selectedIdentifiers.some((i) => i.id === identifier.id);
  }

  onInterestStateChange(changedInterest: Interest) {
    if (this.isInterestSelected(changedInterest)) {
      this.selectedInterests = this.selectedInterests.filter(
        (identifier) => identifier.id !== changedInterest.id
      );
    } else {
      this.selectedInterests.push(changedInterest);
    }
  }

  isInterestSelected(interest: Interest): boolean {
    return this.selectedInterests.some((i) => i.id === interest.id);
  }

  like(): void {
    if (!this.candidate) {
      return;
    }

    this.liked.emit({
      id: this.candidate.id,
      identifiers: this.selectedIdentifiers,
      interests: this.selectedInterests,
    });
  }

  isLikeDisabled(): boolean {
    return this.selectedIdentifiers.length === 0 || this.selectedInterests.length === 0;
  }
}
