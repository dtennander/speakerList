import * as React from "react";
import {PureComponent, RefObject} from "react";
import * as styles from "./styles.css";

const CLIP_BOARD = <div dangerouslySetInnerHTML={{__html: "&#128203;"}}/>;

interface ShareScreenProps {
    url: string,
    id: string,
    onClose:()=> void
}

class ShareScreen extends PureComponent<ShareScreenProps> {

    splashScreenInput : RefObject<HTMLInputElement>;
    containerRef: RefObject<HTMLDivElement>;

    constructor(props : ShareScreenProps) {
        super(props);
        this.splashScreenInput = React.createRef();
        this.containerRef = React.createRef();
    }

    componentDidMount(): void {
        document.addEventListener(
            "mousedown", (event) => this.handleClickAnyWare(event))
    }

    componentWillUnmount(): void {
        document.removeEventListener(
            "mousedown", (event) => this.handleClickAnyWare(event))
    }

    render() {
        return (
            <div ref={this.containerRef} className={styles.spashScreen}>
                <button onClick={this.props.onClose} className={styles.exitButton}>x</button>
                <p>Share this list by sending this link:</p>
                <input ref={this.splashScreenInput}
                       onSelect={(event) => event.currentTarget.setSelectionRange(0,9999)}
                       readOnly={true}
                       value={this.props.url}/>
                <button onClick={() => this.handleClickOnCopyButton()}>{CLIP_BOARD}</button>
                <div><p>Or giving them this key: <b>{this.props.id}</b></p></div>
            </div>
        );
    }

    handleClickOnCopyButton = () => {
        this.splashScreenInput.current.setSelectionRange(0,9999);
        document.execCommand('copy');
    };

    handleClickAnyWare = (event : MouseEvent) => {
        if (this.containerRef.current && !this.containerRef.current.contains((event.target as Node))) {
           this.props.onClose()
        }
    }

}

export default ShareScreen