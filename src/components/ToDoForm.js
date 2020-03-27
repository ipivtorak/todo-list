import React from 'react';

export default class TodoForm extends React.Component {

    state = {
        text: ''
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.text !== '') {
            this.props.onSubmit({
                id: Math.random().toString(36).substr(2, 3),
                text: this.state.text,
                complete: false
            });
            this.setState({
                text: ''
            });
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input name="text"
                       placeholder="to do..."
                       onChange={this.handleChange}
                       value={this.state.text}
                />
                <button onClick={this.handleSubmit}>Add</button>
            </form>
        );
    }


}