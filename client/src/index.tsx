import * as React from 'react';
import * as ReactDOM from 'react-dom'
import {HashRouter, Route} from "react-router-dom";
import HomeView from "compositions/HomeView";
import IdView from "compositions/IdView";

export interface UrlParams {
    id : string
}

const App : React.SFC = (props: {}) => {
    return (
        <HashRouter>
            <div>
                <Route exact={true} path={"/"} component={HomeView}/>
                <Route path={"/:id"} component={IdView}/>
            </div>
        </HashRouter>
    )
};

ReactDOM.render(<App/>, document.getElementById("root"));