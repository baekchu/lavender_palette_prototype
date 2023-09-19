import React, { useRef, useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

/** 
 * 탭 동작에 관한 컴포넌트
 * 생성 시 이름 적는 칸이 나타나고, 엔터 시 탭이 추가된다.
 */

interface AddTabProps {
    tab: { id: number; name: string },
    tabNum: number,
    setTabNum: React.Dispatch<React.SetStateAction<number>>,
    closeTab: Function,
    isTabMaking: boolean,
    setIsTabMaking: React.Dispatch<React.SetStateAction<boolean>>,
}

const AddTabFunction: React.FC<AddTabProps> = ({ tab, tabNum, setTabNum, closeTab, isTabMaking, setIsTabMaking }) => {
    const [isNaming, setIsNaming] = useState<boolean>(true);
    const [tabName, setTabName] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTabName(e.target.value);
    }

    const handleNameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (tabName.trim() !== "") {
            setIsNaming(false);
            setIsTabMaking(false);
        }
    }

    /** 탭 생성 시 포커스 */
    const tabNameInputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        if (isTabMaking && tabNameInputRef.current) {
            tabNameInputRef.current.focus();
        }
    }, []);

    return (
        <>
            {isNaming ? (
                <form className="tabNaming" onSubmit={handleNameSubmit}>
                    <button className="navTab selected">
                        <input
                            type="text"
                            className="tabName"
                            value={tabName}
                            onChange={handleInputChange}
                            ref={tabNameInputRef}
                            onBlur={handleNameSubmit}
                        />
                        <button
                            className='closeBtn'
                            onClick={(e) => {
                                e.stopPropagation();
                                setTabName("");
                                setIsNaming(false);
                                setIsTabMaking(false);
                            }}>
                            <CloseIcon sx={{ fontSize: '14px', marginLeft: '5px' }} />
                        </button>
                    </button>
                </form>
            ) : (
                (tabName != "" && (
                    <button
                        key={tab.id}
                        className={tabNum === tab.id ? "navTab selected" : "navTab"}
                        onClick={() => {
                            setTabNum(tab.id);
                        }}
                    >
                        <div className="tabName">{tabName}</div>
                        <button className="tabCloseBtn" onClick={() => closeTab(tab.id)}>
                            <CloseIcon sx={{ fontSize: '14px' }} />
                        </button>
                    </button>
                ))
            )}
        </>
    );
}

export default AddTabFunction;