import DescartesPosition from '../utils/DescartesPosition';
import ConstructorBackground from '../utils/ConstructorBackground';

class ConstructorCanvas {
	private readonly DEFAULT_CANVAS_WIDTH = 3840;
	private readonly DEFAULT_CANVAS_HEIGHT = 2160;
	private readonly DEFAULT_CAMERA_POSITION_X = 1920;
	private readonly DEFAULT_CAMERA_POSITION_Y = 1080;

	private readonly constructorBackground: ConstructorBackground;
	private readonly canvasElement: HTMLElement;

	private positionX: number;
	private positionY: number;

	constructor() {
		this.positionX = this.DEFAULT_CAMERA_POSITION_X;
		this.positionY = this.DEFAULT_CAMERA_POSITION_Y;

		this.constructorBackground = new ConstructorBackground();
		this.canvasElement = document.createElement('canvas');
		this.canvasElement.style.position = 'absolute';
		this.canvasElement.style.width = `${this.DEFAULT_CANVAS_WIDTH+window.innerWidth}px`;
		this.canvasElement.style.height = `${this.DEFAULT_CANVAS_HEIGHT+window.innerHeight}px`;
		this.constructorBackground.setBackground(this.canvasElement)

	}

	public getPosition = (): DescartesPosition => ({
		x: this.positionX,
		y: this.positionY,
	});

	public getCanvasWidth = (): number => {
         return this.DEFAULT_CANVAS_WIDTH
	};

	public getCanvasHeight = (): number => {
		return this.DEFAULT_CANVAS_HEIGHT
	};

	public setPosition = (position: DescartesPosition) => {
		const { x, y } = position;
	    this.positionX = x;
		this.positionY = y;

		this.canvasElement.style.left = `${this.DEFAULT_CANVAS_WIDTH / 2 - x}px`;
		this.canvasElement.style.top = `${this.DEFAULT_CANVAS_HEIGHT / 2 - y}px`;
	};

	public stopScroll = (): void => {
		document.addEventListener('keydown', this.scroll);
	};

	private scroll = (ev: KeyboardEvent) => {
		if (ev.key === ' ' && ev.target === document.body) { ev.preventDefault(); }
	};

	public getElement = (): HTMLElement => this.canvasElement;
}

export default ConstructorCanvas;
