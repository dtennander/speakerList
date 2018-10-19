import * as React from "react";
import {Ref} from "react";
import * as styles from "./styles.css";

const splashScreenInput : Ref<HTMLInputElement> = React.createRef();

const ShareScreen = (props : {url: string, onClose:()=> void}) => (
    <div className={styles.spashScreen}>
        <button onClick={props.onClose} className={styles.exitButton}>x</button>
        <p>Share this list by sending this link:</p>
        <input ref={splashScreenInput} onSelect={(event) => event.currentTarget.select()} readOnly={true} value={props.url}/>
        <button onClick={(event) => handleClickOnCopyButton()}>📋</button>
    </div>
);

const handleClickOnCopyButton = () => {
    splashScreenInput.current.select();
    document.execCommand('copy');
};

export default ShareScreen