import React, { useState } from 'react';
import DisplayModal from 'components/DisplayModal/DisplayModal';
import ImgMoveModal from './ImgMoveModal';

import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

interface InterestContentProps {
    imgSrc: string,
    title: string,
    tags: string[];
    showInfo: boolean;
}

const InterestContent: React.FC<InterestContentProps> = ({ imgSrc, title, tags, showInfo }) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openShiftModal, setOpenShiftModal] = useState<boolean>(false);

    const handleBtnClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if(window.confirm("해당 작품의 관심 등록을 취소하겠습니까?")) {
            alert("관심 등록이 해제되었습니다.");
        }
    }

    return (
        <>
            <div className="tabImgContent"
                onClick={() => setOpenModal(true)}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}>
                <img src={imgSrc}
                    alt=""
                    className="tabImg" />
                <div className={(showInfo || isHover) ? "tabImgInfo" : "tabImgInfo hidden"}>
                    <div className="topBtns">
                        <button className="btn" onClick={(e) => {
                            e.stopPropagation();
                            setOpenShiftModal(true);
                        }}>
                            <DriveFileMoveIcon />
                        </button>
                        <button className="btn" onClick={(e) => handleBtnClick(e)}>
                            <BookmarkRemoveIcon />
                        </button>
                    </div>
                    <div className="botBtns">
                        <div className="infoTitle">
                            {title}
                        </div>
                        <div className="infoTags">
                            {tags.map((tag, index) => (
                                <div key={index} className="infoTag">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {openModal && <DisplayModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                imgSrc={imgSrc}
            />}
            {openShiftModal && (
                <ImgMoveModal
                    modalOpen={openShiftModal}
                    setModalOpen={setOpenShiftModal}
                />
            )}
        </>
    );
}

export default InterestContent;