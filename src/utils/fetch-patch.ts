/**
 * Resilient window.fetch shim and third-party extension error handler.
 * Prevents "TypeError: Cannot set property fetch of #<Window> which has only a getter"
 * caused by browser extensions (e.g. VPNs, proxies, devtools) attempting to monkey-patch fetch.
 */

export function installFetchPatch(targetWindow: any = typeof window !== 'undefined' ? window : null): boolean {
  if (!targetWindow) return false;

  try {
    const originalFetch = targetWindow.fetch ? targetWindow.fetch.bind(targetWindow) : null;
    let currentFetch = originalFetch;

    Object.defineProperty(targetWindow, 'fetch', {
      get() {
        return currentFetch;
      },
      set(newFetch: any) {
        currentFetch = typeof newFetch === 'function' ? newFetch : originalFetch;
      },
      configurable: true,
      enumerable: true,
    });
    return true;
  } catch (err) {
    try {
      const proto = targetWindow.constructor?.prototype;
      if (proto) {
        const origProto = proto.fetch;
        let currentFetch = origProto;
        Object.defineProperty(proto, 'fetch', {
          get() {
            return currentFetch;
          },
          set(newFetch: any) {
            currentFetch = newFetch;
          },
          configurable: true,
          enumerable: true,
        });
        return true;
      }
    } catch {
      // Ignored
    }
    return false;
  }
}

export function isExtensionError(source: string | null | undefined): boolean {
  if (!source || typeof source !== 'string') return false;
  return (
    source.includes('chrome-extension://') ||
    source.includes('moz-extension://') ||
    source.includes('safari-web-extension://')
  );
}

export function setupExtensionErrorSuppression(targetWindow: any = typeof window !== 'undefined' ? window : null): void {
  if (!targetWindow || typeof targetWindow.addEventListener !== 'function') return;

  targetWindow.addEventListener(
    'error',
    (event: any) => {
      const filename = event?.filename || '';
      const stack = event?.error?.stack || '';
      if (isExtensionError(filename) || isExtensionError(stack)) {
        if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
        if (typeof event.stopPropagation === 'function') event.stopPropagation();
        if (typeof event.preventDefault === 'function') event.preventDefault();
        return true;
      }
    },
    true
  );

  targetWindow.addEventListener(
    'unhandledrejection',
    (event: any) => {
      const stack = event?.reason?.stack || (typeof event?.reason === 'string' ? event.reason : '');
      if (isExtensionError(stack)) {
        if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
        if (typeof event.stopPropagation === 'function') event.stopPropagation();
        if (typeof event.preventDefault === 'function') event.preventDefault();
        return true;
      }
    },
    true
  );
}
