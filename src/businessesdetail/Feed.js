import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { createTheme } from "@mui/material/styles";
import Post from "./Post";
import Canvas from "./Canvas";
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
            temp.menus[index].mname = text.mname
            temp.menus[index].price = text.price
            temp.menus[index].mcomment = text.mcomment
            setMenuState(temp);
        }
    }

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
                                imageJson.images.map((value, index) => (
                                    <Canvas
                                        key={index}
                                        index={index}
                                        value={value}
                                        userType={userType}
                                        option="gallery"
                                        updateEnterprise={updateEnterprise} />
                                ))
                            }
                        </div>
                        :
                        <div>
                            {
                                // 카테고리별 메뉴 출력
                                menuJson.menus.map((value, index) => (
                                    "menu-" + value.mcategory === feed &&
                                    <Post
                                        key={index}
                                        value={value}
                                        index={index}
                                        userType={userType}
                                        option="default"
                                        updateEnterprise={updateEnterprise}/>
                                ))
                            }
                        </div>
            }


        </Container >
    );
};

export default Feed;