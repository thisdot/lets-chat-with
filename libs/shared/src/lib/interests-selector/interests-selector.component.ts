import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ModalService } from '../modal.service';
import {
  MaxNumberReachedComponent,
  MaxNumberReachedData,
} from '../max-number-reached/max-number-reached.component';
import { InterestModel } from '@conf-match/api';

const contains = (i: string, str: string) =>
  str ? i.toLocaleLowerCase().includes(str.toLocaleLowerCase()) : true;

@Component({
  selector: 'cm-interests-selector',
  templateUrl: './interests-selector.component.html',
  styleUrls: ['./interests-selector.component.scss'],
})
export class InterestsSelectorComponent implements OnChanges {
  @Input()
  interests: Array<InterestModel> = [];
  @Input()
  selected: Array<InterestModel> = [];
  @Input()
  limit = 3;

  @Output()
  interestSelect = new EventEmitter();

  selectedInterests: Array<InterestModel> = [];
  visibleGroups: Map<string, boolean> = new Map();
  interestGroups?: { name: string; interests: InterestModel[] }[];
  private _search = '';

  constructor(private _modalService: ModalService) {}

  onSearchInput(search: string) {
    this._search = search;
    this.interestGroups = this._getInterests(search);
  }

  onInterestStateChange(interest: InterestModel) {
    if (!this.isSelected(interest)) {
      this.selectedInterests = [...this.selectedInterests, interest];
    } else {
      this.selectedInterests = this.selectedInterests.filter((i) => i.id !== interest.id);
    }

    this.interestSelect.emit(this.selectedInterests);
  }

  onInterestMouseDown(disabled: boolean) {
    if (disabled) {
      this._modalService.openFloatingModal<void, MaxNumberReachedData>(MaxNumberReachedComponent, {
        entityName: 'interests',
        maxNumber: this.limit,
      });
    }
  }

  onGroupVisibilityToggle(group: string, visible: boolean) {
    this.visibleGroups.set(group, visible);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selected) {
      this.selectedInterests = this.selected;
    }

    if (changes.interests) {
      this.interestGroups = this._getInterests(this._search);
    }
  }

  isSelected(interestToCheck: InterestModel) {
    return (
      this.selectedInterests.find((interest) => interest.id === interestToCheck.id) !== undefined
    );
  }

  private _getInterests(search?: string): Array<{
    name: string;
    interests: Array<InterestModel>;
  }> {
    return (this.interests || [])
      .reduce<any[]>((interestGroups, currInterest) => {
        const interestGroupIndex = interestGroups.findIndex(
          (group) => group.name === currInterest.group
        );
        if (interestGroupIndex > -1) {
          interestGroups[interestGroupIndex].interests.push(currInterest);
        } else {
          interestGroups.push({ name: currInterest.group, interests: [currInterest] });
        }
        return interestGroups;
      }, [])
      .map((group) => {
        group.interests = group.interests.filter((i: InterestModel) =>
          contains(i.name, search ?? '')
        );
        return group;
      });
  }
}
