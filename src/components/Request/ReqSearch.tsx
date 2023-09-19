import React from "react";
import RequestContent from "./ReqContent";

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

interface UserData {
    profImg: string,
    nick: string,
    title: string,
    deadline: string,
    price: string,
    tags: string[];
}

const ReqSuggest: React.FC<{ onKeywordClick: (keyword: string) => void }> = ({ onKeywordClick }) => {
    const [alignment, setAlignment] = React.useState<string | null>('time');
    const [isDesc, setIsDesc] = React.useState(true);
    const [refPageNum, setRefPageNum] = React.useState(1);

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const DescHandleChange = (
        event: React.MouseEvent<HTMLElement>,
        newDesc: boolean,
    ) => {
        if (newDesc !== null) {
            setIsDesc(newDesc);
        }
    };

    const handlePageNum = (
        event: React.MouseEvent<HTMLElement>,
        newPageNum: number,
    ) => {
        if (newPageNum < 1) {
            setRefPageNum(1);
        } else if (newPageNum > 6) {    /** 6은 최대 페이지 수의 임의값 */
            setRefPageNum(6);
        } else {
            setRefPageNum(newPageNum);
        }
    };

    // 더미데이터
    const userData: UserData = {
        profImg: 'https://cdn.class101.net/images/46cbf491-afd8-4b34-981a-7fb168085e1b',
        nick: 'Hana',
        title: '초상화를 그려주세요.',
        deadline: '3일',
        price: '3만원',
        tags: ["태그1", "태그2", "태그3"]
    };

    return (
        <div className="reqSuggest">
            <div className="reqSugTitle">
                의뢰 검색 {refPageNum}/6 pages
            </div>
            <div className="reqSugBox">
                <RequestContent userData={userData} onKeywordClick={onKeywordClick}/>
                <RequestContent userData={userData} onKeywordClick={onKeywordClick}/>
                <RequestContent userData={userData} onKeywordClick={onKeywordClick}/>
                <RequestContent userData={userData} onKeywordClick={onKeywordClick}/>
                <RequestContent userData={userData} onKeywordClick={onKeywordClick}/>
                <RequestContent userData={userData} onKeywordClick={onKeywordClick}/>
            </div>
            <div className="reqSearchPagesNav">
                <button className="arrowBtn" onClick={(event) => handlePageNum(event, refPageNum - 10)}>
                    <KeyboardDoubleArrowLeftIcon />
                </button>

                <button className="arrowBtn" onClick={(event) => handlePageNum(event, refPageNum - 1)}>
                    <KeyboardArrowLeftIcon />
                </button>

                <div className="pageNumBtns">
                    {[1, 2, 3, 4, 5, 6].map(pageNum => (
                            <button className='numBtn' key={pageNum} onClick={(event) => handlePageNum(event, pageNum)}>
                                {pageNum}
                            </button>
                    ))}
                </div>

                <button className="arrowBtn" onClick={(event) => handlePageNum(event, refPageNum + 1)}>
                    <KeyboardArrowRightIcon />
                </button>

                <button className="arrowBtn" onClick={(event) => handlePageNum(event, refPageNum + 10)}>
                    <KeyboardDoubleArrowRightIcon />
                </button>

            </div>
        </div>
    );
}

export default ReqSuggest;