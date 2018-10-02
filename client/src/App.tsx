import * as React from "react";
import List from "./Components/List";
import Form from "./Components/Form"

interface AppState {
    first : string[]
    second : string[]
}

class App extends React.Component<{}, AppState> {

    constructor(props : {}) {
        super(props);
        this.state = {
            first: ["David", "Fanny", "Theodor"],
            second: ["LOL"],
        };

        this.addToFirstList = this.addToFirstList.bind(this);
        this.addToSecondList = this.addToSecondList.bind(this);
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

    private async addToFirstList(name : string) {
        const rsp = await App.postUserToList(name, "first");
        if (rsp.ok) {
            const list = await rsp.json();
            this.setState({first: list});
        }
    }

    private async addToSecondList(name : string) {
        const rsp = await App.postUserToList(name, "second");
        if (rsp.ok) {
            const list = await rsp.json();
            this.setState({second: list});
        }
    }

    private static async postUserToList(name : string, list : string) {
        const rsp = await fetch("/api/double/" + list, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
            })
        });
        console.log(rsp);
        return rsp;
    }
}

export default App;