export interface KeyUpObserverAction {
	(ev: KeyboardEvent): void
}

interface KeyUpActionSubscriber {
	action: KeyUpObserverAction
}

class KeyUpObserver {
	private readonly subscribers: KeyUpActionSubscriber[];
	constructor() {
		this.subscribers = [];
		document.addEventListener('keyup', this.action);
	}

	public subscribe = (action: KeyUpObserverAction) => {
		this.subscribers.push({ action });
	};

	public destructor = (): void => {
		document.removeEventListener('keyup', this.action);
	};

	private action = (ev: KeyboardEvent) => {
		this.subscribers.forEach(subscriber => subscriber.action(ev));
	};
}

export default KeyUpObserver;
