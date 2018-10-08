import * as React from 'react';
import * as ReactDOM from 'react-dom'
import {HashRouter, Link, Route} from "react-router-dom";
import ListView from "./Compositions/ListView";
import SpeakerView from "./Compositions/SpeakerView"

const App : React.SFC = (props: {}) => {
    return (
        <HashRouter>
            <div>
                <ul>
                    <li>
                        <Link to={"/"}>Double List</Link>
                    </li>
                    <li>
                        <Link to={"/view"}>Speaker viewt</Link>
                    </li>
                </ul>
                <Route exact={true} path={"/"} component={ListView}/>
                <Route path={"/view"} component={SpeakerView}/>
            </div>
        </HashRouter>
    )
};

ReactDOM.render(<App/>, document.getElementById("root"));