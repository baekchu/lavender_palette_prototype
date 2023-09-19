import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const MIN_VALUE = 10000;
const MAX_VALUE = 100000;
const STEP = 5000;

const SearchRequests = () => {
  const [searchTitle, setSearchTitle] = useState(''); // 사용자가 입력한 검색 제목
  const [searchTags, setSearchTags] = useState([]); // 사용자가 입력한 검색 태그
  const [searchResults, setSearchResults] = useState([]); // 검색 결과를 담을 배열
  const [applyPriceRange, setApplyPriceRange] = useState(false);
  const [minPrice, setMinPrice] = useState(MIN_VALUE);
  const [maxPrice, setMaxPrice] = useState(MAX_VALUE);

  const handleSearchTagsChange = (value) => {
    const tagsArray = value.split(',').map((tag) => tag.trim());
    if (tagsArray.length === 1 && tagsArray[0] === '') {
      setSearchTags([]);
    } else {
      setSearchTags(tagsArray);
    }
  };

  const fetchRequests = async () => {
    try {
      // Firestore "Requests" 컬렉션 참조 생성
      const collectionRef = collection(db, 'Requests');

      // 검색 조건 설정 (제목 또는 태그가 입력되지 않았을 때는 해당 조건을 생략)
      let q = collectionRef;
      if (searchTitle) {
        // "title" 필드에 "searchTitle"이 포함된 요청들 선택
        q = query(q, where('title', '>=', searchTitle), where('title', '<=', searchTitle + "\uf8ff"));
      }
      if (searchTags.length > 0) {
        // "tags" 필드에 "searchTags" 배열 중 하나라도 포함된 요청들 선택
        q = query(q, where('tags', 'array-contains-any', searchTags));
      }
      if (applyPriceRange) {
        // 가격 범위 필터를 적용하는 경우
        q = query(q, where('cost', '>=', minPrice), where('cost', '<=', maxPrice));
      }

      // 쿼리 실행 및 결과 가져오기
      const querySnapshot = await getDocs(q);
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSearchResults(fetchedData);
    } catch (error) {
      alert('검색 결과가 없습니다.');
      console.error('Error fetching requests: ', error);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    fetchRequests();
  };

  useEffect(() => {
    console.log(searchTitle);
  }, [searchTitle]);

  return (
    <div>
      <h2>Search Requests</h2>
      <form onSubmit={submit}>
        {/* 제목 검색 입력창 */}
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Search by title"
        />

        {/* 태그 검색 입력창 */}
        <input
          type="text"
          value={searchTags.join(', ')}
          onChange={(e) => handleSearchTagsChange(e.target.value)}
          placeholder="Search by tag"
        />

        {/* 최소 가격 입력 박스 */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={applyPriceRange}
              onChange={(e) => setApplyPriceRange(e.target.checked)}
            />
          </label>
          <label>
            최소 가격:
            <input
              type="number"
              value={minPrice}
              min={MIN_VALUE}
              max={MAX_VALUE}
              step={STEP}
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
            />
          </label>

          {/* 최대 가격 입력 박스 */}
          <label>
            최대 가격:
            <input
              type="number"
              value={maxPrice}
              min={MIN_VALUE}
              max={MAX_VALUE}
              step={STEP}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            />
          </label>
        </div>

        <button type="submit">Search</button>
      </form>

      {/* 결과 출력창 */}
      <hr />
      <p>검색 결과 개수: {searchResults.length}</p>
      <ul>
        {searchResults.map((request) => (
          <li key={request.id}>
            <h3>{request.id}</h3>
            <p>제목: {request.title}</p>
            <p>태그: {request.tags.join(', ')}</p>
            <p>비용: {request.cost}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchRequests;
