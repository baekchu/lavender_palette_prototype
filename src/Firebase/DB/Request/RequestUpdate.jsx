import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';

const MIN_VALUE = 10000;
const MAX_VALUE = 100000;
const STEP = 5000;

const UpdateRequest = () => {
    const [requestId, setRequestId] = useState(''); // 조회할 문서 이름
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        cost: 0,
        tags: [],
        deadline: new Date(),
    });
    const [applyPriceRange, setApplyPriceRange] = useState(false);
    const [minPrice, setMinPrice] = useState(MIN_VALUE);
    const [maxPrice, setMaxPrice] = useState(MAX_VALUE);
    const [isFormVisible, setIsFormVisible] = useState(false); // 폼 보이기 여부 추가

    const handleFetchData = async () => {
        try {
            const docRef = doc(db, 'Requests', requestId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                // Timestamp 타입인 deadline을 Date 객체로 변환
                if (data.deadline && data.deadline.toDate) {
                    data.deadline = data.deadline.toDate();
                }
                setFormData(data);
                setMinPrice(data.cost);
                setMaxPrice(data.cost);
                setApplyPriceRange(false);
                setIsFormVisible(true); // 데이터가 존재하면 폼 보이기
            } else {
                alert('해당 문서가 존재하지 않습니다.');
                setIsFormVisible(false); // 데이터가 없으면 폼 숨기기
            }
        } catch (error) {
            console.error('Error fetching document: ', error);
        }
    };

    // 폼 데이터 초기화 함수
    const resetFormData = () => {
        setFormData({
            title: '',
            desc: '',
            cost: 0,
            tags: [],
            deadline: new Date(),
        });
    };

    useEffect(() => {
        setIsFormVisible(false); // 처음에는 폼 숨기기
    }, [requestId]); // requestId가 변경되면 실행

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (window.confirm('수정하시겠습니까?')) {
            // 수정하는 시점에 서버 타임스탬프를 생성하여 업데이트
            formData.deadline = serverTimestamp();
            handleConfirmation();
        }
    };

    const handleConfirmation = async () => {
        try {
            const docRef = doc(db, 'Requests', requestId);
            await updateDoc(docRef, formData);
            alert('데이터가 성공적으로 수정되었습니다!');
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    const DelClicked = (event) => {
        event.preventDefault();
        if (window.confirm('삭제하시겠습니까?')) {
            handleDelete();
        }
    };

    const handleDelete = async () => {
        try {
            const docRef = doc(db, 'Requests', requestId);
            await deleteDoc(docRef);
            alert('데이터가 성공적으로 삭제되었습니다!');
            setIsFormVisible(false); // 데이터가 삭제되면 폼 숨기기
            resetFormData(); // 폼 데이터 초기화
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    }

    return (
        <div>
            <h2>Update Request</h2>
            <div>
                <label>문서 이름:</label>
                <input
                    type="text"
                    value={requestId}
                    onChange={(event) => setRequestId(event.target.value)}
                    placeholder="문서 이름 입력"
                />
                <button onClick={handleFetchData}>조회</button>
            </div>
            {isFormVisible && (
                <form>
                    <div>
                        <label>제목:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label>설명:</label>
                        <textarea
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            style={{ width: '100%', height: '100px' }}
                        />
                    </div>
                    <div>
                        <label>비용:</label>
                        <input
                            type="number"
                            name="cost"
                            step={STEP}
                            min={MIN_VALUE}
                            max={MAX_VALUE}
                            value={formData.cost}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>태그:</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags.join(', ')}
                            onChange={(e) =>
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    tags: e.target.value.split(',').map((tag) => tag.trim()),
                                }))
                            }
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label>마감 기한:</label>
                        <input
                            type="date" // 날짜를 입력받는 형식으로 설정
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                        />
                    </div>

                    <button onClick={handleFormSubmit}>수정</button>
                    <button onClick={DelClicked}>삭제</button>
                </form>
            )}

        </div>
    );
};

export default UpdateRequest;
