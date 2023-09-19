import React, { useState, useEffect } from "react";
import DisplayModal from "components/DisplayModal/DisplayModal";

interface ArtProps {
    imgSrc: string,
    index: number,
}

const ArtworkImg: React.FC<ArtProps> = ({ imgSrc, index }) => {
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
            <div className="artworks" onClick={() => setOpenModal(true)}>
                <img
                    src={imgSrc}
                    alt=""
                    className="artworkImg"
                />
                <div className="artworkInfo">
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

export default ArtworkImg;