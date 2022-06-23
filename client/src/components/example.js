import { Component } from 'react';

class Example extends Component {
    constructor() {
        super();
        this.state = {
            result: ""
        }
    }

    componentDidMount() {
        fetch('/example')
            .then((res) => res.json())
            .then(data => this.setState({ result: data.message }));
    }

    render() {
        return (
            <div>{this.state.result}</div>
        )
    }
}

export default Example;