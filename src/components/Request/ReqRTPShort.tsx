import React, { useState, useEffect } from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface RTP {
    keyword: string;
    diff: number;
}

const RTPcontent: RTP[] = [
    { keyword: "keyword Addd", diff: 5 },
    { keyword: "keyword Baaaaaaaaaaaaaaaaaaaaaaaa", diff: -3 },
    { keyword: "keyword Caaaaaaaaaaaaaaaaaaaaaaaa", diff: 7 },
    { keyword: "keyword Daaaaaaaaaaaaaaa", diff: 2 },
    { keyword: "keyword Eaaaaaaaaaaaaaaa", diff: 0 },
    { keyword: "keyword Faaaaaaaaaaaaa", diff: 4 },
    { keyword: "keyword Gaaaaaaaaaaaa", diff: 13 },
    { keyword: "keyword Haaaaaaaaa", diff: -3 },
    { keyword: "keyword I", diff: 0 },
    { keyword: "keyword J", diff: 1 }
];

const RequestRTPShort: React.FC = () => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentItemIndex(prevIndex => (prevIndex + 1) % RTPcontent.length);
        }, 3000); // 3초마다 아이템 인덱스 업데이트

        return () => {
            clearInterval(interval);
        };
    }, []);

    const currentRTPItem = RTPcontent[currentItemIndex];

    const keywordClick = (keyword: string) => {
        console.log(keyword);
    }

    return (
        <div className="reqRTPShort">
            <div className="RTPShortTitle">
                실시간 인기
            </div>
            <div className="RTPShortBox">
                <div className="RTPShortItem">
                    <div className="shortItemRank">
                        {currentItemIndex + 1}.
                    </div>

                    <button className="shortItemKeyword" onClick={() => keywordClick(currentRTPItem.keyword)}>
                        {currentRTPItem.keyword}
                    </button>

                    <div className="shortItemDiff">
                        {currentRTPItem.diff > 0 ? (
                            <ArrowDropUpIcon sx={{ color: '#0ba70b' }} />
                        ) : currentRTPItem.diff < 0 ? (
                            <ArrowDropDownIcon sx={{ color: 'red' }} />
                        ) : (
                            <ArrowRightIcon />
                        )}
                        {Math.abs(currentRTPItem.diff)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestRTPShort;