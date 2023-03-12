import ConstructorCanvas from './ConstructorCanvas';
import MouseOffsetObserver from '../observers/MouseOffsetObserver';
import MouseDownObserver from '../observers/MouseDownObserver';
import MouseUpObserver from '../observers/MouseUpObserver';

interface ConstructorCameraProps {
	mouseUpObserver: MouseUpObserver,
	mouseDownObserver: MouseDownObserver,
	mouseOffsetObserver: MouseOffsetObserver,
}

class ConstructorCamera {
	private readonly canvas: ConstructorCanvas;

	private isMove: boolean;

	constructor(props: ConstructorCameraProps) {
		this.canvas = new ConstructorCanvas();
		this.isMove = false;

		props.mouseUpObserver.subscribe(this.onMouseUp);
		props.mouseDownObserver.subscribe(this.onMouseDown);
		props.mouseOffsetObserver.subscribe(this.onMouseMove);
	}

	public enableMove = () => {
		this.isMove = true;
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
}

export default ConstructorCamera;
