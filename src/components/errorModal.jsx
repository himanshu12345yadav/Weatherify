import React from 'react';

class ErrorModal extends React.Component {
    render() {
        return (
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">Something went Wrong?</div>
                    <div className="modal-body">
                        <span className="material-icons">report_problem</span>
                        {this.props.errorCause === 'emptyCountry' ? (
                            <div className="modal-message">
                                City Name Cannot be empty!
                            </div>
                        ) : (
                            <div className="modal-message">
                                Check City Name and try Again!
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            className="modal-close"
                            onClick={this.props.closeModal}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ErrorModal;
