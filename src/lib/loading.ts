// Simple global loading manager with pub/sub

type Listener = (activeCount: number) => void;

class LoadingManager {
  private activeCount: number = 0;
  private listeners: Set<Listener> = new Set();
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    // Notify initial state
    listener(this.activeCount);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    for (const listener of this.listeners) listener(this.activeCount);
  }

  start() {
    // Avoid flicker by debouncing start slightly
    if (this.debounceTimer) clearTimeout(this.debounceTimer as unknown as number);
    this.debounceTimer = setTimeout(() => {
      this.activeCount += 1;
      this.notify();
    }, 80);
  }

  done() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer as unknown as number);
      this.debounceTimer = null;
    }
    this.activeCount = Math.max(0, this.activeCount - 1);
    this.notify();
  }

  reset() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer as unknown as number);
      this.debounceTimer = null;
    }
    this.activeCount = 0;
    this.notify();
  }
}

export const loadingManager = new LoadingManager();


