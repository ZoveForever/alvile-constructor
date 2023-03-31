import DescartesPosition from '../utils/DescartesPosition';

class ConstructorCanvas {
	private readonly DEFAULT_CANVAS_WIDTH = 3840;
	private readonly DEFAULT_CANVAS_HEIGHT = 2160;
	private readonly DEFAULT_CAMERA_POSITION_X = 1920;
	private readonly DEFAULT_CAMERA_POSITION_Y = 1080;

	private readonly BACKGROUND_VALUE = 'linear-gradient(#000, transparent 1px),linear-gradient(90deg, #000, transparent 1px)';

	private readonly canvasElement: HTMLElement;

	private positionX: number;
	private positionY: number;

	constructor() {
		this.positionX = this.DEFAULT_CAMERA_POSITION_X;
		this.positionY = this.DEFAULT_CAMERA_POSITION_Y;

		this.canvasElement = document.createElement('canvas');
		this.canvasElement.style.position = 'absolute';
		this.canvasElement.style.width = `${this.DEFAULT_CANVAS_WIDTH}px`;
		this.canvasElement.style.height = `${this.DEFAULT_CANVAS_HEIGHT}px`;
		this.canvasElement.style.background = this.BACKGROUND_VALUE;
		this.canvasElement.style.backgroundSize = '30px 30px';
	}

	public getPosition = (): DescartesPosition => ({
		x: this.positionX,
		y: this.positionY,
	});

	public setPosition = (position: DescartesPosition) => {
		const { x, y } = position;

		this.positionX = x;
		this.positionY = y;

		this.canvasElement.style.left = `${this.DEFAULT_CANVAS_WIDTH / 2 - x}px`;
		this.canvasElement.style.top = `${this.DEFAULT_CANVAS_HEIGHT / 2 - y}px`;

	};

	// public setCursor = (value: string) => {
	// 	document.body.style.cursor = value;
	// };

	public stopScroll = (): void => {
		document.addEventListener('keydown', this.scroll);
	};

	private scroll = (ev: KeyboardEvent) => {
		if (ev.key === ' ' && ev.target === document.body) { ev.preventDefault(); }
	};

	public getElement = (): HTMLElement => this.canvasElement;
}

export default ConstructorCanvas;
