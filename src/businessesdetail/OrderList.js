import React from 'react';
import { Card } from 'react-bootstrap';

function OrderList({ ordered }) {

    console.log(ordered);
    return (
        <>
            <div className="container">
                {ordered.length == 0 ? 
                "주문내역이 없습니다." 
                : 
                ordered.map(menu => 
                <div className="justify-content-sm-center">
                    <div className="col-sm-auto">{menu.mname}</div>
                    <div className="col-sm-auto">{menu.amount}</div>
                </div>
                )}
            </div>
        </>
    )
}

export default OrderList;