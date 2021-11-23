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

    // 테스트
    const [testNum, setTestNum] = React.useState(0);

    React.useEffect(() => {
        setTestNum(Number(enterpriseCode) + 1);
        Initializer();
    }, [enterpriseCode])

    const Initializer = () => {
        setFeed("Information");
        const url = "http://118.67.142.194:8080/enterprise/" + enterpriseCode;

        superagent.get(url).end((err, res) => { setEnterpriseState(JSON.parse(res.text)); });
        superagent.get(url + "/categories").end((err, res) => { setCategoryState(JSON.parse(res.text)); });
        superagent.get(url + "/menus").end((err, res) => { setMenuState(JSON.parse(res.text)); });
        superagent.get(url + "/images").end((err, res) => { setImageState(JSON.parse(res.text)); });
    };

    return (
        !enterpriseState || !menuState || !imageState || !categoryState ?
            <div></div>
            :
            <div>
                // 테스트를 위해 넣은 버튼. 차후에 제거해야함
                // <Link to={"/businesses/" + testNum} ><Button style={{ marginTop: theme.spacing(10) }}>다음으로 넘어가기 : {testNum}</Button></Link>

                <Navbar ENAME={enterpriseState.ename} />
                <Grid container>
                    <Grid item lg={2} sm={3} xs={2}>
                        <Leftbar setFeed={setFeed} userType={userType} categoryList={categoryState.categories} />
                    </Grid>
                    <Grid item lg={7} sm={6} xs={10}>
                        <Feed feed={feed} userType={userType}
                            enterpriseJson={enterpriseState} setEnterpriseJson={setEnterpriseState}
                            menuJson={menuState} setMenuState={setMenuState}
                            imageJson={imageState} setImageState={setImageState} />
                    </Grid>
                    <Grid item lg={3} sm={3} className={classes.right}>
                        <RightBar setFeed={setFeed} imageJson={imageState} />
                    </Grid>
                </Grid>
            </div>
    );
};

export default Wrapper;