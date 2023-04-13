export interface MouseUpObserverAction {
	(ev: MouseEvent): void
}

interface MouseUpSubscriber {
	action: MouseUpObserverAction
}

class MouseUpObserver {
	private readonly subscribers: MouseUpSubscriber[];

	constructor() {
		this.subscribers = [];
		document.addEventListener('mouseup', this.action);
	}

	public subscribe = (action: MouseUpObserverAction) => {
		this.subscribers.push({ action });
	};

	public destructor = (): void => {
		document.removeEventListener('mouseup', this.action);
	};

	private action = (ev: MouseEvent) => {
		this.subscribers.forEach(subscriber => subscriber.action(ev));
	};
}

export default MouseUpObserver;
