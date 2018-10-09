import {PureComponent} from "react";
import * as React from "react";

interface ListenerProps {
    onTouch() : void
}

class TouchListener extends PureComponent<ListenerProps> {

    constructor(props: ListenerProps) {
        super(props);
        this.touchEvent = this.touchEvent.bind(this);
    }

    componentDidMount(): void {
        window.addEventListener("touchstart", this.touchEvent)
    }

    render(): React.ReactNode {
        return null
    }

    private touchEvent(event : KeyboardEvent) {
        console.log("Got touch event!");
        this.props.onTouch();
    }
}

export default TouchListener