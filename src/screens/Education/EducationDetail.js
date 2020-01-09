import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestDetail } from "store/actions/Info";
import "./EducationDetail.scss";
import { Card } from "antd";

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
                    {details.photo ? (
                        <div className="box">
                            <img className="image" src={details.photo.photo}></img>
                        </div>
                    ) : null}
                    <div className="link">
                        <a href={`javascript:window.open('${details.external_link}')`}>더 자세히 알아보기</a>
                    </div>
                    {details.title ? 
                        <>
                            <div className="seperator">Title</div>
                            <div className="box">{details.title}</div>
                        </> : null}
                    {details.content ? (
                        <>
                            <div className="seperator">About</div>
                            <div className="box">
                                {details.content
                                    .replace(/(<br>|<br\/>|<br \/>|<p>|<\/p>)/g, "\n")
                                    .split("\n")
                                    .map(line => {
                                        return (
                                            <span>
                                                {line}
                                                <br />
                                            </span>
                                        );
                                    })}
                            </div>
                        </>
                    ) : null}
                    {details.location ? 
                        <>
                            <div className="seperator">Where</div>
                            <div className="box">{details.location}</div> 
                        </> : null}
                </div>
            </Card>
        </div>
    );
};

export default EducationDetail;
