import { Breakpoints } from '@angular/cdk/layout';

const breakpoints = {
  XS: '0',
  SM: '576px',
  MD: '768px',
  LG: '992px',
  XL: '1200px',
};
type Breakpoint = keyof typeof breakpoints;
type Breakpoints = {
  [P in Breakpoint]: {
    DOWN: string;
    UP: string;
  };
};

const breakPointKeys = Object.keys(breakpoints) as Breakpoint[];

const breakpointDown = (breakpoint: Breakpoint) => `(max-width: ${breakpoints[breakpoint]})`;
const breakpointUp = (breakpoint: Breakpoint) => `(min-width: ${breakpoints[breakpoint]})`;

export const CmBreakpoints = breakPointKeys.reduce<Breakpoints>(
  (cmBreakpoints, breakpoint) => ({
    ...cmBreakpoints,
    [breakpoint]: {
      DOWN: breakpointDown(breakpoint),
      UP: breakpointUp(breakpoint),
    },
  }),
  {} as any
);
