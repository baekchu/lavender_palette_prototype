import React from "react";
import RequestContent from "./ReqContent";
import RefreshIcon from '@mui/icons-material/Refresh';

interface UserData {
    profImg: string,
    nick: string,
    title: string,
    deadline: string,
    price: string,
    tags: string[];
}

const ReqSuggest: React.FC<{ onKeywordClick: (keyword: string) => void }> = ({ onKeywordClick }) => {
    const userData: UserData = {
        profImg: 'https://cdn.class101.net/images/46cbf491-afd8-4b34-981a-7fb168085e1b',
        nick: 'Hana',
        title: '초상화를 그려주세요.',
        deadline: '3일',
        price: '3만원',
        tags: ["태그1", "태그2", "태그3"]
    };

    return (
        <div className="reqSearch">
            <div className="reqSearchTitle">
                추천 의뢰
            </div>
            <div className="reqSearchBox">
                <RequestContent userData={userData} onKeywordClick={onKeywordClick}/>
                <RequestContent userData={userData} onKeywordClick={onKeywordClick}/>
                <RequestContent userData={userData} onKeywordClick={onKeywordClick}/>
                <RequestContent userData={userData} onKeywordClick={onKeywordClick}/>
            </div>
            <div className="reqSugRefresh">
                <button className="SugRefBtn">
                    <RefreshIcon />
                    새로운 추천 받기
                </button>
            </div>
        </div>
    );
}

export default ReqSuggest;