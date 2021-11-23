import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { createTheme } from "@mui/material/styles";
import Post from "./Post";
import Inform from "./Inform";

const theme = createTheme()
const useStyles = makeStyles(() => ({
    container: {
        paddingTop: theme.spacing(10),
    }
}));

const Feed = (props) => {
    const { feed, userType, enterpriseJson, menuJson, imageJson, setEnterpriseJson, setImageState,setMenuState } = props;
    const classes = useStyles();

    // 갤러리+메뉴 업데이트 함수
    const updateEnterprise = (option, index, image, text) => {
        if (option === "Gallery") {
            const temp = { ...imageJson };
            setImageState(temp);
        } else {
            const temp = { ...menuJson };
            temp.menu[index].MNAME = text.MNAME
            temp.menu[index].PRICE = text.PRICE
            temp.menu[index].MCOMMENT = text.MCOMMENT
            setMenuState(temp);
        }
    }

    // 현재 feed와 category를 출력
    console.log("feed = " + feed)

    return (
        <Container className={classes.container}>
            {feed === "Information" ?
                <Inform userType={userType} option="default" title="안녕"
                    enterpriseJson={enterpriseJson} setEnterpriseJson={setEnterpriseJson} />
                :
                feed === "TableState" ?
                    <div>TableState</div>
                    :
                    feed === "Gallery" ?
                        <div>
                            {
                                // 갤러리 이미지 출력
                                imageJson.image.map((value, index) => (
                                    <Post
                                        key={index}
                                        index={index}
                                        userType={userType}
                                        option="gallery"
                                        image={value.PATH}
                                        updateEnterprise={updateEnterprise} >
                                    </Post>
                                ))
                            }
                        </div>
                        :
                        <div>
                            {
                                // 카테고리별 메뉴 출력
                                menuJson.menu.map((value, index) => (
                                    "menu-" + value.MCATEGORY === feed &&
                                    <Post
                                        key={index}
                                        index={index}
                                        userType={userType}
                                        option="default"
                                        title={value.MNAME}
                                        price={value.PRICE}
                                        image={value.MIMAGE}
                                        updateEnterprise={updateEnterprise}>
                                        {value.MCOMMENT}
                                    </Post>
                                ))
                            }
                        </div>
            }


        </Container >
    );
};

export default Feed;