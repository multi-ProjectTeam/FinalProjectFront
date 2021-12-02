import React, { useEffect, useState } from 'react';
import { Card, Button, CloseButton } from 'react-bootstrap';
import axios from 'axios';
import { remove } from 'dom-helpers';

import styles from './Menu.module.css';

function Cart({ selected, setSelected, total, setTotal, setOrdered, eno, table }) {
    const increase = (mcode, amount, e) => {
        setSelected(selected.map(menu => menu.mcode === mcode ? {...menu, amount: amount + 1} : menu));
    }
    const decrease = (mcode, amount, e) => {
        setSelected(selected.map(menu => menu.mcode === mcode && amount > 1 ? {...menu, amount: amount - 1} : menu));
    }
    const remove = (mcode, amount, e) => {
        console.log("장바구니에서 삭제");
        setSelected(selected.filter(menu => mcode !== menu.mcode));
    }
    const putTableOrder = (ocode) =>{
        axios({
            method:'post',
            url: `http://118.67.142.194:8080/enterprises/${eno}/tables/${table}/order`,
            data: {ocode:ocode}
        });
    };

    const order = () => {
        console.log(eno);
        setOrdered(selected);
        axios({
            method: 'post',
            url: `http://118.67.142.194:8080/enterprises/${eno}/orders`,
            data : {total : total}
          }).then(function (response) {
              console.log(response);
              const ocode = response.data.ocode;
              console.log(ocode);
              putTableOrder(ocode);
              if(response.data.status == true){
                  axios({
                    method: 'post',
                    url: `http://118.67.142.194:8080/enterprises/${eno}/orders/${ocode}/orderdetails`,
                    data: {orderdetail : selected}
                  }).then(function (response) {
                    console.log(response.data.orderList);
                    if(response.data.status == true){
                        axios({
                            method: 'post',
                            url: `http://118.67.142.194:5000/enterprises/${eno}/tables/${table}`,
                            data: {orderdetails : response.data.orderList}
                        });
                    }
                  });
              }
            });
    }

  
    return (
        <>
        <div className="container">
        {selected.length !== 0 ?
            <>
            {selected.map(menu => (
                <div key={menu.id} className={`row justify-content-md-center ${styles.heightControll}`}>
                    <div className="col-md-auto">
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" alt="메뉴사진"/>
                        <Card.Body style={{textAlign: 'center'}}>
                            <Card.Title>{menu.mname}</Card.Title>
                            <Card.Text>{menu.mcomment}</Card.Text>
                            <Card.Text>{menu.price}</Card.Text>
                            <Card.Text>
                                <button onClick={(e)=>{decrease(menu.mcode, menu.amount, e)}}>-</button>
                                    <span>{menu.amount}</span>
                                <button onClick={(e)=>{increase(menu.mcode, menu.amount, e)}}>+</button>
                            </Card.Text>
                            <Button variant="link" onClick={(e) => {remove(menu.mcode, menu.amount, e)}}>장바구니에서 삭제</Button>
                        </Card.Body>
                        </Card>
                    </div>
                </div>
            ))}
            <div className={`row justify-content-md-center ${styles.heightControll}`}>
                <div className="col-md-auto">
                    <span>주문금액 : {total}</span>
                </div>
            </div>
            <div className={`row justify-content-md-center ${styles.heightControll}`}>
            <div className="col-md-auto">
                <Button onClick={order}>주문하기</Button>
            </div>
            </div>
            </>
            :
            "장바구니 비었음" 
        }
        </div>
        </>
    )
}

export default Cart;