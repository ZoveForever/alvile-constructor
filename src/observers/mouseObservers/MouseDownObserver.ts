export interface MouseDownObserverAction {
	(ev: MouseEvent): void
}

interface MouseDownSubscriber {
	action: MouseDownObserverAction
}

class MouseDownObserver {
	private readonly subscribers: MouseDownSubscriber[];

	constructor() {
		this.subscribers = [];
		document.addEventListener('mousedown', this.action);
	}

	public subscribe = (action: MouseDownObserverAction) => {
		this.subscribers.push({ action });
	};

	public destructor = (): void => {
		document.removeEventListener('mousedown', this.action);
	};

	private action = (ev: MouseEvent) => {
		this.subscribers.forEach(subscriber => subscriber.action(ev));
	};
}

export default MouseDownObserver;
