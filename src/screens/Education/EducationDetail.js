import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestDetail } from "store/actions/Info";
import "./EducationDetail.scss";
import { Card } from 'antd';

const EducationDetail = ({ match }) => {
    const dispatch = useDispatch();
    const details = useSelector(state => state.educationReducer.detail);

    useEffect(() => {
        dispatch(requestDetail(match.params.id));
    }, []);

    return (
        <div> 
            <Card>
                <div className="detailBox">
                    {details.photo? <div className="box"><img className="image" src={details.photo.photo}></img></div> : null}
                    {details.title? <div className="box">{details.title}</div> : null}
                    {details.content? <div className="box">{details.content}</div> : null}
                    {details.location?<div className="box">{details.location}</div> : null}
                </div>
            </Card>
        </div>
    );
};

export default EducationDetail;
