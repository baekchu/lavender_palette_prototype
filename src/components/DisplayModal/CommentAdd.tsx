import React, { useState, useEffect } from "react";

import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import CloseIcon from '@mui/icons-material/Close';

interface commentProps {
    userImg: string,
    userName: string,
    openTab: boolean,
    setOpenTab: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentAdd: React.FC<commentProps> = ({ userImg, userName, openTab, setOpenTab }) => {
    /** 입력 정보 제출 관련 함수 */
    const [commentText, setCommentText] = useState("");
    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
        if (newText.length <= 200) {
            setCommentText(newText);
        }
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };
    const handleSubmit = () => {
        console.log("Comment submitted:", commentText);
        setCommentText("");
        setOpenTab(false);
    };

    /** 창 닫기 */
    const askTabClose = () => {
        if (confirm("댓글 입력을 그만두시겠습니다? 입력하던 정보는 사라집니다.")) {
            setCommentText("");
            setOpenTab(false);
        }
    }

    return (
        <>
            {openTab && (
                <div className="commentContent">
                    <div className="commentTop">
                        <img
                            src={userImg}
                            alt=""
                            className="userImg" />
                        <div className="userName">
                            {userName}
                        </div>
                        <button className="closeBtn" onClick={askTabClose}>
                            <CloseIcon sx={{ fontSize: '16px', color: 'gray' }} />
                        </button>
                    </div>
                    <div className="commentBot">
                        <div className="commentData">
                            <textarea
                                className="commentWrite"
                                value={commentText}
                                onChange={handleCommentChange}
                                onKeyDown={handleKeyDown}
                                maxLength={200} />
                        </div>
                        <div className="commentBtns">
                            ({commentText.length}/200)
                            <button className="submitBtn" onClick={handleSubmit}>
                                <LabelImportantIcon sx={{ fontSize: '22px' }} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}

export default CommentAdd;