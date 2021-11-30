import React, { useEffect, useState } from 'react';
import { Modal, Offcanvas, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import MenuCard from './MenuCard';
import OrderList from './OrderList';
import Cart from './Cart';
import styles from './Menu.module.css';

function Menu({ category, placement }) {
    // 메뉴 가져오기
    const [menus, setMenus] = useState([]);
    const [count, setCount] = useState(0);
    const getMenus = () => {
        axios({
            method: 'get',
            url: 'http://118.67.142.194:8080/enterprises/1/menus',
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
        setSelected(menus.filter(menu => menu.amount !== 0));
        console.log("장바구니에 담김");
        console.log(selected);
    }

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
    console.log(menus);
    console.log(selected);
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
                            <Cart selected={selected} setSelected={setSelected} total={total} setTotal={setTotal} setOrdered={setOrdered} />
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;