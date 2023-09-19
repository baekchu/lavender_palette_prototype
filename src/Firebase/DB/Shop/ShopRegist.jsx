import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Form이 비어있지 않도록 하는 기능 추가 필요

const RegistArtwork = () => {
    const [workName, setWorkName] = useState('');
    const [formData, setFormData] = useState({
        IDX: 0,
        title: '',
        desc: 'Sample desc',
        cost: 10000,
        isAuction: false,
        registTime: new Date(),
        deadline: new Date(),
        likes: 0,
        tags: [],
        comments: [],
        url: 'set/init',
        etc: '',
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    // 폼 업데이트
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'tags') {
            const tagsArray = value.split(',').map((tag) => tag.trim());
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: tagsArray,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    // 업로드된 이미지 이름
    const handleImageSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // 작품 등록 (이미지 업로드 성공 시 폼 등록, 이미지 링크 받아 url에 저장)
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            setUploading(true);

            // 이미지 업로드
            if (formData.title !== '' && formData.title !== null && selectedFile) {
                const imageRef = ref(storage, `Artworks/${formData.title}`);
                await uploadBytes(imageRef, selectedFile);
            } else { throw new Error("파일명이 없거나 업로드된 파일이 없습니다."); }

            // 작품 등록 (등록 시간과 url 변경)
            const docRef = doc(db, 'Artworks', workName);
            const imageRef = ref(storage, `Artworks/${formData.title}`);
            const imageUrl = await getDownloadURL(imageRef);
            const updatedFormData = {
                ...formData,
                registTime: new Date().toISOString().slice(0, 16),
                url: imageUrl,
            };
            await setDoc(docRef, updatedFormData);
            alert(`${workName}이(가) 등록되었습니다!`);
            // 변수 초기화
            setWorkName('');    
            setFormData({
                IDX: 0,
                title: '',
                desc: 'Sample desc',
                cost: 10000,
                isAuction: false,
                registTime: new Date(),
                deadline: new Date(),
                likes: 0,
                tags: [],
                comments: [],
                url: '',
                etc: '',
            });
            setSelectedFile(null);
        } catch (error) {
            console.error('Error adding document or uploading image: ', error);
            alert('작품 등록 또는 이미지 업로드 중 오류가 발생했습니다.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h2>Regist Artwork</h2>

            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>작업 이름:</label>
                    <input
                        type="text"
                        value={workName}
                        onChange={(event) => setWorkName(event.target.value)}
                        placeholder="작업 이름"
                    />
                </div>
                <div>
                    <label>작품 제목:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="제목"
                    />
                </div>
                <div>
                    <label>설명:</label>
                    <input
                        type="text"
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>비용:</label>
                    <input
                        type="number"
                        name="cost"
                        step={1000}
                        min={0}
                        value={formData.cost}
                        onChange={handleChange}
                    />
                    <input
                        type="checkbox"
                        name="isAuction"
                        value={formData.isAuction}
                        onChange={handleChange}
                    />
                    <label>경매 등록 </label>
                </div>
                <div>
                    <label>기한:</label>
                    <input
                        type="datetime-local"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        placeholder="2023-07-26"
                    />
                </div>
                <div>
                    <label>태그:</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags.join(', ')}
                        onChange={handleChange}
                        placeholder="태그1, 태그2"
                    />
                </div>
                <div>
                    <label>기타:</label>
                    <textarea
                        name="etc"
                        value={formData.etc}
                        onChange={handleChange}
                        placeholder="기타"
                    />
                </div>
                <div>
                    <label>이미지 선택:</label>
                    <input type="file" onChange={handleImageSelect} />
                </div>
                <button type="submit" disabled={uploading}>
                    작품 등록
                </button>
            </form>

            {uploading && <p>이미지 업로드 중...</p>}

        </div>
    );
};

export default RegistArtwork;
