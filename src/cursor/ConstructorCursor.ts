import MouseUpObserver from '../observers/mouseObservers/MouseUpObserver';
import MouseDownObserver from '../observers/mouseObservers/MouseDownObserver';
import KeyDownObserver from '../observers/keyObservers/KeyDownObserver';
import KeyUpObserver from '../observers/keyObservers/KeyUpObserver';
import Cursor from './Cursor';

interface CursorProps {
	mouseUpObserver: MouseUpObserver,
	mouseDownObserver: MouseDownObserver,
	spaceDownObserver: KeyDownObserver,
	spaceUpObserver: KeyUpObserver,
}
class ConstructorCursor {
	private readonly cursor: Cursor;
    private spacePress: boolean;
	private mousePress: boolean;
	constructor (props: CursorProps) {
		this.spacePress = false;
		this.mousePress = false;

		this.cursor = new Cursor();

		props.spaceDownObserver.subscribe(this.onKeyDown);
		props.spaceUpObserver.subscribe(this.onKeyUp);
		props.mouseUpObserver.subscribe(this.onMouseUp);
		props.mouseDownObserver.subscribe(this.onMouseDown);

	}
	private onMouseDown = () => {
		this.mousePress = true;
		if (this.spacePress)
		this.cursor.setCursorGrabbing();
	};

	private onMouseUp = () => {
		this.mousePress = false;
	};

	private onKeyDown = (ev: KeyboardEvent) => {
		if (ev.key === ' ') {
			this.spacePress = true;
			 if (!this.mousePress) this.cursor.setCursorGrab();
		}
	};
	private onKeyUp = (ev: KeyboardEvent) => {
		if (ev.key === ' ') {
			this.cursor.setCursorDefault();
			this.spacePress = false;
		}
	};
}
export default ConstructorCursor;
