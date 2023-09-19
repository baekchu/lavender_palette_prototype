import React, { useState } from 'react';

import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShareIcon from '@mui/icons-material/Share';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import GavelIcon from '@mui/icons-material/Gavel';

/** type이 message라면 lastChat이 필수로 입력되어야 함 */
interface MessageLogInput {
    type: 'message',
    userNick: string,
    lastTime: string,
    lastChat: string,
    newMess?: number,
    artworkTitle?: never,
}

/** 그 외 type은 artworkTitle이 필수로 입력되어야 함 */
interface AlermLogInput {
    type: 'like' | 'share' | 'buy' | 'bid',
    userNick: string,
    lastTime: string,
    lastChat?: never,
    newMess?: never,
    artworkTitle: string,
}

const NoticeLogContent: React.FC<MessageLogInput | AlermLogInput> = ({ type, userNick, lastChat, lastTime, newMess = 0, artworkTitle }) => {
    const [isVisible, setIsVisible] = useState(true);

    const ProfileClicked = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        console.log("프로필 이미지 클릭");
    }

    const MessageBoxClicked = () => {
        console.log("프로필 박스 클릭");
    }

    return (
        <>
            {isVisible && (<div className="noticeLogContent" onDoubleClick={MessageBoxClicked} >
                <img
                    src="https://i.namu.wiki/i/lP5geJEGZmC8E98kokuGbvb5bcr4XMCrhzvjTzcGBlaCvQZdo43FCisdIy4f2Tz-dYpUoqVzntXJYLmXdKLKSA.webp"
                    alt=""
                    className="logImg"
                    onClick={ProfileClicked}
                />
                <div className="logRight">
                    <div className="logTop">
                        <div className="userName" onClick={ProfileClicked}>
                            {userNick}
                        </div>
                        <div className="logAlerm">
                            <div className="lastTime">{lastTime}</div>

                            {/** 타입에 대한 알림 컴포넌트 배치 변경 */}
                            {type === 'message' && (
                                <div className={newMess ? "messCnt" : "messCnt empty"}>
                                    {newMess > 0 ?
                                        newMess :
                                        <DraftsOutlinedIcon sx={{ fontSize: '15px', color: '#B25FF3' }} />}
                                </div>
                            )}
                            {type === 'like' && (
                                <div className="like">
                                    <FavoriteOutlinedIcon sx={{ fontSize: '15px', color: '#B25FF3' }} />
                                </div>
                            )}
                            {type === 'share' && (
                                <div className="share">
                                    <ShareIcon sx={{ fontSize: '15px', color: '#B25FF3' }} />
                                </div>
                            )}
                            {type === 'buy' && (
                                <div className="buy">
                                    <LocalMallIcon sx={{ fontSize: '15px', color: '#B25FF3' }} />
                                </div>
                            )}
                            {type === 'bid' && (
                                <div className="bid">
                                    <GavelIcon sx={{ fontSize: '15px', color: '#B25FF3' }} />
                                </div>
                            )}

                            <button className="hideMessage" onClick={()=>setIsVisible(false)}>
                                <CloseIcon sx={{ fontSize: '12px' }} />
                            </button>
                        </div>
                    </div>
                    <div className="lastMessageBox">
                        {type === 'message' ? lastChat :
                            type === 'like' ? `${artworkTitle}을(를) 좋아합니다!` :
                                type === 'share' ? `${artworkTitle}을(를) 공유했습니다!` :
                                    type === 'buy' ? `${artworkTitle}을(를) 구매했습니다!` :
                                        type === 'bid' ? `${artworkTitle}을(를) 낙찰받았습니다!` :
                                            null
                        }
                    </div>
                </div>
            </div>)}
        </>
    );
}

export default NoticeLogContent;