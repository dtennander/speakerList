import * as React from "react";
import {PureComponent} from "react";
import {getSpeaker, markSpeakerAsSpoken} from "actions";
import KeyboardListener from "components/KeyboardListener";
import * as css from "./styles.css"
import TouchListener from "components/TouchListener";
import Timer = NodeJS.Timer;

interface State {
    speaker : string
}

class SpeakerView extends PureComponent<{}, State> {

    readonly state = {speaker: ""};
    private timer: Timer;

    constructor(props : {}) {
        super(props);
        this.updateSpeaker = this.updateSpeaker.bind(this);
        this.setSpeakerAsSpoken = this.setSpeakerAsSpoken.bind(this);
    }

    componentDidMount(): void {
        this.updateSpeaker();
        this.timer = setInterval(() => this.updateSpeaker(), 1000);
    }

    componentWillUnmount(): void {
        clearInterval(this.timer);
        this.timer = null;
    }

    updateSpeaker() {
        getSpeaker()
            .then(speaker => this.setState({speaker: speaker}))
            .catch(err => {
                console.log(err)
                this.setState({speaker: ""})
            })
    }

    render(): React.ReactNode {
        return (
            <div className={css.speakerView}>
                <KeyboardListener keyboardKey={" "} onKeyPress={this.setSpeakerAsSpoken}/>
                <TouchListener onTouch={this.setSpeakerAsSpoken}/>
                <h1>{this.state.speaker}</h1>
            </div>
        )
    }

    readonly setSpeakerAsSpoken = () => {
        console.log("Got space keyboard event!");
        markSpeakerAsSpoken(this.state.speaker)
            .then(() => this.updateSpeaker());
    }
}

export default SpeakerView