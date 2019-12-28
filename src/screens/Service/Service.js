import React, { useState, useCallback } from "react";
import "./Service.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import Footer from "component/Footer";
import RadioButton from "antd/lib/radio/radioButton";

const Service = () => {
    const [tab, setTab] = useState("introduce");

    const [ask, setAsk] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const categorys = ["1:1 문의", "수정 요청", "게시 요청"];
    const [category, setCategory] = useState(categorys[0]);

    const onChangeTitle = useCallback(e => {
        setTitle(e.target.value);
    }, []);

    const onChangeContent = useCallback(e => {
        setContent(e.target.value);
    }, []);

    const onSubmit = () => {};

    const onAsk = ask => {
        setAsk(ask);
    };

    const onChangeTab = tab => {
        setTab(tab);
    };

    const onChangeCategory = category => {
        switch (category) {
            case category[0]:
                setCategory("help");
                break;
            case category[1]:
                setCategory("modify");
                break;
            case category[2]:
                setCategory("post");
                break;
            default:
                break;
        }
    };

    return (
        <div className="service-wrap">
            <div className="head">
                <div className="text">고객센터</div>
            </div>
            <div className="content-box">
                <div className="tab-box">
                    <div className="tab" onClick={() => onChangeTab("introduce")}>
                        Cogether 소개
                    </div>
                    <div className="tab" onClick={() => onChangeTab("question")}>
                        자주 묻는 질문
                    </div>
                    <div
                        className="tab"
                        onClick={() => {
                            onChangeTab("ask");
                            onAsk(false);
                        }}
                    >
                        내 문의 목록
                    </div>
                </div>

                {tab === "introduce" ? (
                    <div className="service-box">
                        <div className={tab}>어서오세요, Cogether 입니다.</div>
                    </div>
                ) : tab === "question" ? (
                    <div className="service-box">
                        <div className={tab}>질문리스트</div>
                    </div>
                ) : (
                    <div className="service-box">
                        <div className={tab}>
                            <div className="ask-head">
                                <div className="text">
                                    {ask ? "1:1 문의 내용을 입력해주세요 " : "궁금한 점이 있으시다면 1:1 문의를 이용해주세요."}
                                </div>
                                {ask ? (
                                    <button
                                        className="submit-btn"
                                        onClick={() => {
                                            onSubmit();
                                            onAsk(false);
                                        }}
                                    >
                                        문의 제출하기
                                    </button>
                                ) : (
                                    <button className="ask-btn" onClick={() => onAsk(true)}>
                                        1:1 문의하기
                                    </button>
                                )}
                            </div>
                            {ask ? (
                                <div className="ask-page">
                                    <div className="type">
                                        <div className="text">유형</div>
                                        <div className="category">
                                            <div className="item">
                                                <input className="radio" type="radio" name="category" value="post"></input>
                                                <span>게시 요청</span>
                                            </div>
                                            <div className="item">
                                                <input className="radio" type="radio" name="category" value="modify"></input>
                                                <span>수정 요청</span>
                                            </div>
                                            <div className="item">
                                                <input className="radio" type="radio" name="category" value="help"></input>
                                                <span>기타 문의</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="title">
                                        <div className="text">제목</div>
                                        <input value={title} onChange={onChangeTitle}></input>
                                    </div>
                                    <div className="content">
                                        <div className="text">문의 내용</div>
                                        <input value={content} onChange={onChangeContent}></input>
                                    </div>
                                </div>
                            ) : (
                                <div className="ask-list">
                                    <div className="index">
                                        <div className="type">유형</div>
                                        <div className="title">제목</div>
                                        <div className="date">작성일</div>
                                        <div className="status">처리상태</div>
                                    </div>
                                    {/* {
                                    asks.map()
                                } */}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Service;
