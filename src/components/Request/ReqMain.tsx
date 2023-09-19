import React, { useState } from "react";
import './ReqMain.css';

import ReqRTP from './ReqRTP';
import ReqRTPShort from "./ReqRTPShort";
import ReqAD from "./ReqAD";
import ReqSuggest from "./ReqSuggest";
import ReqSearch from "./ReqSearch";
import ReqFilter from "./ReqFilter";

const Request: React.FC = () => {
    const [filterTags, setFilterTags] = useState<string[]>([]);

    const handleKeywordClick = (keyword: string) => {
        if (filterTags.length >= 10) {
            alert("태그는 최대 10개까지 등록 가능합니다.");
            return;
        }
        const trimmedKeyword = keyword.trim();
        
        if (trimmedKeyword !== '' && !filterTags.includes(trimmedKeyword)) {
            setFilterTags([...filterTags, trimmedKeyword]);
        } else if (filterTags.includes(trimmedKeyword)) {
            alert(`"${trimmedKeyword}" 태그는 이미 등록되었습니다.`);
        }
    };

    return (
        <div className="reqMain">
            <div className="reqBox">
                <div className="reqTop">
                    <div className="reqA">
                        <ReqFilter tags={filterTags} setTags={setFilterTags} />
                    </div>
                    <div className="reqB">
                        <ReqSuggest onKeywordClick={handleKeywordClick}/>
                        <ReqSearch onKeywordClick={handleKeywordClick}/>
                    </div>
                </div>

                <div className="reqC">
                    <ReqRTP onKeywordClick={handleKeywordClick}/>
                    <ReqRTPShort />
                    {/*<ReqAD />*/}
                </div>
            </div>
        </div>
    );
}

export default Request;