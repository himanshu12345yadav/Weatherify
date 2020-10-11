import React from 'react';

class Callout extends React.Component {
    render() {
        return (
            <>
                <div className="callout-wrapper">
                    <div className="callout top">
                        Click here to search for weather
                        <button
                            className="close-callout"
                            onClick={this.props.closeCallout}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default Callout;
