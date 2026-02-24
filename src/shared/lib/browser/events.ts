/**
 * Abonne un listener à un événement `window` et retourne une fonction de cleanup.
 */
export function listenWindowEvent<K extends keyof WindowEventMap>(
  event: K,
  listener: (_event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions,
) {
  window.addEventListener(event, listener as EventListener, options);

  return () => {
    window.removeEventListener(event, listener as EventListener, options);
  };
}
