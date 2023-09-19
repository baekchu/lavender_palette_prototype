import React, { useState, useEffect } from 'react';
import './ImgMoveModal.css';
import InterestFolder from './InterestFolder';
import CloseIcon from '@mui/icons-material/Close';

interface ImgMoveModalProps {
    modalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const ImgMoveModal: React.FC<ImgMoveModalProps> = ({ modalOpen, setModalOpen }) => {
    /** 창 열리면 최상위 화면 스크롤 방지 */
    useEffect(() => {
        if (modalOpen) {
          document.body.style.overflowY = 'hidden';
        } else {
          document.body.style.overflowY = 'auto';
        }
      
        return () => {
          document.body.style.overflowY = 'auto';
        };
      }, [modalOpen]);


    return (
        <>
            {modalOpen && (
                <div className="moveBack" onClick={() => setModalOpen(false)}>
                    <div className="moveModal" onClick={(e) => e.stopPropagation()}>
                        <div className="topBox">
                            <div className="topLeft">
                                파일을 이동시킬 폴더를 선택해주세요
                            </div>
                            <div className="topRight">
                                <button className="btn" onClick={() => setModalOpen(false)}>
                                    <CloseIcon sx={{ fontSize: '18px', color: 'gray' }} />
                                </button>
                            </div>
                        </div>
                        <div className="botBox">
                            <div className="folderDisplay">
                                <InterestFolder isFolderOpen={true} folderName='test1' />
                                <InterestFolder isFolderOpen={true} folderName='test2' />
                                <InterestFolder isFolderOpen={true} folderName='test3' />
                                <InterestFolder isFolderOpen={true} folderName='test4' />
                                <InterestFolder isFolderOpen={true} folderName='test1' />
                                <InterestFolder isFolderOpen={true} folderName='test2' />
                                <InterestFolder isFolderOpen={true} folderName='test1' />
                                <InterestFolder isFolderOpen={true} folderName='test2' />
                                <InterestFolder isFolderOpen={true} folderName='test3' />
                                <InterestFolder isFolderOpen={true} folderName='test4' />
                                <InterestFolder isFolderOpen={true} folderName='test1' />
                                <InterestFolder isFolderOpen={true} folderName='test2' />
                                <InterestFolder isFolderOpen={true} folderName='test1' />
                                <InterestFolder isFolderOpen={true} folderName='test2' />
                                <InterestFolder isFolderOpen={true} folderName='test1' />
                                <InterestFolder isFolderOpen={true} folderName='test2' />
                                <InterestFolder isFolderOpen={true} folderName='test3' />
                                <InterestFolder isFolderOpen={true} folderName='test4' />
                                <InterestFolder isFolderOpen={true} folderName='test1' />
                            </div>
                        </div>
                    </div>
                </div>)}
        </>
    );
}

export default ImgMoveModal;