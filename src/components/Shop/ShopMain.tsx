import React, { useState } from "react";
import './ShopMain.css';

import ShopFilter from "./ShopFilter";
import ShopContent from "./ShopContent";

const Request: React.FC = () => {
    const [filterTags, setFilterTags] = useState<string[]>([]);

    const artworkData = {
        img: 'https://image.kr.canon/pds/editor/images/000096/20190611141549971_DE9M265F.jpg',
        author: 'Hana',
        price: 10000,
        title: '겨울',
    };

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
        <div className="shopMain">
            <div className="shopBox">
                <div className="shopTop">
                    <div className="shopA">
                        AA
                        <ShopContent {...artworkData}/>
                    </div>
                    <div className="shopB">
                        BB
                    </div>
                </div>

                <div className="shopC">
                    <ShopFilter tags={filterTags} setTags={setFilterTags}/>
                    {/*<ReqAD />*/}
                </div>
            </div>
        </div>
    );
}

export default Request;