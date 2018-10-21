import * as React from "react";
import {RefObject, SFC} from "react";
import * as css from "./styles.css"
import {createList, getSpeaker} from "actions";
import {RouteComponentProps} from "react-router";

const GITHUB_LOGO = (
    <svg height="32" className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
        <path fill="white" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>);

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
                <h1>Welcome to SpeakerList!</h1>
                <p>Here you can create a speaker list for every occasion!</p>
                <button onClick={() => goToNewList()}>Create a Speakers list!</button>
                <h4>or join an existing one</h4>
                <div>
                    <input
                        onKeyPress={(e) => e.key == "Enter" ? redirectToSession() : {}}
                        ref={keyInputRef}
                        placeholder={"List key..."}/>
                    <button onClick={redirectToSession} className={css.joinButton}>join!</button>
                </div>
                <svg className={css.wave} viewBox={"0 0 500 500"} preserveAspectRatio={"none"}>
                    <defs>
                        <linearGradient id={"Gradient1"} x1={"0"} x2={"1"} y1={"0"} y2={"1"}>
                            <stop offset="0%" stopColor="#1b2f52"/>
                            <stop offset="100%" stopColor="#467cd6"/>
                        </linearGradient>
                    </defs>
                    <path d={"M0,90 C150,30 350,170 500,90 L500,500 L0,500 Z"}
                          style={{stroke: "none", fill: "url(#Gradient1)"}}/>
                </svg>
                <div className={css.background}/>
                <div className={css.footer}>
                    <div className={css.createdBy}>
                        Created by <a href={"mailto:david.tennander+speaker@gmail.com"}>David Tennander</a>
                    </div>
                    <div className={css.githubLink}>
                        <a href={"https://github.com/DiTo04/speakerList"}>{GITHUB_LOGO}</a>
                    </div>
                </div>
            </div>
        );
};

export default HomeView;