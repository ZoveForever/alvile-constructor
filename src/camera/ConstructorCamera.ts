import ConstructorCanvas from './ConstructorCanvas';
import MouseOffsetObserver from '../observers/mouseObservers/MouseOffsetObserver';
import MouseDownObserver from '../observers/mouseObservers/MouseDownObserver';
import MouseUpObserver from '../observers/mouseObservers/MouseUpObserver';
import KeyDownObserver from '../observers/keyObservers/KeyDownObserver';
import KeyUpObserver  from '../observers/keyObservers/KeyUpObserver';

interface ConstructorCameraProps {
	mouseUpObserver: MouseUpObserver,
	mouseDownObserver: MouseDownObserver,
	mouseOffsetObserver: MouseOffsetObserver,
	spaceDownObserver: KeyDownObserver,
	spaceUpObserver: KeyUpObserver,
}

class ConstructorCamera {
	private readonly canvas: ConstructorCanvas;

	private isMove: boolean;
	private spacePress: boolean;

	constructor(props: ConstructorCameraProps) {
		this.canvas = new ConstructorCanvas();
		this.isMove = false;
		this.spacePress = false;

		props.spaceDownObserver.subscribe(this.onKeyDown);
		props.spaceUpObserver.subscribe(this.onKeyUp);
		props.mouseUpObserver.subscribe(this.onMouseUp);
		props.mouseDownObserver.subscribe(this.onMouseDown);
		props.mouseOffsetObserver.subscribe(this.onMouseMove);
	}

	public enableMove = () => {
		if (this.spacePress) { this.isMove = true; }
	};

	public disableMove = () => {
		this.isMove = false;
	};

	public getCanvasElement = (): HTMLElement => this.canvas.getElement();

	private onMouseMove = (offsetX: number, offsetY: number) => {
		if (!this.isMove) {
			return;
		}

		const currentPosition = this.canvas.getPosition();
		this.canvas.setPosition({
			x: currentPosition.x - offsetX,
			y: currentPosition.y - offsetY,
		});
	};

	private onMouseDown = () => {
		this.enableMove();
	};

	private onMouseUp = () => {
		this.disableMove();
	};

	private onKeyDown = (ev: KeyboardEvent) => {
		if (ev.key === ' ') {
			this.spacePress = true;
			this.canvas.setCursor('move');
			this.canvas.stopScroll();
			ev.preventDefault();
		}
	};

	private onKeyUp = (ev: KeyboardEvent) => {
		if (ev.key === ' ') {
			this.spacePress = false;
			this.isMove = false;
		}
	};
}

export default ConstructorCamera;
