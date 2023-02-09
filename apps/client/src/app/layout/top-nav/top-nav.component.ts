import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalService } from '@conf-match/shared';
import { RouteTag, RouteConfigParam } from '@conf-match/shared/route-tags';
import { RouteConfigService } from '@this-dot/route-config';
import { map } from 'rxjs/operators';
import { ShareConferenceModalComponent } from '../../conferences/share-conference-modal/share-conference-modal.component';
import { LayoutActionsService } from '../layout-actions.service';

@Component({
  selector: 'cm-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavComponent {
  readonly RouteTag = RouteTag;

  readonly isPrimary$ = this.routeTagService
    .getLeafConfig('cmRouteColor', 'secondary')
    .pipe(map((style) => style === 'primary'));
  readonly progress$ = this.routeTagService.getLeafConfig('cmRouteProgressState', null);

  constructor(
    private layoutService: LayoutActionsService,
    private routeTagService: RouteConfigService<RouteTag, RouteConfigParam>,
    private modalService: ModalService
  ) {}

  onBack() {
    this.layoutService.back();
  }

  share(event): void {
    event.preventDefault();
    const modal = this.modalService.openDockedModal<any, any>(
      ShareConferenceModalComponent,
      undefined,
      {
        closeButton: true,
      }
    );

    modal.onClose.subscribe();
  }
}
