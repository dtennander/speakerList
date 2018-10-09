import {PureComponent} from "react";
import * as React from "react";

interface ListenerProps {
    keyboardKey : string
    onKeyPress() : void
}

class KeyboardListener extends PureComponent<ListenerProps> {

    constructor(props: ListenerProps) {
        super(props);
        this.keyEvent = this.keyEvent.bind(this);
    }

    componentDidMount(): void {
        window.addEventListener("keyup", this.keyEvent)
    }

    render(): React.ReactNode {
        return null
    }

    private keyEvent(event : KeyboardEvent) {
        console.log("Got Key event!");
        if (event.key === this.props.keyboardKey) {
            this.props.onKeyPress();
        }
    }
}

export default KeyboardListener