import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ModalService } from '../modal.service';
import {
  MaxNumberReachedComponent,
  MaxNumberReachedData,
} from '../max-number-reached/max-number-reached.component';
import { IdentifierModel } from '@conf-match/api';

@Component({
  selector: 'cm-connections-selector',
  templateUrl: './connections-selector.component.html',
  styleUrls: ['./connections-selector.component.scss'],
})
export class ConnectionsSelectorComponent implements OnChanges {
  @Input()
  identifiers: Array<IdentifierModel> = [];
  @Input()
  selected: Array<IdentifierModel> = [];
  @Input()
  limit = 3;
  @Input()
  title?: string;
  @Input()
  description?: string;

  @Output()
  connectionSelect = new EventEmitter<IdentifierModel[]>();

  selectedIdentifiers: Array<IdentifierModel> = [];

  constructor(private _modalService: ModalService) {}

  onIdentifierStateChange(identifier: IdentifierModel) {
    if (!this.isSelected(identifier)) {
      this.selectedIdentifiers = [...this.selectedIdentifiers, identifier];
    } else {
      this.selectedIdentifiers = this.selectedIdentifiers.filter((i) => i.id !== identifier.id);
    }

    this.connectionSelect.emit(this.selectedIdentifiers);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selected) {
      this.selectedIdentifiers = this.selected || [];
    }
  }

  onInterestMouseDown(disabled: boolean) {
    if (disabled) {
      this._modalService.openFloatingModal<void, MaxNumberReachedData>(MaxNumberReachedComponent, {
        entityName: 'connections',
        maxNumber: this.limit,
      });
    }
  }

  isSelected(identifierToCheck: IdentifierModel): boolean {
    return (
      this.selectedIdentifiers.find((identifier) => identifier.id === identifierToCheck.id) !==
      undefined
    );
  }
}
