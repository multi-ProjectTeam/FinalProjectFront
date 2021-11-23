import React from "react";
import request from "superagent";


const Test = () => {
    const url = "http://118.67.142.194:8080";
    request.get(url + "/enterprises")
    .end( (err,res) => {
        console.log(err);
        console.log(res);
    } )
    return (
        <div>
            안녕하세요. 테스트입니다.
        </div>
    )

}

export default Test;