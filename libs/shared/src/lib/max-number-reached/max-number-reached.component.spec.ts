import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getTranslocoTestingModule } from '@conf-match/client/shared/testing/util-testing';
import { ModalController } from '../modal.controller';
import { CM_MODAL_DATA } from '../modal.service';
import { SharedModule } from '../shared.module';

import { MaxNumberReachedComponent } from './max-number-reached.component';

describe('MaxNumberReachedComponent', () => {
  let component: MaxNumberReachedComponent;
  let fixture: ComponentFixture<MaxNumberReachedComponent>;
  let modalController: ModalController<void>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, getTranslocoTestingModule()],
      declarations: [MaxNumberReachedComponent],
      providers: [
        {
          provide: ModalController,
          useValue: jasmine.createSpyObj('ModalController', ['close']),
        },
        {
          provide: CM_MODAL_DATA,
          useValue: {
            entityName: 'interests',
            maxNumber: 10,
          },
        },
      ],
    }).compileComponents();

    modalController = TestBed.inject(ModalController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxNumberReachedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call the close handler on button click', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(modalController.close).toHaveBeenCalled();
  });
});
