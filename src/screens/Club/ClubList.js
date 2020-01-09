import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { requestClub } from "store/actions/Info";
import { Link } from "react-router-dom";
import "./ClubList.scss";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import swal from 'sweetalert';

const ClubList = ({ match }) => {
    const dispatch = useDispatch();
    const clubs = useSelector(state => state.clubReducer.clubInfo);

    useEffect(() => {
        dispatch(requestClub());
    }, []);

    const url = "https://cogether.kr";
    const copy = () => {
        swal("클립보드 복사가 완료되었습니다")
    }

    const useStyles = makeStyles({
        card: {
            maxWidth: 310
        },
        media: {
            height: 150,
            backgroundColor: "#000000"
        },
        text: {
            height: 60
        },
        text_size: {
            fontSize: 18,
            textDecoration: "none",
            color: "#2d2d4b",
            fontWeight: "bold"
        },
        body_size: {
            fontSize: 16,
            textDecoration: "none",
            color: "black"
        }
    });

    const classes = useStyles();

    return (
        <div>
            <div className="navPic">
                <div className="slogan">
                    Co.gether와 함께
                    <br />
                    원하는 목표를 성취해보세요
                </div>
            </div>
            <Container>
                <Row>
                    {clubs.results &&
                        clubs.results.map(club => {
                            return (
                                <Col md={4}>
                                    <div className="block">
                                        <Card className={classes.card}>
                                            <Link to={`${match.url}/${club.id}`} className="body-link">
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={club.photo.photo ? club.photo.photo : require("assets/placeholder.png")}
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2" className={classes.text}>
                                                            <div className={classes.text_size}>{club.host}</div>
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            <div className={classes.body_size}>{club.title}</div>
                                                            <div>
                                                                {club.start_at.split("T")[0]} ~ {club.end_at.split("T")[0]}
                                                            </div>
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Link>
                                            <CardActions>
                                                <a className="detail-link" href={`javascript:window.open('${club.external_link}','_blank')`}>
                                                    <Button size="small" color="#2d2d4b">
                                                        더 알아보기
                                                    </Button>
                                                </a>
                                                <a className="detail-link" >
                                                    <CopyToClipboard text={url.concat(`${match.url}/${club.id}`)}>
                                                        <Button size="small" color="#2d2d4b" onClick={copy}>
                                                            링크 공유하기
                                                        </Button>
                                                    </CopyToClipboard>
                                                </a>
                                            </CardActions>
                                        </Card>
                                    </div>
                                </Col>
                            );
                        })}
                </Row>
            </Container>
        </div>
    );
};

export default ClubList;
