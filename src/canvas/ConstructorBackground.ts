class ConstructorBackground {
	private readonly BACKGROUND_VALUE = 'linear-gradient(#000, transparent 1px),linear-gradient(90deg, #000, transparent 1px)';
	private readonly canvasElement: HTMLElement;

	constructor(canvasElement: HTMLElement) {
		this.canvasElement = canvasElement;

	}
	public setBackground = () => {
		this.canvasElement.style.background = this.BACKGROUND_VALUE;
		this.canvasElement.style.backgroundSize = '15px 15px';
	}
}

export default ConstructorBackground
