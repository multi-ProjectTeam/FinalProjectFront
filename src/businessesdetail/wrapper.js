import React from "react";
import { Button, Grid } from "@mui/material";
import Feed from "./Feed";
import Leftbar from "./Leftbar";
import Navbar from "./Navbar";
import RightBar from "./Rightbar";
// import "./global.css";
import { makeStyles } from "@mui/styles"
import { createTheme } from "@mui/material/styles";
import { Link, useParams } from 'react-router-dom';
import superagent from "superagent";


const theme = createTheme()
const useStyles = makeStyles(() => ({
    right: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    }
}));

const Wrapper = (props) => {
    const { userType } = props;
    const classes = useStyles();

    // enterprise 상태 변수
    const [enterpriseState, setEnterpriseState] = React.useState();
    // enterprise를 수정하기 전에 거쳐가는 temp state
    const [enterpriseTemp, setEnterpriseTemp] = React.useState();

    // menu 상태 변수
    const [menuState, setMenuState] = React.useState();

    // image 상태 변수
    const [imageState, setImageState] = React.useState();
    // category 상태 변수
    const [categoryState, setCategoryState] = React.useState();


    // 현재 피드에 띄우는 컴포넌트를 선택하기 위한 state
    const [feed, setFeed] = React.useState();

    // 해당 컴포넌트에 접근했을 때, 처음 실행되는 코드
    const { enterpriseCode } = useParams();


    React.useEffect(() => {
        GETfromServer();
    }, [enterpriseCode])

    const GETfromServer = () => {
        setFeed("Information");
        const url = "http://118.67.142.194:8080/enterprise/" + enterpriseCode;

        superagent.get(url).end((err, res) => { setEnterpriseState(JSON.parse(res.text)); });
        superagent.get(url + "/categories").end((err, res) => { setCategoryState(JSON.parse(res.text)); });
        superagent.get(url + "/menus").end((err, res) => { setMenuState(JSON.parse(res.text)); });
        superagent.get(url + "/images").end((err, res) => { setImageState(JSON.parse(res.text)); });
    };

    // enterprise를 수정했을 때, PUT 요청을 보내는 함수
    React.useEffect(() => {
        console.log("PUT Enterprise");
        const url = "http://118.67.142.194:8080/enterprise/" + enterpriseCode;
        // 처음 화면을 띄웠을 때는 실행하지 않는다.
        if (enterpriseTemp) {
            superagent.put(url)
                .set('Content-Type', 'application/json')
                .send(enterpriseTemp)
                .end((err, res) => {
                    console.log(JSON.parse(res.text).status);
                    console.log(enterpriseTemp);
                    if (!err && JSON.parse(res.text).status ){
                        setEnterpriseState(enterpriseTemp)
                        console.log("Complete");
                    }else{
                        console.log("Error");
                    }
                })
        }
    }, [enterpriseTemp])

    return (
        !enterpriseState || !menuState || !imageState || !categoryState ?
            <div></div>
            :
            <div>
                // 테스트를 위해 넣은 버튼. 차후에 제거해야함
                <Link to={"/businesses/" + (Number(enterpriseCode)-1)} ><Button style={{ marginTop: theme.spacing(10) }}>이전으로 돌아가기</Button></Link>
                <Link to={"/businesses/" + (Number(enterpriseCode)+1)} ><Button style={{ marginTop: theme.spacing(10) }}>다음으로 넘어가기</Button></Link>

                <Navbar ENAME={enterpriseState.ename} />
                <Grid container>
                    <Grid item lg={2} sm={3} xs={2}>
                        <Leftbar setFeed={setFeed} userType={userType} categoryList={categoryState.categories} />
                    </Grid>
                    <Grid item lg={7} sm={6} xs={10}>
                        <Feed feed={feed} userType={userType}
                            enterpriseJson={enterpriseState} setEnterpriseJson={setEnterpriseTemp}
                            menuJson={menuState} setMenuState={setMenuState}
                            imageJson={imageState} setImageState={setImageState}
                        />
                    </Grid>
                    <Grid item lg={3} sm={3} className={classes.right}>
                        <RightBar setFeed={setFeed} imageJson={imageState} />
                    </Grid>
                </Grid>
            </div>
    );
};

export default Wrapper;