import MouseOffsetObserver from './observers/mouseObserver/MouseOffsetObserver';
import ConstructorCamera from './camera/ConstructorCamera';
import MouseDownObserver from './observers/mouseObserver/MouseDownObserver';
import MouseUpObserver from './observers/mouseObserver/MouseUpObserver';
import KeyDownObserver from './observers/spaceObserver/KeyDownObserver';
import KeyUpObserver from './observers/spaceObserver/KeyUpObserver';

class Constructor {
	private readonly containerElement: HTMLElement;
	private readonly mouseOffsetObserver: MouseOffsetObserver;
	private readonly mouseDownObserver: MouseDownObserver;
	private readonly mouseUpObserver: MouseUpObserver;
	private readonly spaceDownObserver: KeyDownObserver;
	private readonly spaceUpObserver: KeyUpObserver;
	private readonly camera: ConstructorCamera;

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
		const cameraElement = this.camera.getCanvasElement();

		this.containerElement.append(cameraElement);
	}
}

export default Constructor;
