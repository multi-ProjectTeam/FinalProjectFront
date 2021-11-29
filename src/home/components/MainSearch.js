import {useState, React, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styles from '../css/MainSearch.module.css';
import axios from 'axios';

function MainSearch() {
    const [keyword, setKeyword] = useState("");
    const onChange = (e) => {
        setKeyword(e.target.value);
    }
    const searchPlace = () => {
        console.log("검색");
        <Link to={`/enterprises?search=${keyword}`} />
        // console.log("장소검색");
        // axios({
        //     url: `/search?keyword=${keyword}`,
        //     method: "GET"
        // });
    }
    
    return(
        <>
            <div className={styles.wrapper}>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-5">
                            <h1>Name of our service</h1>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-6" style={{
                            paddingRight: 0
                        }}>
                            <input className={styles.input} type="text" placeholder="search place" onChange={onChange}/>
                        </div>
                        <div className="col-2" style={{
                            paddingLeft: 0
                        }}>
                            <Link to={`/enterprises?search=${keyword}`}>검색하기</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainSearch;