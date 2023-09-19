import React from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface RTP {
    keyword: string;
    diff: number;
}

const RTPcontent: RTP[] = [
    { keyword: "keyword Addd", diff: 5 },
    { keyword: "keyword B", diff: -3 },
    { keyword: "keyword C", diff: 7 },
    { keyword: "keyword D", diff: 2 },
    { keyword: "keyword E", diff: 0 },
    { keyword: "keyword F", diff: 4 },
    { keyword: "keyword G", diff: 13 },
    { keyword: "keyword H", diff: -3 },
    { keyword: "keyword I", diff: 0 },
    { keyword: "keyword J", diff: 1 }
];

const RequestRTP: React.FC<{ onKeywordClick: (keyword: string) => void }> = ({ onKeywordClick }) => {

    return (
        <div className="reqRTP">
            <div className="RTPtitle">
                실시간 인기
            </div>
            <div className="RTPbox">
                {
                    RTPcontent.map((rtpItem, index) => (
                        <div className="RTPitem" key={index}>
                            <div className="itemRank">
                                {index + 1}
                            </div>

                            <button className="itemKeyword" onClick={() => onKeywordClick(rtpItem.keyword)}>
                                {rtpItem.keyword}
                            </button>

                            <div className="itemDiff">
                                {rtpItem.diff > 0 ? (
                                    <ArrowDropUpIcon sx={{ color: '#0ba70b' }} />
                                ) : rtpItem.diff < 0 ? (
                                    <ArrowDropDownIcon sx={{ color: 'red' }} />
                                ) : (
                                    <ArrowRightIcon />
                                )}
                                {Math.abs(rtpItem.diff)}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default RequestRTP;

