import { React, useState, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';

import styles from './MenuCard.module.css';

function MenuCard({ mcode, mname, mcomment, price, amount, menus, setMenus }) {
    const increase = () => {
        console.log(mcode);
        console.log(amount);
        setMenus(menus.map(menu => menu.mcode === mcode ? {...menu, amount: amount + 1} : menu));
    }
    const decrease = () => {
        console.log(mcode);
        console.log(amount);
        setMenus(menus.map(menu => menu.mcode === mcode && menu.amount > 0 ? {...menu, amount: amount - 1} : menu));
    }
    return(
        <div >
            <div className={`row justify-content-md-center ${styles.heightControll}`}>
                <div className="col-sm-auto">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" alt="메뉴사진"/>
                        <Card.Body>
                            <Card.Title>{mname}</Card.Title>
                            <Card.Text>{mcomment}</Card.Text>
                            <Card.Text style={{textAlign: 'center'}}>{price}</Card.Text>
                            <Card.Text style={{textAlign: 'center'}}>
                                <div>
                                    <button onClick = {decrease}>-</button>
                                        <span>{amount}</span>
                                    <button onClick = {increase}>+</button>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default MenuCard;