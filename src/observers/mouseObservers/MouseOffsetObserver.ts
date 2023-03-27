export interface MouseOffsetObserverAction {
	(offsetX: number, offsetY: number, ev: MouseEvent): void
}

interface MouseOffsetSubscriber {
	action: MouseOffsetObserverAction
}

// MouseOffsetObserver уведомляет подписчиков о движении мыши с передачей сдвига
class MouseOffsetObserver {
	private readonly subscribers: MouseOffsetSubscriber[];
	private lastX: number | null;
	private lastY: number | null;

	constructor() {
		this.subscribers = [];
		this.lastX = null;
		this.lastY = null;
		document.addEventListener('mousemove', this.action);
	}

	public subscribe = (action: MouseOffsetObserverAction) => {
		this.subscribers.push({ action });
	};

	public destructor = (): void => {
		document.removeEventListener('mousemove', this.action);
	};

	private action = (ev: MouseEvent) => {
		if (this.lastX === null || this.lastY === null) {
			this.lastX = ev.pageX;
			this.lastY = ev.pageY;
		}

		const offsetX = ev.pageX - this.lastX;
		const offsetY = ev.pageY - this.lastY;

		this.subscribers.forEach((subscriber) => {
			subscriber.action(offsetX, offsetY, ev);
		});

		this.lastX = ev.pageX;
		this.lastY = ev.pageY;
	};
}

export default MouseOffsetObserver;
