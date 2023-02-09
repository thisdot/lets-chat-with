// Determines the maximal height of the container
export const TopOffsetY = 200;
export const TopOffsetX = 200;

// Time needed for extending/retracting of the container
export const GestureAnimationDuration = 250;

// Implements a tolerance where the difference between the
// last recorded Y and the last Y is negligible
export const GestureYDeltaTolerance = 20;

// Implements a tolerance where the difference between the
// last recorded X and the last X is negligible
export const GestureXDeltaTolerance = 5;

// Main value that determines when the resize gesture animation
// should be triggered. The bigger the timeout, the slower drag
// is required for gesture triggering.

export const GestureXYRecorderTimeout = 100;
