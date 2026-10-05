const MENU_MAX_HEIGHT_PX = 288;

/** True when the menu fits better above the trigger than below it. */
export function menuOpensUpward(trigger: HTMLElement): boolean {
  const rect = trigger.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  return spaceBelow < MENU_MAX_HEIGHT_PX && spaceAbove > spaceBelow;
}
