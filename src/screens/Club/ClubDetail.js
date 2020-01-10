import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestDetail } from "store/actions/Info";
import "./ClubDetail.scss";
import { Card } from "antd";
import parse from 'html-react-parser';

const ClubDetail = ({ match }) => {
    const dispatch = useDispatch();
    const details = useSelector(state => state.clubReducer.detail);

    const [small, setSmall] = useState(false);
    const [size, setSize] = useState(0);

    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    
    useEffect(() => {
        if (size > 1100) {
            setSmall(false);
        } else {
            setSmall(true);
        }
    }, [size]);

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
                    
                    {details.title ? 
                        <>
                            <div className="seperator">Title</div>
                            <div className="box">{details.title}</div>
                        </> : null}

                    {details.content ? (
                        <>
                            <div className="seperator">About</div>
                            <div className="box">
                                {parse(''.concat(details.content.replace(/src=/g,`style="width: ${small ? '300px' : '620px'}; height: auto;" src=`)))}
                            </div>
                        </>
                    ) : null}

                    {details.location ? 
                        <>
                            <div className="seperator">Where</div>
                            <div className="box">{details.location}</div> 
                        </> : null}

                    <div className="link">
                        <a href={`javascript:window.open('${details.external_link}')`}>더 자세히 알아보기</a>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ClubDetail;
