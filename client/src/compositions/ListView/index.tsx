import * as React from "react";
import List from 'components/List';
import Form from "components/Form";
import {getList, ListType, postUserToList, resetLists} from "actions";
import * as css from "./styles.css";
import {Speaker} from "models";
import Timer = NodeJS.Timer;
import {RouteComponentProps} from "react-router";
import {UrlParams} from "../../index";


interface AppState {
    first : Speaker[]
    second : Speaker[]
}

class ListView extends React.Component<RouteComponentProps<UrlParams>, AppState> {
    private timer: Timer;

    constructor(props : RouteComponentProps<UrlParams>) {
        super(props);
        this.state = {
            first: [],
            second: [],
        };

        this.addToFirstList = this.addToFirstList.bind(this);
        this.addToSecondList = this.addToSecondList.bind(this);
        this.resetList = this.resetList.bind(this);
    }

    componentWillUnmount() : void {
        clearInterval(this.timer);
        this.timer = null;
    }

    componentDidMount(): void {
        this.pollApi();
        this.timer = setInterval(() => this.pollApi(), 1000);
    }

    pollApi() : void {
        getList(this.props.match.params.id, ListType.first)
            .then(list => this.setState({first: list}));
        getList(this.props.match.params.id, ListType.second)
            .then(list => this.setState({second: list}));
    }

    render() {
        return (
            <div className={css.listView}>
                <div className={css.lists}>
                    <div className={css.list}>
                        <h2>First List</h2>
                        <div>
                            <List data={this.state.first}/>
                            <Form onAdd={this.addToFirstList}
                                  placeholder={"Add speaker..."}/>
                        </div>
                    </div>
                    <div className={css.list}>
                        <h2>Second List</h2>
                        <div>
                            <List data={this.state.second}/>
                            <Form onAdd={this.addToSecondList}
                                  placeholder={"Add speaker..."}/>
                        </div>
                    </div>
                </div>
                <div className={css.buttonDiv}>
                    <button onClick={this.resetList}>Next Question!</button>
                </div>
            </div>
        );
    }

    private addToFirstList(name : string) {
        postUserToList(this.props.match.params.id, name, "first")
            .then(list => this.setState({first: list}));
    }

    private addToSecondList(name : string) {
        postUserToList(this.props.match.params.id, name, "second")
            .then(list => this.setState({second: list}));
    }

    private resetList() {
        resetLists(this.props.match.params.id)
            .then(() => this.componentDidMount())
    }
}

export default ListView;