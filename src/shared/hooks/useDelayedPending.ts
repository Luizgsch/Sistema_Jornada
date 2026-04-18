import { useEffect, useState } from 'react';

/** Shows true only after `delayMs` while `isPending` stays true (e.g. chart spinner after 300ms). */
export function useDelayedPending(isPending: boolean, delayMs = 300) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isPending) {
      setShow(false);
      return;
    }
    const id = window.setTimeout(() => setShow(true), delayMs);
    return () => window.clearTimeout(id);
  }, [isPending, delayMs]);

  return show;
}
