import ConstructorCanvas from '../canvas/ConstructorCanvas';
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
		/todo Переделать как и onRightMouseDown/
		props.mouseDownObserver.subscribe(this.onRightMouseDown);
	}

	public enableMove = () => {
		if (this.spacePress) { this.isMove = true;}
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
		if (currentPosition.x - offsetX < this.canvas.getCanvasWidth()/2 || currentPosition.x - offsetX > this.canvas.getCanvasWidth()+window.innerWidth ) { return;}
		if (currentPosition.y - offsetY < this.canvas.getCanvasHeight()/2 || currentPosition.y - offsetY > this.canvas.getCanvasHeight()+window.innerHeight) { return;}
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

	private onRightMouseDown = (ev: MouseEvent) => {
		   const currentPosition = this.canvas.getPosition
           if(ev.button === 2) {
			   console.log(`Координата X: ${currentPosition().x} Коориданта Y: ${currentPosition().y}`);
		   }

	};

	private onKeyDown = (ev: KeyboardEvent) => {
		if (ev.key === ' ') {
			this.spacePress = true;
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
