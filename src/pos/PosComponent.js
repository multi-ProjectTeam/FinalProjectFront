import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import { useParams } from 'react-router';
import superagent from "superagent";
import { Card, Container, Grid, Typography } from "@mui/material";

let socket;

function Pos() {
    const params = useParams();
    const [orders, setOrders] = useState([]);
    const [tables, setTables] = useState([]);

    const inputOrderDetail = (order) => {
        const cur = new Date();
        const curDate = cur.getFullYear() + "/" + (cur.getMonth() + 1) + "/" + cur.getDate();
        const curTime = cur.getHours() + ":" + cur.getMinutes() + ":" + cur.getSeconds();

        if (order && order.message.length !== 0) {
            const tempOrders = order.message;
            tempOrders.map((value) => {
                value.curDate = curDate;
                value.curTime = curTime;
            });
            // console.log(tempOrders);
            setOrders(orders => [...orders, ...tempOrders]);
        }
    }

    const getTables = (eno) => {
        const url = `http://118.67.142.194:8080/enterprises/${eno}/tables`
        const dummyTables = [{ "tno": 1 }, { "tno": 2 }, { "tno": 3 }, { "tno": 4 }, { "tno": 5 },
        { "tno": 6 }, { "tno": 7 }, { "tno": 8 }, { "tno": 9 }, { "tno": 10 }]
        superagent
            .get(url)
            .end((err, res) => {
                // setTables(JSON.parse(res.text).tables);
                setTables(dummyTables);
            });
    }
    
    useEffect(() => {
        const { enterpriseCode } = params;
        getTables(enterpriseCode);

        socket = io('http://118.67.142.194:5000');

        socket.emit('POS-startUp', Number(enterpriseCode), (err) => {
            if (err) {
                alert(err);
            }
        })
    }, [params]);

    useEffect(() => {
        socket.on('orderToPos', (order) => {
            inputOrderDetail(order);
        });
    }, [])

    return (
        !tables ?
            <div></div> :
            <Container>
                <Typography variant="h5">ORDERS</Typography>
                {tables.map((table, indexT) => (
                    <Card key={indexT} style={{ padding: "10px", margin: "10px", marginBottom:"20px" }}>
                        <Typography variant="h6">Table {table.tno}</Typography>
                        <Grid container>
                            <Grid item sm={2}>주문일</Grid>
                            <Grid item sm={2}>주문시간</Grid>
                            <Grid item sm={2}>수량</Grid>
                            <Grid item sm={6}>메뉴</Grid>
                        </Grid>
                        {orders.map((order, indexO) => (

                            order.tno === table.tno &&
                            <Grid container key={indexO}>
                                <Grid item sm={2}>{order.curDate}</Grid>
                                <Grid item sm={2}>{order.curTime}</Grid>
                                <Grid item sm={2}>{order.count}</Grid>
                                <Grid item sm={6}>{order.mname}</Grid>
                            </Grid>
                        ))}

                    </Card>
                ))}
            </Container>
    );
}

export default Pos;