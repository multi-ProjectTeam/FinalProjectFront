import { BsXLg,BsSearch } from "react-icons/bs";
import {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";

import '../css/Search.css';
import Microphone from './Microphone';

function Search({search,state}) {
    const [keyword,setKeyword] = useState(search);
    const [keywordState,setKeywordState] = useState(true);
    const divRef = useRef();

    const onClick = () =>{
        state(true);
    };
    const onChange = (event) => {
        setKeyword(event.target.value);
    }
    const clickReset = () => {
        setKeyword("");
        setKeywordState(true);
    };
    useEffect(()=>{
        if(typeof keyword === "string")
        if(keyword === '' || keyword.length === 0) {
            setKeywordState(true);
        }else{
            setKeywordState(false);
        }
    },[keyword]);

    return (
        <div id="searchBox" ref={divRef}>
            <div id="searchText">
                <input type="text" value={keyword} onChange={onChange}/>
            </div>
            <div id={keywordState ? "resetInactive":"reset"}>
                <BsXLg onClick={clickReset}/>
            </div>
            <div id={keywordState ? "barrierInactive":"barrierActive"}></div>
            <Microphone setKeyword={setKeyword} keywordState={keywordState}/>
            <div id="searchIcon">
                <Link id="linkSearch" to={`/enterprises?search=${keyword}`} onClick={onClick}><BsSearch id="searchIcon"/></Link>
            </div>
        </div>
    );
}

export default Search;