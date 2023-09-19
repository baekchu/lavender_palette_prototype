import React, { useState, useEffect } from "react";
import DisplayModal from "components/DisplayModal/DisplayModal";

interface RepArtProps {
    imgSrc: string,
    index: number,
}

const RepArtworkImg: React.FC<RepArtProps> = ({ imgSrc, index }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        if (openModal) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
    }, [openModal]);

    return (
        <>
            <div className="repContent" onClick={() => setOpenModal(true)}>
                <img
                    src={imgSrc}
                    alt={`Representative Image ${index + 1}`}
                    className="repImg"
                />
                <div className="repImgInfo">
                    제목
                </div>
            </div>
            {openModal && <DisplayModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                imgSrc={imgSrc}
            />}
        </>
    );
}

export default RepArtworkImg;