import React from "react";
import { Box, Button, Card, CardContent, Dialog, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { createTheme } from "@mui/material/styles";
import { useParams } from 'react-router-dom';
import superagent from "superagent";

const theme = createTheme()
const useStyles = makeStyles(() => ({
    media: {
        height: 250,
        [theme.breakpoints.down("sm")]: {
            height: 150,
        },
    },
    cardMarginInFeed: {
        marginBottom: theme.spacing(5),
    },
    card: {
        // marginBottom: theme.spacing(5),

        [theme.breakpoints.down("sm")]: {
            minWidth: "70vw",
        },
        [theme.breakpoints.up("sm")]: {
            display: 'flex',
            width: "50vw",
        },
    },
    content: {
        // marginRight: theme.spacing(1)
        maxWidth: "300px"
    },
    imageBreak: {
        minHeight: "300px",
        [theme.breakpoints.up("sm")]: {
            width: "50%",
            minHeight: "300px",
            maxWidth: "300px",
            [theme.breakpoints.up("lg")]: {
                Width: "200px"
            },
        },
    },
    gallery: {
        width: "70vw",
        height: "70vw",
        [theme.breakpoints.up("sm")]: {
            width: "40vw",
            height: "40vw",
        },
    },
    contentBreak: {
        [theme.breakpoints.up("sm")]: {
            // width: "50vw",
            [theme.breakpoints.down("lg")]: {
                width: "50%"
            },
        },
    }
}));

const Canvas = (props) => {
    // option : 사진과 텍스트를 어떤 비율로 넣을지 선택 (default = 사진+텍스트, gallery = 사진)
    const { userType, option, updateEnterprise, index, value } = props;
    const classes = useStyles();
    const [dialogCard, setDialogCard] = React.useState(false);
    const openCard = () => { setDialogCard(true) };
    const closeCard = () => { setDialogCard(false) };
    console.log(value);

    // const {enterpriseCode} = useParams();
    // // 임시저장하고, 수정되면 PUT 요청을 보내는 state와 함수
    // const [menuTemp, setMenuTemp] = React.useState();
    // React.useEffect( () => {
    //     console.log("Start useEffect");
    //     if(menuTemp){
    //         console.log("Menu have been changed");
    //         const url = "http://118.67.142.194:8080/enterprise/" + enterpriseCode + "/menu/" + value.mcode;
            
    //         superagent.put(url)
    //             .set('Content-Type', 'application/json')
    //             .send(menuTemp)
    //             .end((err, res) => {
    //                 console.log(JSON.parse(res.text).status);
    //                 console.log(menuTemp);
    //                 if (!err && JSON.parse(res.text).status ){
    //                     updateEnterprise(option, index, value.mimage, menuTemp)
    //                     console.log("Complete");
    //                 }else{
    //                     console.log("Error");
    //                 }
    //             })
    //     }
    // }, menuTemp )

    return (
        <div style={{ display: "flex", justifyContent: "center" }} className={classes.cardMarginInFeed}>
            <PostContent
                value={value}
                index={index}
                modifiable={false}
                openCard={openCard}
                closeCard={closeCard}
            />

            {userType === "owner" &&
                <Dialog onClose={closeCard} open={dialogCard}>
                    <PostContent
                        value={value}
                        index={index}
                        modifiable={true}
                        openCard={openCard}
                        closeCard={closeCard}
                    />
                </Dialog>
            }
        </div>
    );
};

const PostContent = (props) => {
    const { modifiable, openCard, closeCard, value } = props;
    const classes = useStyles();
    // 수정 버튼을 클릭했는지에 대한 state
    const [modifyMode, setModifyMode] = React.useState(false)
    const confirmEvent = () => {
        setModifyMode(false);
        closeCard()
    }
    const cancelEvent = () => {
        setModifyMode(false);
    }
    

    return (
        <Card className={classes.card} onClick={modifiable ? undefined : openCard}>
            <Box style={{
                backgroundImage: "url(" + value.path + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
                className={classes.gallery} />

        </Card>
    )
}

export default Canvas;