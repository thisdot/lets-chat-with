import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SecurityCodeSize } from './security-code-input/security-code-input.component';

@Component({
  selector: 'cm-security-code-form',
  templateUrl: './security-code-form.component.html',
  styleUrls: ['./security-code-form.component.scss'],
})
export class SecurityCodeFormComponent implements OnInit {
  @Input() invalid: boolean;
  @Input() loading: boolean;
  @Input() code: string;
  @Output() submitForm = new EventEmitter<{ code: string }>();
  @Output() resendCode = new EventEmitter<void>();

  form: UntypedFormGroup;

  constructor(formBuilder: UntypedFormBuilder) {
    this.form = formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(SecurityCodeSize)]],
    });
  }

  ngOnInit(): void {
    if (this.code) {
      this.form.get('code').setValue(this.code);
    }
  }
}
