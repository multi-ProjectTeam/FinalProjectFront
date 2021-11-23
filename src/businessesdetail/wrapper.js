import React from "react";
import { Grid } from "@mui/material";
import Feed from "./Feed";
import Leftbar from "./Leftbar";
import Navbar from "./Navbar";
import RightBar from "./Rightbar";
// import "./global.css";
import { makeStyles } from "@mui/styles"
import { createTheme } from "@mui/material/styles";
import { useParams } from 'react-router-dom';


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
    const {enterpriseCode} = useParams();
    console.log("enterpriseCode = " + enterpriseCode);

    // 현재 피드에 띄우는 컴포넌트를 선택하기 위한 state
    const [feed, setFeed] = React.useState("Information");

    // 더미 데이터
    const categoryJson = { "category": ["coffee", "sandwich", "cookie"] };
    const enterpriseJson = {
        "ENO": "1",
        "ENAME": "스타벅스 수원성균관대점",
        "POSTCODE": "16360",
        "ROAD_ADDRESS": "경기도 수원시 장안구 서부로 2131",
        "JIBUN_ADDRESS": "경기 수원시 장안구 율전동 285-6",
        "DETAIL_ADDRESS": "1,2층",
        "PHONE": "1522-3232",
        "EMAIL": "www.starbucks.co.kr",
        "CONFIRM": "승인완료",
        "INTRODUCTION": "티바나 바 매장에는 좀 더 특별하게 ‘스타벅스 티바나’를 경험할 수 있는 공간이 마련되어 있습니다. 티바나 바에서 샘플링과 시향, 시음 서비스를 통해 티가 만들어지는 과정을 파트너와 함께 체험해보세요.",
        "OPEN1": "07:00",
        "CLOSE1": "21:00",
        "OPEN2": "08:00",
        "CLOSE2": "21:00",
        "VALID": "가맹 서비스 이용 중",
        "EIMAGE": "https://i.pinimg.com/564x/ef/5b/89/ef5b8918c822f85eb85bf170c69a359d.jpg",
        "ECATEGORY": "커피전문점"
    }
    const menuJson = {
        "menu": [
            { "MNAME": "커피1", "PRICE": "2,000", "MCOMMENT": "커피1입니다", "MIMAGE": "https://i.pinimg.com/736x/90/07/c2/9007c2a76dc009dec77da90d7a249ea4.jpg", "MCATEGORY": "coffee" },
            { "MNAME": "커피2", "PRICE": "3,000", "MCOMMENT": "커피2입니다", "MIMAGE": "https://i.pinimg.com/564x/d9/be/28/d9be2820e6a347fdd67e7651869765e4.jpg", "MCATEGORY": "coffee" },
            { "MNAME": "커피3", "PRICE": "4,000", "MCOMMENT": "커피3입니다", "MIMAGE": "https://i.pinimg.com/564x/42/b0/fa/42b0fa9a82bbe6962611a836583a927c.jpg", "MCATEGORY": "coffee" },
            { "MNAME": "커피4", "PRICE": "5,000", "MCOMMENT": "커피4입니다", "MIMAGE": "https://i.pinimg.com/736x/71/32/88/7132882c454374d29c26c5b4c3f992d7.jpg", "MCATEGORY": "coffee" },
            { "MNAME": "샌드위치1", "PRICE": "4,500", "MCOMMENT": "샌드위치1입니다", "MIMAGE": "https://i.pinimg.com/564x/cb/b8/ac/cbb8ac7bbf02ee2d6d91d86b0b5db549.jpg", "MCATEGORY": "sandwich" },
            { "MNAME": "샌드위치2", "PRICE": "5,500", "MCOMMENT": "샌드위치2입니다", "MIMAGE": "https://i.pinimg.com/564x/91/59/c9/9159c9d09166df5ea0ba6387302f7c9f.jpg", "MCATEGORY": "sandwich" },
            { "MNAME": "샌드위치3", "PRICE": "8,500", "MCOMMENT": "샌드위치3입니다", "MIMAGE": "https://i.pinimg.com/564x/32/22/e5/3222e536100d716418162912d6a18348.jpg", "MCATEGORY": "sandwich" },
            { "MNAME": "쿠키1", "PRICE": "1,500", "MCOMMENT": "쿠키1입니다", "MIMAGE": "https://i.pinimg.com/564x/75/67/47/75674717bd1921f6c1512f8453d4b69e.jpg", "MCATEGORY": "cookie" },
            { "MNAME": "쿠키2", "PRICE": "1,500", "MCOMMENT": "쿠키2입니다", "MIMAGE": "https://i.pinimg.com/736x/fc/c0/0f/fcc00f0b4e97a09e138522afd2b9359e.jpg", "MCATEGORY": "cookie" },
            { "MNAME": "쿠키3", "PRICE": "2,500", "MCOMMENT": "쿠키3입니다", "MIMAGE": "https://i.pinimg.com/564x/8e/8e/b7/8e8eb77b9f28374033a70f0f4fd77398.jpg", "MCATEGORY": "cookie" },
            { "MNAME": "쿠키4", "PRICE": "3,500", "MCOMMENT": "쿠키4입니다", "MIMAGE": "https://i.pinimg.com/564x/65/3e/99/653e99b87bb5eb9ecb6d9d64bc42d0a0.jpg", "MCATEGORY": "cookie" },
            { "MNAME": "쿠키5", "PRICE": "3,500", "MCOMMENT": "쿠키5입니다", "MIMAGE": "https://i.pinimg.com/736x/ca/77/11/ca7711f415ba43500f6a238a0cd36183.jpg", "MCATEGORY": "cookie" }
        ]
    }
    const imageJson = {
        "image": [
            { "PATH": "https://i.pinimg.com/564x/63/f0/92/63f092e58a48d20c3b017ba4b7f56a8e.jpg" },
            { "PATH": "https://i.pinimg.com/564x/0d/c3/34/0dc3340f70aa89fc897fa67c36ecf254.jpg" },
            { "PATH": "https://i.pinimg.com/564x/d7/6f/07/d76f07deff9b5463245251fab1f6e541.jpg" },
            { "PATH": "https://i.pinimg.com/564x/93/4d/34/934d34e6982d27c52d33673823e4ef9d.jpg" },
            { "PATH": "https://i.pinimg.com/564x/2b/eb/c9/2bebc9a95e2a4bbe4dc54e7da03ea98d.jpg" },
            { "PATH": "https://i.pinimg.com/564x/54/e6/18/54e618be659359423937c4da0976c536.jpg" },
            { "PATH": "https://i.pinimg.com/564x/18/02/92/180292521f20fd72011e00708b9f3129.jpg" },
            { "PATH": "https://i.pinimg.com/564x/0e/9b/71/0e9b710aa75b5b9f929b96c92bac1342.jpg" },
            { "PATH": "https://i.pinimg.com/564x/68/0f/ae/680fae8e1b54e1cdf938b7221975acf7.jpg" },
            { "PATH": "https://i.pinimg.com/564x/c9/b8/1d/c9b81d8797df9dc1e7fa0c2cf09f9070.jpg" },
            { "PATH": "https://i.pinimg.com/236x/23/bd/7e/23bd7e7a295cf9003dc0cebb02fec7c5.jpg" },
            { "PATH": "https://i.pinimg.com/236x/a1/25/98/a125985c04b8284b6f4e6d196f86d04f.jpg" },
            { "PATH": "https://i.pinimg.com/236x/7e/90/b2/7e90b223342b1dd0baea9f98b8a60557.jpg" },
            { "PATH": "https://i.pinimg.com/236x/ca/7e/0c/ca7e0ca75d30ed03684f370b5a563542.jpg" },
            { "PATH": "https://i.pinimg.com/236x/41/f2/c1/41f2c1c9f3745661cf2d8d5264531da4.jpg" },
            { "PATH": "https://i.pinimg.com/236x/2a/97/18/2a9718a7eaf6fafdb78bb4e2a83b3972.jpg" },
        ]
    }

    // enterprise 상태 변수
    const [enterpriseState, setEnterpriseState] = React.useState(enterpriseJson);
    // menu 상태 변수
    const [menuState, setMenuState] = React.useState(menuJson);
    // image 상태 변수
    const [imageState, setImageState] = React.useState(imageJson);


    return (
        !enterpriseState || !menuState || !imageState ?
            <div></div>
            :
            <div>
                <Navbar ENAME={enterpriseState.ENAME} />
                <Grid container>
                    <Grid item lg={2} sm={3} xs={2}>
                        <Leftbar setFeed={setFeed} userType={userType} categoryList={categoryJson.category} />
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