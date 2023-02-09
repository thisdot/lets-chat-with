/**
 * States of reporting. Each state helps transition to the appropriate view
 *
 * Options - reporting decision hasn't been made. Transition to main reporting options.
 * Success - reporting decision made. Transitions to submission success state.
 * Failure - reporting decision made. Transitions to submission failed state.
 * Other - reporting decision hasn't been made. Transition to submitting a report message.
 *
 * @export
 * @enum {number}
 */
export enum ReportViewState {
  Options,
  Success,
  Failure,
  Other,
}
