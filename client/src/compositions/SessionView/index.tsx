import * as React from "react";
import {PureComponent} from "react";
import * as styles from "./styles.css";
import {NavLink, Route, RouteComponentProps} from "react-router-dom";
import {UrlParams} from "models";
import SpeakerView from "compositions/SpeakerView";
import ListView from "compositions/ListView";
import ShareScreen from "components/ShareScreen"
import {getSpeaker} from "actions";

const LEFT_ARROW = <div dangerouslySetInnerHTML={{__html: "&LeftArrow;"}}/>;

interface SessionViewState {
    share : boolean
}

class SessionView extends PureComponent<RouteComponentProps<UrlParams>, SessionViewState> {

    readonly state : SessionViewState= {share: false};

    componentDidMount(): void {
        getSpeaker(this.props.match.params.id)
            .catch(() => this.props.history.push("/"))
    }

    render() {
        return (
            <div>
                <div className={styles.header}>
                    <ul>
                        <li>
                            <NavLink exact={true} to={"/"} activeClassName={styles.active}>{LEFT_ARROW}</NavLink>
                        </li>
                        <li>
                            <NavLink exact={true} to={"/" + this.props.match.params.id} activeClassName={styles.active}>
                                Double List</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/" + this.props.match.params.id + "/speaker"} activeClassName={styles.active}>
                                Speaker view</NavLink>
                        </li>
                        <li>
                            <button onClick={() => this.toggleShareScreen()}>Share</button>
                        </li>
                    </ul>
                </div>
                <Route path={"/:id/speaker"} component={SpeakerView}/>
                <Route exact={true} path={"/:id"} component={ListView}/>
                {this.state.share &&
                    (<ShareScreen
                        url={window.location.href}
                        id={this.props.match.params.id}
                        onClose={() => this.toggleShareScreen()}/>)}
            </div>
        )
    }

    private toggleShareScreen() {
        this.setState(oldState => {
            return {share: !oldState.share}
        })
    }
}

export default SessionView;