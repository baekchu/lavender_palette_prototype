//https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko&authuser=0

import React, { useState } from 'react';
import { db } from '../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

const AddRequest = () => {
    // DATA FORM
    const [reqName, setReqName] = useState('')
    const [formData, setFormData] = useState({
        IDX: 0,
        title: '',
        desc: 'Sample desc',
        cost: 10000,
        registTime: new Date(),
        deadline: new Date(),
        registState: false,
        tags: [],
        responses: [],
        etc: ''
    });

    // State Change
    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'tags') {
            // 태그 입력값을 분리하여 배열로 만들어줌
            const tagsArray = value.split(',').map(tag => tag.trim());
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: tagsArray,
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    // Submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = doc(db, "Requests", reqName);
            const updatedFormData = {
                ...formData,
                registTime: new Date().toISOString().slice(0, 16),
            }; // 등록 시간
            await setDoc(docRef, updatedFormData);
            alert(`${reqName}이(가) 등록되었습니다!`);
            setReqName('');
            setFormData({
                IDX: 0,
                title: '',
                desc: 'Sample desc',
                cost: 10000,
                registTime: new Date(),
                deadline: new Date(),
                registState: false,
                tags: [],
                responses: [],
                etc: ''
            });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    // 텍스트 폼을 이용해서 데이터를 받아와 DB에 저장
    return (
        <div>
            <h2>Create Request</h2>

            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>문서 이름:</label>
                    <input
                        type="text"
                        value={reqName}
                        onChange={(event) => setReqName(event.target.value)}
                        placeholder='리퀘스트 이름'
                    />
                </div>
                <div>
                    <label>요청 제목:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder='제목'
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
                        value={formData.cost}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>기한:</label>
                    <input
                        type="datetime-local"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        placeholder='2023-07-26'
                    // 입력 형태 변경 필요(warning)
                    />
                </div>
                <div>
                    <label>태그:</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags.join(', ')}
                        onChange={handleChange}
                        placeholder='태그1, 태그2'
                    />
                </div>
                <div>
                    <label>기타:</label>
                    <textarea
                        name="etc"
                        value={formData.etc}
                        onChange={handleChange}
                        placeholder='기타'
                    />
                </div>
                <button type="submit">서버등록</button>
            </form>
        </div>
    );
}

export default AddRequest;
