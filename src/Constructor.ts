import MouseOffsetObserver from './observers/mouseObservers/MouseOffsetObserver';
import ConstructorCamera from './camera/ConstructorCamera';
import MouseDownObserver from './observers/mouseObservers/MouseDownObserver';
import MouseUpObserver from './observers/mouseObservers/MouseUpObserver';
import KeyDownObserver from './observers/keyObservers/KeyDownObserver';
import KeyUpObserver from './observers/keyObservers/KeyUpObserver';
import ConstructorCursor from './cursor/ConstructorCursor';

class Constructor {
	private readonly containerElement: HTMLElement;
	private readonly mouseOffsetObserver: MouseOffsetObserver;
	private readonly mouseDownObserver: MouseDownObserver;
	private readonly mouseUpObserver: MouseUpObserver;
	private readonly spaceDownObserver: KeyDownObserver;
	private readonly spaceUpObserver: KeyUpObserver;
	private readonly camera: ConstructorCamera;
	private readonly cursor: ConstructorCursor;



	constructor(container: HTMLElement) {
		// точка входа
		this.containerElement = container;


		this.mouseUpObserver = new MouseUpObserver();
		this.mouseDownObserver = new MouseDownObserver();
		this.mouseOffsetObserver = new MouseOffsetObserver();
		this.spaceDownObserver = new KeyDownObserver();
		this.spaceUpObserver = new KeyUpObserver();


		this.camera = new ConstructorCamera({
			mouseUpObserver: this.mouseUpObserver,
			mouseDownObserver: this.mouseDownObserver,
			mouseOffsetObserver: this.mouseOffsetObserver,
			spaceDownObserver: this.spaceDownObserver,
			spaceUpObserver: this.spaceUpObserver,
		});
		this.cursor = new ConstructorCursor({
			mouseUpObserver: this.mouseUpObserver,
			mouseDownObserver: this.mouseDownObserver,
			spaceDownObserver: this.spaceDownObserver,
			spaceUpObserver: this.spaceUpObserver,
		});

		const cameraElement = this.camera.getCanvasElement();

		this.containerElement.append(cameraElement);
	}
}

export default Constructor;
