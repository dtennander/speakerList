import * as React from "react";
import {ChangeEvent, FormEvent, PureComponent} from "react";

interface FormProps {
    onAdd(name: string): void;
}

interface FormState {
    value : string
}

export default class Form extends PureComponent<FormProps, FormState> {

    readonly state = {
        value: ""
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange} />
                <button>Add</button>
            </form>
        );
    }

    private readonly handleSubmit = (event : FormEvent) => {
        event.preventDefault();
        console.log("Submitting form: " + this.state.value);
        this.props.onAdd(this.state.value)
        this.setState({value: ""})
    };

    private readonly handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        this.setState({value: event.currentTarget.value});
    }
}