import * as React from 'react';
import * as ReactDOM from 'react-dom'
import * as styles from './styles.css'
import {HashRouter, Route} from "react-router-dom";
import HomeView from "compositions/HomeView";
import SessionView from "compositions/SessionView";

const App : React.SFC = (props: {}) => {
    return (
        <HashRouter>
            <div id={styles.app}>
                <Route exact={true} path={"/"} component={HomeView}/>
                <Route path={"/:id"} component={SessionView}/>
            </div>
        </HashRouter>
    )
};

ReactDOM.render(<App/>, document.getElementById("root"));