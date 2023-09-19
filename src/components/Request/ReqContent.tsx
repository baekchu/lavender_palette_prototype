import React from "react";
import SellIcon from '@mui/icons-material/Sell';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import './ReqContent.css';

interface UserData {
    profImg: string,
    nick: string,
    title: string,
    deadline: string,
    price: string,
    tags: string[];
}

interface Props {
    userData: UserData;
    onKeywordClick: (keyword: string) => void; // Add this prop
}

const RequestContent: React.FC<Props> = ({ userData, onKeywordClick }) => {
    return (
        <div className="recContent">
            <div className="recContentTop">
                {/**    이미지 출력 부분    */}
                <img
                    src={userData.profImg}
                    alt=""
                    className="recItemImg" />

                {/**    닉네임 출력 부분    */}
                <div className="recItemNick">
                    {userData.nick}
                    <SellIcon sx={{ fontSize: "14px", paddingLeft: '3px' }} />
                </div>

                {/**    제목 출력 부분    */}
                <div className="recItemTitle">
                    {userData.title}
                </div>

                {/**    버튼 출력 부분    */}
                <div className="recItemBtns">
                    <button className="btn1">
                        <ZoomInIcon sx={{ fontSize: '20px' }} />
                    </button>
                    <button className="btn2">
                        <BookmarkBorderIcon sx={{ fontSize: '20px' }} />
                    </button>
                    <button className="btn3">
                        <MailOutlineIcon sx={{ fontSize: '20px' }} />
                    </button>
                </div>
            </div>

            <div className="recContentBottom">
                {/**    태그 출력 부분    */}
                <div className="recItemTags">
                    <button className="recItemTag">    {/** 첫 태그 2개는 기간과 비용 */}
                        <CalendarTodayIcon sx={{ color: '#B25FF3', fontSize: '18px', marginRight: '3px' }} />
                        {userData.deadline} 남음
                    </button>
                    <button className="recItemTag">
                        <LocalAtmIcon sx={{ color: '#B25FF3', fontSize: '24px', marginRight: '3px' }} />
                        {userData.price}
                    </button>

                    {userData.tags.map((tag, index) => (
                        <button
                            className="recItemTag"
                            key={index}
                            onClick={() => onKeywordClick(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RequestContent;
