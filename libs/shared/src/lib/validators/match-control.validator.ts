import { UntypedFormGroup } from '@angular/forms';

export function matchControlValidator(sourceControl: string, checkControl: string) {
  return (form: UntypedFormGroup): { [key: string]: boolean } | null => {
    const ctrls = form.controls;

    if (ctrls[sourceControl].value !== ctrls[checkControl].value) {
      return { notMatching: true };
    }
    return null;
  };
}
