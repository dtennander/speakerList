import * as React from "react";
import {RefObject, SFC} from "react";
import * as css from "./styles.css"
import {createList, getSpeaker} from "actions";
import {RouteComponentProps} from "react-router";

const keyInputRef : RefObject<HTMLInputElement> = React.createRef();

const HomeView : SFC<RouteComponentProps> = (props: RouteComponentProps) =>  {
    function goToNewList() {
        createList()
            .then(id => props.history.push(id))
    }

    function redirectToSession() {
        let id = keyInputRef.current.value;
        keyInputRef.current.value = "";
        getSpeaker(id)
            .then(() => props.history.push(id))
            .catch(() => console.log("List not present!"))
    }

    return (
            <div className={css.homeView}>
                <h1>Welcome to SpeakList!</h1>
                <p>Here you can create your own speakers list for every occasion!</p>
                <button onClick={() => goToNewList()}>Create a Speakers list!</button>
                <h4>or join an excising one</h4>
                <form>
                    <input ref={keyInputRef} placeholder={"List key..."}/>
                    <button onClick={redirectToSession} className={css.joinButton}>join!</button>
                </form>
                <svg className={css.wave} viewBox={"0 0 500 500"} preserveAspectRatio={"none"}>
                    <defs>
                        <linearGradient id={"Gradient1"} x1={"0"} x2={"1"} y1={"0"} y2={"1"}>
                            <stop offset="0%" stopColor="#1b2f52"/>
                            <stop offset="100%" stopColor="#467cd6"/>
                        </linearGradient>
                    </defs>
                    <path d={"M0,90 C150,30 350,170 500,90 L500,500 L0,500 Z"} style={{stroke: "none", fill:"url(#Gradient1)"}}/>
                </svg>
                <div className={css.background}/>
            </div>
        );
};



export default HomeView;