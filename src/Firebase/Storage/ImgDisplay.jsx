import React, { useState } from "react";
import { storage } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

// 이미지의 링크와 가로, 세로 크기를 입력으로 받아 출력.
const ImageDisplay = ({ imgPath, width, height='auto' }) => {
    const [imageUrl, setImageUrl] = useState(null);

    const handleFetchImage = async () => {
        try {
            const spaceRef = ref(storage, imgPath);
            const url = await getDownloadURL(spaceRef);
            setImageUrl(url);
        } catch (error) {
            console.error('Error fetching image: ', error);
        }
    };

    return (
        <div>
            <h2>Image Display</h2>
            <button onClick={handleFetchImage}>Fetch Image</button>
            <p>
                {imageUrl && <img src={imageUrl} alt="Fetched" style={{ width: width, height: height, maxWidth: '100%', maxHeight: '100%' }} />}
            </p>
        </div>
    );
};

export default ImageDisplay;