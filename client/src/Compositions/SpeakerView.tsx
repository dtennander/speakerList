import * as React from "react";
import {PureComponent} from "react";
import {getSpeaker, markSpeakerAsSpoken} from "../actions";
import KeyboardListener from "../Components/KeyboardListener";
import * as css from "./SpeakerView.css"

interface State {
    speaker : string
}

class SpeakerView extends PureComponent<{}, State> {

    readonly state = {speaker: ""};

    constructor(props : {}) {
        super(props);
        this.updateSpeaker = this.updateSpeaker.bind(this);
        this.setSpeakerAsSpoken = this.setSpeakerAsSpoken.bind(this);
    }

    componentDidMount(): void {
        this.updateSpeaker();
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