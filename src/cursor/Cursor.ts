class Cursor{

	private setCursor = (value: string) => {
		document.body.style.cursor = value;
	};

	public setCursorGrabbing = () => {
		this.setCursor('grabbing');
	}
	public setCursorGrab = () => {
		this.setCursor('grab');
	}
	public setCursorDefault = () => {
		this.setCursor('default');
	}
}
export default Cursor;
