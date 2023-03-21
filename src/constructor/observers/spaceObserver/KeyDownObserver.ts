export interface KeyDownObserverAction {
	(ev: KeyboardEvent): void
}

interface KeyDownActionSubscriber {
	action: KeyDownObserverAction
}

class KeyDownObserver {
	private readonly subscribers: KeyDownActionSubscriber[];
	constructor() {
		this.subscribers = [];
		document.addEventListener('keydown', this.action);
	}

	public subscribe = (action: KeyDownObserverAction) => {
		this.subscribers.push({ action });
	};

	public destructor = (): void => {
		document.removeEventListener('keydown', this.action);
	};

	private action = (ev: KeyboardEvent) => {
		this.subscribers.forEach(subscriber => subscriber.action(ev));
	};
}

export default KeyDownObserver;
