import React from 'react';
const child = (props) => {
    const {info}=props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{info.parent_name}</h5>
                        <h2>{info.phone_num}</h2>
                        <h2>{info.name}</h2>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default child