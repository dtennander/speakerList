import * as React from "react";
import * as styles from "../../styles.css";
import {NavLink, Route, RouteComponentProps} from "react-router-dom";
import {UrlParams} from "../../index";
import SpeakerView from "compositions/SpeakerView";
import ListView from "compositions/ListView";

const IdView = (props : RouteComponentProps<UrlParams>) => {
    return (
        <div>
            <div className={styles.header}>
                <ul>
                    <li>
                        <NavLink exact={true} to={"/"} activeClassName={styles.active}>←</NavLink>
                    </li>
                    <li>
                        <NavLink exact={true} to={"/" + props.match.params.id} activeClassName={styles.active}>Double List</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/" + props.match.params.id + "/speaker"} activeClassName={styles.active}>Speaker view</NavLink>
                    </li>
                </ul>
            </div>

            <Route path={"/:id/speaker"} component={SpeakerView}/>
            <Route exact={true} path={"/:id"} component={ListView}/>
        </div>
    )
};

export default IdView