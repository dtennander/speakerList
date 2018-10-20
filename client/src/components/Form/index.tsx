import * as React from "react";
import {ChangeEvent, FormEvent, PureComponent} from "react";
import * as css from "./styles.css"

interface FormProps {
    onAdd(name: string): void;
    placeholder? : string
}

interface FormState {
    value : string
}

class Form extends PureComponent<FormProps, FormState> {

    readonly state = {
        value: ""
    };

    render() {
        return (
            <form className={css.form} onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.handleChange} />
            </form>
        );
    }

    private readonly handleSubmit = (event : FormEvent) => {
        event.preventDefault();
        console.log("Submitting form: " + this.state.value);
        this.props.onAdd(this.state.value);
        this.setState({value: ""})
    };

    private readonly handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        this.setState({value: event.currentTarget.value});
    }
}

export default Form