import React from "react";
import { Collapse, Container, List, ListItemButton, Typography, Dialog, DialogTitle, Box } from "@mui/material";
import { makeStyles } from "@mui/styles"
import StoreIcon from '@mui/icons-material/Store';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { createTheme } from "@mui/material/styles";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import UploadForm from "./UploadForm";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";

const theme = createTheme()
const useStyles = makeStyles(() => ({
    container: {
        height: "100vh",
        color: "white",
        position: "sticky",
        top: 0,
        paddingTop: theme.spacing(10),
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.up("sm")]: {
            backgroundColor: "white",
            color: "#555",
            border: "1px solid #ece7e7"
        }
    },
    item: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
        }
    },
    icon: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            fontSize: "18px",
        },
    },
    text: {
        flexGrow: 1,
        fontWeight: 500,
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    hideOnMobile: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        },
    },
    showOnMobile: {
        [theme.breakpoints.up("sm")]: {
            display: "none"
        },
    }
}));

const MenuCategory = (props) => {
    const { setFeed, categoryList, onClick } = props;
    return (
        <List component="div" disablePadding
            sx={{
                pl: 2,
                [theme.breakpoints.down("sm")]: {
                    p: 0.2
                },
            }}
            style={{ maxHeight: "30vh", overflow: "auto" }}>
            {
                categoryList.map((value, index) => {
                    return (
                        <ListItemButton onClick={() => { onClick(false); setFeed("menu-" + value) }} key={index}>
                            <Typography variant="body2">{value}</Typography>
                        </ListItemButton>
                    )
                })
            }
        </List>
    );
};

const AdminCategory = (props) => {
    const { onClick, setOpenPostModal, setPostOption } = props;
    const adminOnClickHandler = (option) => {
        onClick(false);
        setOpenPostModal(true);
        setPostOption(option);
    }
    const { enterpriseCode } = useParams();
    // console.log("enterpriseCode : ", enterpriseCode);

    const navigation = useNavigate ();
    const routeChange = () => {
        const path = `/enterprises/${enterpriseCode}/pos`;
        navigation(path);
    }
    const sales = () => {
        const path = `/enterprises/${enterpriseCode}/finance`;
        navigation(path);
    }
    return (
        <List component="div" disablePadding
            sx={{
                pl: 2,
                [theme.breakpoints.down("sm")]: {
                    p: 0.2
                },
            }}
            style={{ maxHeight: "30vh", overflow: "auto" }}>
            <ListItemButton onClick={() => adminOnClickHandler("menu")}>
                <Typography variant="body2">????????????</Typography>
            </ListItemButton>
            <ListItemButton onClick={() => adminOnClickHandler("gallery")}>
                <Typography variant="body2">???????????????</Typography>
            </ListItemButton>
            {/* <Link to={`/enterprises/${enterpriseCode}/pos`} >
                <ListItemButton >
                    <Typography variant="body2">???????????????</Typography>
                </ListItemButton>
            </Link> */}
            <ListItemButton onClick={routeChange}>
                <Typography variant="body2">???????????????</Typography>
            </ListItemButton>
            <ListItemButton onClick={sales}>
                <Typography variant="body2">????????????</Typography>
            </ListItemButton>
        </List>
    );
};

const Leftbar = (props) => {
    const { setFeed, userType, categoryList } = props;
    const classes = useStyles();
    // ??????????????? "??????"??? ???????????? ?????? ???????????? ???????????? ?????? ?????? state / event
    const [menuOpen, setMenuOpen] = React.useState(false);
    const clickMenu = (event) => {
        setMenuOpen(!menuOpen);
        setMenuModal(true);
    };
    const clickMenuClose = () => {
        setMenuOpen(false);
    };
    // ?????? ????????? ????????? ?????? state
    const [menuModal, setMenuModal] = React.useState(false);
    // ??????????????? "???????????????"??? ???????????? ?????? ???????????? ???????????? ?????? ?????? state / event
    const [adminOpen, setAdminOpen] = React.useState(false);
    const clickAdmin = (event) => {
        setAdminOpen(!adminOpen);
        setAdminModal(true);
    };
    const clickAdminClose = () => {
        setAdminOpen(false);
    };
    // ????????? ????????? ????????? ?????? state
    const [adminModal, setAdminModal] = React.useState(false);

    // ????????? ?????? ????????? ?????? state
    const [openPostModal, setOpenPostModal] = React.useState(false);
    const [postOption, setPostOption] = React.useState();

    return (
        <Container className={classes.container}>

            {/* ?????????(POST) ????????? ????????? ???????????? */}
            <UploadForm categories={categoryList}
                openPostModal={openPostModal}
                option={postOption}
                setOption={setPostOption}
                setOpenPostModal={setOpenPostModal} />

            <List component="nav">

                <ListItemButton onClick={() => setFeed("Information")} sx={{ padding: 0 }} className={classes.item}>
                    <div className={classes.item}>
                        <StoreIcon className={classes.icon} />
                        <Typography className={classes.text}>????????????</Typography>
                    </div>
                </ListItemButton>


                <ListItemButton onClick={clickMenu} onBlur={clickMenuClose} sx={{ padding: 0 }}>
                    <div className={classes.item}>
                        <RestaurantMenuIcon className={classes.icon} />
                        <Typography className={classes.text}>??????</Typography>
                        <div className={classes.hideOnMobile}>
                            {menuOpen ? <ExpandLess /> : <ExpandMore />}
                        </div>
                    </div>
                </ListItemButton>

                <Collapse in={menuOpen} timeout="auto" unmountOnExit className={classes.hideOnMobile}>
                    <MenuCategory onClick={setMenuModal} setFeed={setFeed} categoryList={categoryList} />
                </Collapse>

                <ListItemButton onClick={() => setFeed("TableState")} sx={{ padding: 0 }} className={classes.item}>
                    <div className={classes.item}>
                        <EventSeatIcon className={classes.icon} />
                        <Typography className={classes.text}>???????????????</Typography>
                    </div>
                </ListItemButton>

                <ListItemButton onClick={() => setFeed("Gallery")} sx={{ padding: 0 }} className={classes.item}>
                    <div className={classes.item}>
                        <PhotoLibraryIcon className={classes.icon} />
                        <Typography className={classes.text}>?????????</Typography>
                    </div>
                </ListItemButton>
                {userType === "owner" &&
                    <ListItemButton aria-describedby="menu" onClick={clickAdmin} onBlur={clickAdminClose} sx={{ padding: 0 }}>
                        <div className={classes.item}>
                            <SupervisorAccountIcon className={classes.icon} />
                            <Typography className={classes.text}>???????????????</Typography>

                            <div className={classes.hideOnMobile}>
                                {adminOpen ? <ExpandLess /> : <ExpandMore />}
                            </div>
                        </div>
                    </ListItemButton>}


                <Collapse in={adminOpen} timeout="auto" unmountOnExit className={classes.hideOnMobile}>
                    <AdminCategory onClick={setAdminModal} setOpenPostModal={setOpenPostModal} setPostOption={setPostOption} />
                </Collapse>

                {
                    window.innerWidth < 600 &&
                    <div>
                        <Dialog onClose={() => setMenuModal(false)} open={menuModal} style={{ minWidth: "100vw" }} className={classes.showOnMobile}>
                            <DialogTitle variant="h5" style={{ paddingBottom: "3vh", paddingTop: "5vh" }}>????????????</DialogTitle>
                            <Box style={{ width: "50vw", marginRight: "2vw", marginLeft: "2vw", marginBottom: "5vh" }}>
                                <MenuCategory onClick={setMenuModal} setFeed={setFeed} categoryList={categoryList} />
                            </Box>
                        </Dialog>

                        <Dialog onClose={() => setAdminModal(false)} open={adminModal} style={{ minWidth: "100vw" }} className={classes.showOnMobile}>
                            <DialogTitle variant="h5" style={{ paddingBottom: "3vh", paddingTop: "5vh" }}>???????????????</DialogTitle>
                            <Box style={{ width: "50vw", marginRight: "2vw", marginLeft: "2vw", marginBottom: "5vh" }}>
                                <AdminCategory onClick={setAdminModal} setOpenPostModal={setOpenPostModal} setPostOption={setPostOption} />
                            </Box>
                        </Dialog>
                    </div>
                }
            </List>
        </Container>
    );
};

export default Leftbar;