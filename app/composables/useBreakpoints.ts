import { useBreakpoints as vueuseBreakpoints, breakpointsTailwind } from '@vueuse/core'

export function useBreakpoints() {
  return vueuseBreakpoints(breakpointsTailwind, {
    // ssrWidth: 0
  })
}
