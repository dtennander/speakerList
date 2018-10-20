import * as React from 'react';
import * as ReactDOM from 'react-dom'
import * as styles from './styles.css'
import {BrowserRouter, Route} from "react-router-dom";
import HomeView from "compositions/HomeView";
import SessionView from "compositions/SessionView";

const App : React.SFC = (props: {}) => {
    return (
        <BrowserRouter>
            <div id={styles.app}>
                <Route exact={true} path={"/"} component={HomeView}/>
                <Route path={"/:id"} component={SessionView}/>
            </div>
        </BrowserRouter>
    )
};

ReactDOM.render(<App/>, document.getElementById("root"));