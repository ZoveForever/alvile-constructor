import MouseUpObserver from '../observers/mouseObservers/MouseUpObserver';
import MouseDownObserver from '../observers/mouseObservers/MouseDownObserver';
import KeyDownObserver from '../observers/keyObservers/KeyDownObserver';
import KeyUpObserver from '../observers/keyObservers/KeyUpObserver';
interface CursorProps {
	mouseUpObserver: MouseUpObserver,
	mouseDownObserver: MouseDownObserver,
	spaceDownObserver: KeyDownObserver,
	spaceUpObserver: KeyUpObserver,
}
class Cursor {
    private spacePress: boolean;
	private mousePress: boolean;
	constructor (props: CursorProps) {
		this.spacePress = false;
		this.mousePress = false;

		props.spaceDownObserver.subscribe(this.onKeyDown);
		props.spaceUpObserver.subscribe(this.onKeyUp);
		props.mouseUpObserver.subscribe(this.onMouseUp);
		props.mouseDownObserver.subscribe(this.onMouseDown);

	}
	private setCursor = (value: string) => {
		document.body.style.cursor = value;
	};
	private onMouseDown = () => {
		this.mousePress = true;
		if (this.spacePress) this.setCursor('grabbing');
	};

	private onMouseUp = () => {
		this.mousePress = false;
	};

	private onKeyDown = (ev: KeyboardEvent) => {
		if (ev.key === ' ') {
			this.spacePress = true;
			 if (!this.mousePress) this.setCursor('grab');
		}
	};
	private onKeyUp = (ev: KeyboardEvent) => {
		if (ev.key === ' ') {
			this.setCursor('default');
			this.spacePress = false;
		}
	};
}
export default Cursor;
