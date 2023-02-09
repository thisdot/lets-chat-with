import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvatarImageComponent } from './avatar-image.component';

describe('AvatarImageComponent', () => {
  let component: AvatarImageComponent;
  let fixture: ComponentFixture<AvatarImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarImageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should append the appropriate classes when input properties are set', () => {
    // Arrange
    component.bordered = true;
    component.rounded = true;

    // Act
    fixture.detectChanges();
    const classList = (fixture.nativeElement.querySelector('.avatar-img') as HTMLElement).classList;

    // Assert
    expect(classList.contains('bordered')).toBeTruthy();
    expect(classList.contains('rounded')).toBeTruthy();
  });

  it('should not append the appropriate classes when input properties are not set', () => {
    // Arrange
    fixture = TestBed.createComponent(AvatarImageComponent);
    component = fixture.componentInstance;
    component.bordered = false;
    component.rounded = false;

    // Act
    fixture.detectChanges();
    const classList = (fixture.nativeElement.querySelector('.avatar-img') as HTMLElement).classList;

    // Assert
    expect(classList.contains('bordered')).not.toBeTruthy();
    expect(classList.contains('rounded')).not.toBeTruthy();
  });
});
