import React, { useState } from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

interface ReqFilterProps {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const ReqFilter: React.FC<ReqFilterProps> = ({ tags, setTags }) => {
    const [tagInput, setTagInput] = useState('');

    const handleTagAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (tags.length >= 10) {
            alert("태그는 최대 10개까지 등록 가능합니다.");
            return;
        }
        const trimmedTag = tagInput.trim();
        if (trimmedTag !== '' && !tags.includes(trimmedTag)) {
            setTags([...tags, trimmedTag]);
            setTagInput('');
        } else if (tags.includes(trimmedTag)) {
            alert(`"${trimmedTag}" 태그는 이미 등록되었습니다.`);
        }
    };

    const handleTagDelete = (tag: string) => {
        const updatedTags = tags.filter(t => t !== tag);
        setTags(updatedTags);
    };

    const handleTagReset = (e: React.FormEvent) => {
        e.preventDefault();
        if (window.confirm("등록한 태그를 모두 초기화하시겠습니까?")) {
            setTags([]);
            alert("태그를 리셋하였습니다.")
        }
    }

    return (
        <div className="reqFilter">
            <div className="filterNav">
                <FilterAltIcon />
                태그 필터 ({tags.length}/10)
            </div>

            <div className="filterInput">
                <form className="tagInputForm" onSubmit={handleTagAdd} >
                    <input
                        type="text"
                        className="tagInput"
                        placeholder="검색할 태그 입력..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                    />
                    <button type="submit" className="filterBtn">
                        추가
                    </button>
                </form>
            </div>

            <div className="filterTagsBox">
                {tags.map((tag, index) => (
                    <div key={index} className="filterTag">
                        {tag}
                        <button
                            className="tagDel"
                            onClick={() => handleTagDelete(tag)}
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>

            <div className="filterControlBtns">
                <button className="filterResetBtn" onClick={handleTagReset}>
                    초기화
                </button>
                <button className="filterApplyBtn">
                    필터 적용하기
                    <SearchIcon />
                </button>
            </div>
        </div>
    );
}

export default ReqFilter;