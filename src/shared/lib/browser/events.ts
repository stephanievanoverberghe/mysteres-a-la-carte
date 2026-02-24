export function listenWindowEvent<K extends keyof WindowEventMap>(event: K, listener: (event: WindowEventMap[K]) => void, options?: AddEventListenerOptions) {
    window.addEventListener(event, listener as EventListener, options);

    return () => {
        window.removeEventListener(event, listener as EventListener, options);
    };
}
