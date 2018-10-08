import * as React from "react";
import List from "../Components/List";
import Form from "../Components/Form";
import {getList, ListType, postUserToList} from "../actions";

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
    }

    componentDidMount(): void {
        getList(ListType.first)
            .then(list => this.setState({first: list}));
        getList(ListType.second)
            .then(list => this.setState({second: list}))
    }

    render() {
        return (
            <div>
                <h2>First List</h2>
                <List data={this.state.first}/>
                <Form onAdd={this.addToFirstList}/>

                <h2>Second List</h2>
                <List data={this.state.second}/>
                <Form onAdd={this.addToSecondList}/>
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
}

export default ListView;