import React, { useState, useRef, useEffect } from "react";
import './DisplayModal.css';

/** 아이콘 */
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DownloadIcon from '@mui/icons-material/Download';
import DiamondIcon from '@mui/icons-material/Diamond';
import HelpIcon from '@mui/icons-material/Help';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';

import BottomImgSlide from './BottomImgSlide';
import Comment from "./Comment";
import CommentAdd from "./CommentAdd";

interface DisplayModalProps {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    imgSrc: string,
    //relativeImgList: string[],
    /** 제목, 작가, 팔로우, 알람, 설명, 태그[], 댓글[] 추가필요*/
}

const DisplayModal: React.FC<DisplayModalProps> = ({ openModal, setOpenModal, imgSrc }) => {
    /** 팔로우 및 알람 상태 */
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const [isAlarm, setIsAlarm] = useState<boolean>(false);

    /** 댓글 작성 탭 열기 */
    const [openTab, setOpenTab] = useState<boolean>(false);

    /** 댓글 부분의 ref 선언 */
    const commentBoxRef = useRef<HTMLDivElement | null>(null);
    const scrollToCommentBoxTop = () => {
        if (commentBoxRef.current) {
            // commentBox의 최상단 위치로 스크롤 이동
            commentBoxRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    /** 창 열리면 최상위 화면 스크롤 방지 */
    useEffect(() => {
        if (openModal) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }

        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, [openModal]);


    // 가로 스크롤을 위한 마우스 휠 이벤트 핸들러
    const handleHorizontalScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const delta = e.deltaY || e.detail || (e.nativeEvent as WheelEvent).deltaY;
        const element = document.querySelector('.Xscroll');

        if (element) element.scrollLeft += delta / 10;
    };

    // 이벤트 핸들러 등록
    const element = document.querySelector('.Xscroll');
    if (element) element.addEventListener('wheel', handleHorizontalScroll as any);


    return (
        <>
            {openModal && (
                <div className="displayModal" onClick={() => setOpenModal(false)}>
                    <button className="modalCloseBtn" onClick={() => setOpenModal(false)}>
                        <CloseIcon />
                    </button>
                    <div className="modalBox" onClick={(event) => event.stopPropagation()}>
                        <div className="leftBox">
                            <div className="leftInner">
                                {/** 이미지 상단 네비 */}
                                <div className="leftTop">
                                    <div className="LTleft">
                                        <img
                                            src="https://i.namu.wiki/i/SG9dcHX0o1cdCcwI6hsggTOCq_pgIXP1ZQpbj5A4Kl3Em3Jj9tFxiiJrapJgF3vTZp7oY6BqTHKa1pael60T4A.webp"
                                            alt=""
                                            className="authorImg" />
                                        <div className="authorName">
                                            작가 이름
                                        </div>
                                        <button
                                            className={isFollowed ? "authorFollow selected" : "authorFollow"}
                                            onClick={() => setIsFollowed(!isFollowed)}>
                                            {isFollowed ? "팔로우 함" : "팔로우"}
                                        </button>
                                    </div>
                                    <div className="LTright">
                                        <button className="btn">
                                            <MailOutlinedIcon sx={{ fontSize: '22px' }} />
                                            <div className="btnText">메세지 보내기</div>
                                        </button>
                                        <button
                                            className={isAlarm ? "btn selected" : "btn"}
                                            onClick={() => setIsAlarm(!isAlarm)}>
                                            {isAlarm ?
                                                <NotificationsIcon sx={{ fontSize: '22px' }} /> :
                                                <NotificationsNoneIcon sx={{ fontSize: '22px' }} />}
                                            <div className="btnText">알림 설정</div>
                                        </button>
                                        <button className="btn close" onClick={() => setOpenModal(false)}>
                                            <CloseIcon />
                                        </button>

                                    </div>
                                </div>
                                <div className="leftMid">
                                    <div className="backImgDiv">
                                        <img
                                            src={imgSrc}
                                            alt=""
                                            className="backImg" />
                                    </div>
                                    <div className="imgBox">
                                        <img
                                            src={imgSrc}
                                            alt=""
                                            className="showingImg" />
                                    </div>
                                </div>
                                <div className="leftBot">
                                    <div className="innerDisplay">
                                        <BottomImgSlide />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="rightBox">
                            {/** 작품 제목 설명 */}
                            <div className="rightTop">
                                <div className="topTop">
                                    작품 제목 작품 제목 작품 제목 작품 제목
                                </div>
                                <div className="topMid">
                                    그림에 대한 설명 그림에 대한 설명 그림에 대한 설명
                                    그림에 대한 설명 그림에 대한 설명 그림에 대한 설명
                                    그림에 대한 설명 그림에 대한 설명 그림에 대한 설명
                                    그림에 대한 설명 그림에 대한 설명 그림에 대한 설명
                                    그림에 대한 설명 그림에 대한 설명 그림에 대한 설명
                                    그림에 대한 설명 그림에 대한 설명 그림에 대한 설명
                                </div>
                                <div className="topBot">
                                    <div className="tag">태그1</div>
                                    <div className="tag">태그2</div>
                                    <div className="tag">태그3</div>
                                    <div className="tag">태그4</div>
                                    <div className="tag">태그5</div>
                                </div>
                            </div>

                            {/** 버튼 */}
                            <div className="rightMid Xscroll">
                                <button className="btn">
                                    <div className="btnIcon"><BookmarkBorderIcon /></div>
                                    <div className="btnTitle">북마크</div>
                                </button>
                                <button className="btn">
                                    <div className="btnIcon"><HelpIcon /></div>
                                    <div className="btnTitle">정보</div>
                                </button>
                                <button className="btn">
                                    <div className="btnIcon"><ShareIcon /></div>
                                    <div className="btnTitle">공유</div>
                                </button>
                                <button className="btn">
                                    <div className="btnIcon"><DownloadIcon /></div>
                                    <div className="btnTitle">다운로드</div>
                                </button>
                                <button className="btn">
                                    <div className="btnIcon"><DiamondIcon /></div>
                                    <div className="btnTitle">구독</div>
                                </button>
                                <button className="btn">
                                    <div className="btnIcon"><VolunteerActivismIcon /></div>
                                    <div className="btnTitle">후원</div>
                                </button>
                            </div>

                            {/** 댓글 부분 */}
                            <div className="rightBot">
                                <div className="commentTitle">
                                    <div className="titleL">댓글</div>
                                    <div className="commentCnts">2000</div>
                                    {/** 댓글 개수 */}
                                    <button
                                        className="openAddTab"
                                        onClick={() => {
                                            setOpenTab(true);
                                            scrollToCommentBoxTop();
                                        }
                                        }>
                                        <AddCommentIcon sx={{ fontSize: '20px', color: '#B25FF3' }} />
                                    </button>
                                </div>
                                <div className="commentBox" ref={commentBoxRef}>
                                    <CommentAdd
                                        userImg="https://i.namu.wiki/i/wkwHbl319sCFlTR6pt9P4AnhauWeYt9a28QtGf50DbR2hAUrZ7hcabdwI3KvPSHJd6JoLJ9PZMONNXcdE0sOqg.webp"
                                        userName="나"
                                        openTab={openTab}
                                        setOpenTab={setOpenTab}
                                    />
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <Comment
                                            key={index}
                                            userImg="https://i.namu.wiki/i/wkwHbl319sCFlTR6pt9P4AnhauWeYt9a28QtGf50DbR2hAUrZ7hcabdwI3KvPSHJd6JoLJ9PZMONNXcdE0sOqg.webp"
                                            userName="파이리"
                                            commentData="댓글 내용 출력하는 부분"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DisplayModal;