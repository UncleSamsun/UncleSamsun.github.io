export type EventHandler<E> = (event: E) => void;
interface PreventableEvent {
  defaultPrevented?: boolean;
}

export interface KeyboardActivationEvent {
  key: string;
  defaultPrevented?: boolean;
  preventDefault: () => void;
  target?: unknown;
  currentTarget: {
    click: () => void;
  };
}

export interface PropagationEvent {
  stopPropagation: () => void;
}

export function composeEventHandlers<E extends PreventableEvent>(
  consumerHandler: EventHandler<E> | undefined,
  internalHandler: EventHandler<E>,
): EventHandler<E> {
  return (event) => {
    consumerHandler?.(event);
    if (!event.defaultPrevented) {
      internalHandler(event);
    }
  };
}

export function isKeyboardActivationKey(key: string): boolean {
  return key === "Enter" || key === " " || key === "Spacebar";
}

export function activateOnKeyboard(event: KeyboardActivationEvent): void {
  if (!isKeyboardActivationKey(event.key)) return;
  if (event.target && event.target !== event.currentTarget) return;

  event.preventDefault();
  event.currentTarget.click();
}

export function stopEventPropagation(event: PropagationEvent): void {
  event.stopPropagation();
}
