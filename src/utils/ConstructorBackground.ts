class ConstructorBackground {
	private readonly BACKGROUND_VALUE = 'linear-gradient(#000, transparent 1px),linear-gradient(90deg, #000, transparent 1px)';

	public setBackground = (canvasElement: HTMLElement) => {
		canvasElement.style.background = this.BACKGROUND_VALUE;
		canvasElement.style.backgroundSize = '18px 18px';
	}
}

export default ConstructorBackground
