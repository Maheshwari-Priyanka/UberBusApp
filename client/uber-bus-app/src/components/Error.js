import { Component } from "react";

class Error extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ marginTop: "10%" }}>
                <h3 style={{textAlign: "center", color: "red"}}>
                    Page doesn't exist
                </h3>
            </div>
        )
    }
}

export default Error