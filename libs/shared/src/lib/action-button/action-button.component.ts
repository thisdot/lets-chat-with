import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IconName, IconSize } from '@conf-match/shared/ui-icons';

type ActionTypes = 'no-match' | 'match' | 'info' | 'chat' | 'undo';

const typeIcons: { [key: string]: { iconSize: IconSize; icon: IconName } } = {
  'no-match': {
    iconSize: 'xxl',
    icon: 'Close',
  },
  match: {
    iconSize: 'xxl',
    icon: 'MessageBubbleTyping',
  },
  undo: {
    iconSize: 'xl',
    icon: 'Back',
  },
  info: {
    iconSize: 'xl',
    icon: 'Info',
  },
  chat: {
    iconSize: 'xl',
    icon: 'MessageBubbleTyping',
  },
};
@Component({
  // tslint:disable-next-line: component-selector
  selector: '[cm-action-button]',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonComponent implements OnChanges {
  @Input()
  type?: ActionTypes;

  icon?: IconName;
  iconSize?: IconSize;

  @HostBinding('class.cm-action-button')
  get defaultClass() {
    return true;
  }

  @HostBinding('class.cm-action-button--no-match')
  get isDoNotMatch() {
    return this.type === 'no-match';
  }

  @HostBinding('class.cm-action-button--match')
  get isMatch() {
    return this.type === 'match';
  }

  @HostBinding('class.cm-action-button--info')
  get isInfo() {
    return this.type === 'info';
  }

  @HostBinding('class.cm-action-button--chat')
  get isChat() {
    return this.type === 'chat';
  }

  @HostBinding('class.cm-action-button--undo')
  get isUndo() {
    return this.type === 'undo';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.type && this.type) {
      const { icon, iconSize } = typeIcons[this.type];
      this.iconSize = iconSize;
      this.icon = icon;
    }
  }
}
