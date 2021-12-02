import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Offcanvas, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import MenuCard from './MenuCard';
import OrderList from './OrderList';
import Cart from './Cart';
import styles from './Menu.module.css';
import { MessageOutlined } from '@mui/icons-material';

function Menu({ category, placement }) {
    const {enterpriseCode,table} = useParams();
    // 메뉴 가져오기
    const [menus, setMenus] = useState([]);
    const [count, setCount] = useState(0);
    const getMenus = () => {
        axios({
            method: 'get',
            url: `http://118.67.142.194:8080/enterprises/${enterpriseCode}/cart`,
            responseType: JSON
          }).then(function (response) {
              setMenus(response.data.menus);
            });
    }
    useEffect(() => {
        getMenus();
    }, [])

    // 담기 버튼 이벤트
    const [selected, setSelected] = useState([]);
    const [total, setTotal] = useState(0);
    const onClick = () => {
        console.log("담기 클릭");
        setSelected(menus.filter(menu => menu.amount !== 0));
    }
    // const openCart = async () => {
    //     if(selected.length != 0){
    //         const answer = window.confirm("장바구니에 담겼습니다. 확인하시겠습니까?");
    //         if(answer){
    //             setShow2(true);
    //             setMenus(menus.map(menu => menu.amount > 0 ? {...menu, amount: 0} : menu));
    //         }
    //     }else{
    //         alert("메뉴를 선택하세요.");
    //     }
    // }

    // 주문내역 오프캔버스 핸들링
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => {
        setShow(true);
    };

    // 장바구니 오프캔버스 핸들링 
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false)
    const handleShow2 = () => {
        console.log("장바구니 오픈");
        setShow2(true);
    };

    // 주문내역
    const [ordered, setOrdered] = useState([]);

    //결제 버튼
    const pay = async () =>{
        alert('결제 중입니다. 기다려주세요.');
        await axios({
            method: 'post',
            url: `http://118.67.142.194:5000/enterprises/${enterpriseCode}/tables/${table}/pay`,
            data : {
                    eno: enterpriseCode,
                    tno: table,
                    }
        });
    }

    return(
        <>
            <div className="container">
                <div className={`row justify-content-md-center ${styles.heightControll}`}>
                    <div className="col-md-auto">
                        <h1>Menu</h1>
                    </div>
                </div>
                <div className={`row justify-content-md-center ${styles.heightControll}`}>
                    <div className="col-md-1">
                        <Button>자리이동</Button>
                    </div>
                    <div className="col-md-9"></div>
                    <div className="col-md-1">
                        <Button variant="primary" onClick={handleShow}>주문내역</Button>
                        <Offcanvas show={show} onHide={handleClose} placement={placement}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>주문내역</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <OrderList ordered={ordered} />
                        </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                    <div className="col-md-1">
                        <Button variant="primary" onClick={handleShow2} >장바구니</Button>
                        <Offcanvas show={show2} onHide={handleClose2} placement={placement}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>장바구니</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Cart selected={selected} setSelected={setSelected} total={total} setTotal={setTotal} setOrdered={setOrdered} eno={enterpriseCode} table={table} />
                        </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-md-1">
                       <a href="#"><span>{category}</span></a>
                    </div>
                    <div className="col-md-1">
                        <a href="#"><span>{category}</span></a>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className={`${styles.menu}`}>
                        {menus.map(menu => (
                            <MenuCard key={menu.mcode} mcode={menu.mcode} mname={menu.mname} mcomment={menu.mcomment} price={menu.price} amount={menu.amount} menus={menus} setMenus={setMenus} />
                        ))}
                    </div>
                </div>
                <div className={`row justify-content-md-center ${styles.heightControll}`}>
                    <div className="col-md-auto">
                        <Button onClick={onClick}>담기</Button>
                        <Button onClick={pay}>주문하기</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;