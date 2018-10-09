import * as React from 'react';
import * as ReactDOM from 'react-dom'
import {HashRouter, NavLink, Route} from "react-router-dom";
import ListView from "./compositions/ListView";
import SpeakerView from "./compositions/SpeakerView"
import * as styles from "./styles.css"

const App : React.SFC = (props: {}) => {
    return (
        <HashRouter>
            <div>
                <div className={styles.header}>
                    <ul>
                        <li>
                            <NavLink exact={true} to="/" activeClassName={styles.active}>Double List</NavLink>
                        </li>
                        <li>
                            <NavLink to="/view" activeClassName={styles.active}>Speaker view</NavLink>
                        </li>
                    </ul>
                </div>
                <Route exact={true} path={"/"} component={ListView}/>
                <Route path={"/view"} component={SpeakerView}/>
            </div>
        </HashRouter>
    )
};

ReactDOM.render(<App/>, document.getElementById("root"));