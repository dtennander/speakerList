import * as React from "react";
import List from "../Components/List";
import Form from "../Components/Form";
import {getList, ListType, postUserToList, resetLists} from "../actions";
import * as css from "./ListView.css";


interface AppState {
    first : string[]
    second : string[]
}

class ListView extends React.Component<{}, AppState> {

    constructor(props : {}) {
        super(props);
        this.state = {
            first: [],
            second: [],
        };

        this.addToFirstList = this.addToFirstList.bind(this);
        this.addToSecondList = this.addToSecondList.bind(this);
        this.resetList = this.resetList.bind(this);
    }

    componentDidMount(): void {
        getList(ListType.first)
            .then(list => this.setState({first: list}));
        getList(ListType.second)
            .then(list => this.setState({second: list}))
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
        postUserToList(name, "first")
            .then(list => this.setState({first: list}));
    }

    private addToSecondList(name : string) {
        postUserToList(name, "second")
            .then(list => this.setState({second: list}));
    }

    private resetList() {
        resetLists()
            .then(() => this.componentDidMount())
    }
}

export default ListView;