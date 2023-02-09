import { DockedModalDirection } from './docked-modal-direction';

export interface DockedModalConfig {
  /**
   * Can resize
   *
   */
  resizeable?: boolean;
  /**
   * Show the close button
   */
  closeButton?: boolean;
  /**
   * Show the close icon
   */
  closeIcon?: boolean;
  /**
   * Modal opening direction
   */
  direction?: DockedModalDirection;
  /**
   * Should close on click outside
   */
  closeOnClickOutside?: boolean;
  /**
   * Should remove margins and paddings
   */
  removeSpacing?: boolean;
  /**
   * Show rounded corners
   */
  rounded?: boolean;
}
