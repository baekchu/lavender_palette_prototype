import React, { useState, useEffect, useRef, useMemo } from 'react';
import MaterialUISwitch from './ResearchToggle';
import ImgCard from './ImgCard';
import './ResearchMain.css';

import FormControlLabel from '@mui/material/FormControlLabel';

/**
 * 위아래가 좋아요 싫어요
 * 좌우가 넘기기
 * 묶음 이미지일 경우 별도의 버튼
 */


// 아이콘
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import InfoIcon from '@mui/icons-material/Info';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import DiamondIcon from '@mui/icons-material/Diamond';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';


const Research: React.FC = () => {

    // 탐색 탭 토글 관리
    const [isResearchTab, setIsResearchTab] = useState<boolean>(false);
    const [isResearchTabDelay, setIsResearchTabDelay] = useState<boolean>(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsResearchTabDelay(isResearchTab);
        }, 150);
        return () => clearTimeout(timeout);
    }, [isResearchTab]);

    // 이미지 관리
    const [imgShow, setImgShow] = useState<boolean>(true);
    const [imgIndex, setImgIndex] = useState<number>(0);
    const [imgSubIndex, setImgSubIndex] = useState<number>(0);
    const [imgLike, setImgLike] = useState<boolean>(false);

    // 작품 정보
    const [commentLike, setCommentLike] = useState<boolean>(false);

    // 하단 정보창
    const [openInfo, setOpenInfo] = useState<boolean>(false);
    const [addBoxShow, setAddBoxShow] = useState<boolean>(false);

    // 버튼 입력
    const [clickedButton, setClickedButton] = useState<string | null>(null);
    const [prevClickedButton, setPrevClickedButton] = useState<string | null>(null);

    // 인풋 박스 입력값
    const [commentValue, setCommentValue] = useState('');

    // 창 포커스 위치용 ref
    const infoRef = useRef<HTMLInputElement | null>(null);
    const commentInputRef = useRef<HTMLInputElement | null>(null);

    // 조건에 맞는 이미지 오브젝트 불러오기
    // imgUrl, isLike, likes, author, title, comments 등등 정보가 포함
    const imgArray = [
        "https://png.pngtree.com/background/20230610/original/pngtree-landscape-wallpaper-fb-wallpapers-picture-image_3017516.jpg",
        "https://i.namu.wiki/i/cECQ9uqTORrrDs4CbZbvLpfie2GzDDNttsiqWBoEjpPPpHMqRk9ACc72YLSBkZu0nTBoxisyHOr84c9XdLcDuQ.gif",
        "https://blog.kakaocdn.net/dn/Dfv6k/btrBzdJaPT3/7BGro4WlZJKmgKpPwNIu51/img.gif",
        "https://blog.kakaocdn.net/dn/bMvysG/btrMWdSJqlg/SVRcM9itUI7TOCpdSXIuQk/img.gif",
        "https://img.gqkorea.co.kr/gq/2022/07/style_62da366deba2b.jpg",
        "https://s3.orbi.kr/data/file/united2/9d01c206ce034643a03a42a80ce52e99.jpeg",
        ["https://img.hankyung.com/photo/202206/BF.30217464.1.png",
            "https://thumb.mtstarnews.com/06/2023/05/2023052218024866078_1.jpg/dims/optimize",
            "https://cdn.mhnse.com/news/photo/202305/183284_183212_5231.jpg"],
        "https://media.tenor.com/Q3aVQhYs-vYAAAAd/%EA%B9%80%EC%B1%84%EC%9B%90-%EC%B1%84%EC%9B%90%EC%B1%84%EC%9B%90.gif",
        ["https://img.wkorea.com/w/2023/08/style_64d4a4ecb2eba-560x700.jpg",
            "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/05/03/1bb584c4-e642-40a2-bb1e-8a1a78f8c682.jpg",]
    ];


    /** 페이지 로드 시 이벤트 리스너 추가 */
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    /** 하단 탭 슬라이드에 대한 코드 */
    useEffect(() => {
        // openInfo가 먼저 true로 변하면 0.15초 뒤에 addBoxShow가 true로 바뀜
        if (openInfo) {
            const timeout = setTimeout(() => {
                setAddBoxShow(true);
            }, 150);

            return () => clearTimeout(timeout);
        }
    }, [openInfo]);

    // 반대로 addBoxShow가 false가 되면 0.15초 뒤에 setOpenInfo가 false로 바뀜
    useEffect(() => {
        if (!addBoxShow) {
            const timeout = setTimeout(() => {
                setOpenInfo(false);
            }, 150);

            return () => clearTimeout(timeout);
        }
    }, [addBoxShow]);

    // w가 입력해제되면 최상단에, c가 입력해제되면 입력창에 포커스
    useEffect(() => {
        if (prevClickedButton === 'w') {
            if (infoRef.current) infoRef.current.focus();
        } else if (prevClickedButton === 'c') {
            if (commentInputRef.current) commentInputRef.current.focus();
        }
        setTimeout(() => {
            setPrevClickedButton(null);
        }, 200);
    }, [prevClickedButton]);


    // 유저 페이지로 이동 - 미완성
    const toUserPage = (e: React.MouseEvent, uid: string) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`${uid} 페이지로 이동`);
    }

    // 키보드 입력 관리
    const handleKeyPress = (e: KeyboardEvent) => {
        const key = e.key;
        if (['a', 'w', 's', 'd', 'c', 'Escape'].includes(key)) {
            handleAction(key);
        }
    }

    // 버튼 입력 후 동작관리
    const handleAction = (key: string) => {
        switch (key) {
            case 'w':
                setOpenInfo(true);
                console.log('자세히 보기');
                break;
            case 'c':
                console.log('댓글');
                setOpenInfo(true);
                break;
            case 'a':
                break;
            case 'd':
                break;
            case 'Escape':
                setAddBoxShow(false);
                break;
            default:
                break;
        }

        setClickedButton(key);
        setTimeout(() => {
            setClickedButton(null);
            setPrevClickedButton(key);
        }, 200); // 애니메이션 지속 시간 (0.2초)
    }

    // 이미지 재렌더링 방지
    const imgCards = useMemo(() => {
        const cards = imgArray.flatMap((imgUrl, index) => {
            const isArray = Array.isArray(imgUrl);

            if (isArray) {
                return imgUrl.map((url, subIndex) => (
                    <ImgCard
                        imgLength={imgArray.length}
                        key={index * 985 + subIndex} // 키값 충돌 방지를 위한 임시 해싱
                        clickedButton={clickedButton}
                        imgShow={imgIndex === index && imgSubIndex === subIndex}
                        setImgShow={setImgShow}
                        imgUrl={url}
                        imgIndex={imgIndex}
                        setImgIndex={setImgIndex}
                        imgSubIndex={imgSubIndex}
                        setImgSubIndex={setImgSubIndex}
                        isArray={isArray}
                        arrLen={imgUrl.length}
                    />
                ));
            } else {
                return (
                    <ImgCard
                        imgLength={imgArray.length}
                        key={index}
                        clickedButton={clickedButton}
                        imgShow={imgIndex === index}
                        setImgShow={setImgShow}
                        imgUrl={imgUrl}
                        imgIndex={imgIndex}
                        setImgIndex={setImgIndex}
                        imgSubIndex={0}
                        setImgSubIndex={setImgSubIndex}
                        isArray={isArray}
                        arrLen={1}
                    />
                );
            }
        });

        return cards;
    }, [imgArray]);


    /* 메인 리턴 ********************************************/
    return (
        <>
            {(isResearchTab || isResearchTabDelay) && (
                <div className={(isResearchTab && isResearchTabDelay) ? "ResearchMain" : "ResearchMain hidden"}>
                    <div className="researchContainer">
                        <div className="top">
                            <div className="imgBox">
                                {imgCards}
                            </div>
                        </div>
                        <div className="bot">
                            <div className="Aside">
                                {/** 프로필, 제목, 자세히 */}
                                <div className="left">
                                    <div className="imgDiv" onClick={(e) => toUserPage(e, "2asdD12Wcv2")}>
                                        <img
                                            src="https://pbs.twimg.com/media/F5qe1T5bYAADem7?format=jpg&name=large"
                                            alt="" className="profImg" />
                                    </div>
                                    <div className="textDiv">
                                        <div className="title">title title title title</div>
                                        <div className="authorName"
                                            onClick={(e) => toUserPage(e, "2asdD12Wcv2")}>
                                            @author
                                        </div>
                                    </div>
                                    <button
                                        className={`btn ${clickedButton === 'w' ? 'clicked' : ''}`}
                                        onClick={() => handleAction('w')}>
                                        <ZoomInOutlinedIcon sx={{ fontSize: '32px' }} />
                                        <span className="tag">w</span>
                                    </button>
                                </div>

                                {/** 댓글 */}
                                <div className="mid">
                                    <img src="data:image/jpeg;base64,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"
                                        alt=""
                                        className="commentImg"
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => toUserPage(e, "2asdD12Wcv2")} />
                                    <div className="commentBox">
                                        <div className="commentText">
                                            comment display area comment display area comment display area comment display area
                                        </div>
                                        <div className="commentLikes">
                                            <button
                                                className="like"
                                                onClick={() => setCommentLike(!commentLike)}>
                                                {commentLike ?
                                                    <FavoriteOutlinedIcon sx={{ fontSize: '18px', color: '#B25FF3' }} /> :
                                                    <FavoriteBorderOutlinedIcon sx={{ fontSize: '18px' }} />
                                                }
                                            </button>
                                            <div className="num">30</div>
                                        </div>
                                    </div>
                                    <button
                                        className={`btn ${clickedButton === 'c' ? 'clicked' : ''}`}
                                        onClick={() => handleAction('c')}>
                                        <ChatOutlinedIcon />
                                        <span className="tag">c</span>
                                    </button>
                                </div>
                            </div>
                            <div className="Bside">
                                {/** 액션 버튼 */}
                                <div className="right">
                                    <button
                                        className={`btn ${clickedButton === 'a' ? 'clicked' : ''}`}
                                        onClick={() => handleAction('a')}>
                                        <ArrowBackIosNewIcon sx={{ fontSize: '30px' }} />
                                        <span className="tag">a</span>
                                    </button>
                                    <button
                                        className={`btn ${clickedButton === 's' ? 'clicked' : ''}`}
                                        onClick={() => handleAction('s')}>
                                        {imgLike ?
                                            <FavoriteOutlinedIcon sx={{ fontSize: '30px' }} /> :
                                            <FavoriteBorderOutlinedIcon sx={{ fontSize: '30px' }} />
                                        }
                                        <span className="tag">s</span>
                                    </button>
                                    <button
                                        className={`btn ${clickedButton === 'd' ? 'clicked' : ''}`}
                                        onClick={() => handleAction('d')}>
                                        <ArrowForwardIosIcon sx={{ fontSize: '30px' }} />
                                        <span className="tag" >d</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/** 추가 정보 탭 */}
                        {openInfo && (
                            <div className={addBoxShow ? "add" : "add hidden"} ref={infoRef}>
                                <button
                                    className={addBoxShow ? "openTab" : "openTab hidden"}
                                    onClick={() => {
                                        if (openInfo && addBoxShow) {
                                            setAddBoxShow(false);
                                        }
                                    }}>
                                    <ArrowDropDownOutlinedIcon />
                                </button>
                                <div className="mainTab">
                                    <div className="addLeft">
                                        <div className="artInfo">
                                            <div className="artTop">
                                                <div className="artTitle">
                                                    title
                                                </div>
                                                <div className="author">
                                                    <img src="https://i.namu.wiki/i/_xsfPJZG12iUDYNKtSBjx_VXqghq4Hxe3OT1yekkqa-pfQLUBHSZCbESzBWN-WyOBhKZF8UELhlraCPCFIKp_A.webp"
                                                        alt="" className="authImg" />
                                                    <div className="authName">
                                                        author
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="artBot">
                                                설명을 출력하는 구역입니다.
                                            </div>
                                        </div>
                                        <div className="tags">
                                            <div className="tag">
                                                태그1
                                            </div>
                                            <div className="tag">
                                                태그2
                                            </div>
                                            <div className="tag">
                                                태그1
                                            </div>
                                            <div className="tag">
                                                태그2
                                            </div>
                                            <div className="tag">
                                                태그1
                                            </div>
                                            <div className="tag">
                                                태그2
                                            </div>
                                        </div>
                                        <div className="btns">
                                            <button className="navBtn">
                                                <BookmarkBorderOutlinedIcon />
                                                북마크
                                            </button>
                                            <button className="navBtn">
                                                <InfoIcon />
                                                정보
                                            </button>
                                            <button className="navBtn">
                                                <ShareIcon />
                                                공유
                                            </button>
                                            <button className="navBtn">
                                                <DownloadIcon />
                                                다운
                                            </button>
                                            <button className="navBtn">
                                                <DiamondIcon />
                                                구독
                                            </button>
                                            <button className="navBtn">
                                                <VolunteerActivismIcon />
                                                후원
                                            </button>
                                        </div>
                                    </div>
                                    <div className="addRight">
                                        <div className="comBox">
                                            <div className="title">
                                                댓글
                                                <span style={{ fontWeight: 'normal', marginLeft: '5px' }}>3</span>
                                            </div>
                                            <div className="comments">
                                                {/** 개별 댓글 */}
                                                <Comment
                                                    userName='권나라'
                                                    userImg='https://img.marieclairekorea.com/2021/12/mck_61c04696ead3d.jpg'
                                                    commentContent="권나라는 1티어지 권나라는 1티어지 권나라는 1티어지 권나라는 1티어지 권나라는 1티어지"
                                                    commentLikes={30}
                                                    commentRegTime="13:45"
                                                    isCommentLike={false}
                                                    key={0}
                                                />
                                                <Comment
                                                    userName='권나라'
                                                    userImg='https://img.marieclairekorea.com/2021/12/mck_61c04696ead3d.jpg'
                                                    commentContent="권나라는 1티어지 권나라는 1티어지 권나라는 1티어지 권나라는 1티어지 권나라는 1티어지"
                                                    commentLikes={30}
                                                    commentRegTime="13:45"
                                                    isCommentLike={false}
                                                    key={1}
                                                />
                                                <Comment
                                                    userName='권나라'
                                                    userImg='https://img.marieclairekorea.com/2021/12/mck_61c04696ead3d.jpg'
                                                    commentContent="권나라는 1티어지 권나라는 1티어지 권나라는 1티어지 권나라는 1티어지 권나라는 1티어지"
                                                    commentLikes={30}
                                                    commentRegTime="13:45"
                                                    isCommentLike={false}
                                                    key={2}
                                                />
                                            </div>
                                        </div>
                                        <form className="comAdd" onSubmit={(e) => {
                                            e.preventDefault();
                                            console.log(commentValue);
                                            setCommentValue("");
                                        }}>
                                            <input
                                                type="text"
                                                className="comText"
                                                ref={commentInputRef}
                                                value={commentValue}
                                                onChange={(e) => {
                                                    setCommentValue(e.target.value);
                                                }} />
                                            <button className="send" type='submit'>
                                                <SendIcon sx={{ fontSize: '22px', margin: 'auto' }} />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}


            {/** 좌상단 토글 스위치 */}
            <FormControlLabel
                className='toggleSwitch'
                style={{ zIndex: 103 }}
                control={<MaterialUISwitch
                    sx={{ m: 1 }} defaultChecked
                    checked={isResearchTab} onChange={() => setIsResearchTab(!isResearchTab)} />}
                label={null}
            />
        </>
    );
}

/**
 * 개별 메세지에 대한 모듈
 */
import ErrorIcon from '@mui/icons-material/Error';
import DeleteIcon from '@mui/icons-material/Delete';
import { ref } from 'firebase/storage';

interface CommentProps {
    userName: string,
    userImg: string,
    commentContent: string,
    commentLikes: number,
    commentRegTime: string,
    isCommentLike: boolean,
}

const Comment: React.FC<CommentProps> = ({ userName, userImg, commentContent, commentLikes, commentRegTime, isCommentLike }
) => {
    const [isMine, setIsMine] = useState(true);
    const [isLike, setIsLike] = useState<boolean>(isCommentLike);

    return (
        <div className="comment">
            <div className="user">
                <img
                    src={userImg}
                    alt=""
                    className="userImg" />
                <div className="time">
                    {commentRegTime}
                </div>
            </div>
            <div className="context">
                <div className="userName">
                    {userName}
                </div>
                <div className="contMain">
                    {commentContent}
                </div>
                <div className="btmBtns">
                    <button className="addAction"
                        onClick={() => {
                            if (isMine) {
                                window.confirm("댓글을 삭제하시겠습니까?");
                            } else {
                                window.confirm("댓글을 신고하시겠습니까?");
                            }
                        }}>
                        {isMine ?
                            <DeleteIcon sx={{ fontSize: '18px' }} /> :
                            <ErrorIcon sx={{ fontSize: '18px' }} />
                        }
                    </button>
                    <div className="commLike">
                        <button className="smlBtn" onClick={() => setIsLike(!isLike)}>
                            {isLike ?
                                <FavoriteOutlinedIcon sx={{ color: '#B25FF3', fontSize: '16px' }} /> :
                                <FavoriteBorderOutlinedIcon sx={{ fontSize: '16px' }} />}
                        </button>
                        <div className={isLike ? "likeNum liked" : "likeNum"}>
                            {isLike ? (commentLikes + 1) : commentLikes}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Research;