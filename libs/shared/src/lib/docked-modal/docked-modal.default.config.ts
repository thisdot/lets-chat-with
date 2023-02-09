import { DockedModalConfig } from './docked-modal.config';

export const DEFAULT_DOCKED_MODAL_CONFIG: Required<DockedModalConfig> = {
  resizeable: true,
  closeButton: true,
  closeIcon: true,
  direction: 'bottom',
  closeOnClickOutside: true,
  removeSpacing: false,
  rounded: true,
};
