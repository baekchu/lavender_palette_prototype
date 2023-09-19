import React, { useEffect, useState } from "react";
import './ArtworkRegist.css';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import GavelIcon from '@mui/icons-material/Gavel';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import AttributionIcon from '@mui/icons-material/Attribution';
import Message from '../ChatModal/Message';

interface ArtworkRegistProps {
    registType : number;
}

const ArtworkRegist: React.FC<ArtworkRegistProps> = ({registType}) => {
    const [tags, setTags] = useState<string[]>([]);
    const [tag, setTag] = useState<string | null>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    /**tags에 새로운 tag를 등록하는 함수
     * 공백을 제거해 저장하고, 비어있거나 중복, 10개를 초과할 시 저장되지 않으며
     * 에러 메세지를 3초동안 출력한다 */
    const addTag = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (tag == null) return;
        const trimmedTag = tag.trim();
        if (tags.includes(trimmedTag)) {
            setIsError(true);
            setErrorMessage(`${trimmedTag}은(는) 이미 등록된 태그입니다!`);
        } else if (tags.length >= 10) {
            setIsError(true);
            setErrorMessage("태그는 10개까지 등록할 수 있습니다!");
        } else if (trimmedTag === "") {
            setIsError(true);
            setErrorMessage("태그를 입력해주세요!");
        } else {
            setTags([...tags, trimmedTag]);
            setTag("");
        }
    };

    /** 저장된 태그를 제거 */
    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    /** 태그 입력 관리 */
    const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    };

    /** 에러 메세지가 3초 뒤에 사라지게 */
    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => {
                setIsError(false);
                setErrorMessage("");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isError]);

    /** 이미지 등록 조건들 */
    const [selectedAdult, setSelectedAdult] = useState<boolean>(true);
    const [selectedAI, setSelectedAI] = useState<boolean>(false);
    const [selectedRange, setSelectedRange] = useState<number>(1);
    const [selectedComment, setSelectedComment] = useState<boolean>(true);

    const [selectedCategory, setSelectedCategory] = useState<number>(registType);

    return (
        <div className="shopRegist">
            <div className="registContainer">
                {/** 이미지 업로드 */}
                <div className="regFirst">
                    <div className="imgBox">
                        <button className="btn">
                            <AddPhotoAlternateIcon />
                            이미지 업로드
                        </button>
                        <div>각 이미지는 50MB를 넘을 수 없습니다.</div>
                        <div>이미지 묶음은 200MB까지 업로드 가능합니다.</div>
                    </div>
                </div>
                {/** 제목, 설명, 옵션 */}
                <div className="regSecond">
                    <div className="descBox">
                        <input type="text" className="input title" placeholder="작품 제목" />
                        <textarea className="input desc" placeholder="작품 설명" />
                    </div>
                    <div className="descBox">
                        <form className='tagForm' onSubmit={addTag}>
                            <input
                                type="text"
                                className="input tag"
                                placeholder="태그"
                                value={tag || ''}
                                onChange={handleTagInput} />
                        </form>
                        <div className="tags">
                            {tags.map((tag, index) => (
                                <div key={index} className="tag" onClick={() => removeTag(tag)}>
                                    {tag}
                                </div>
                            ))}
                        </div>
                        <div className="tagLimit">
                            {isError ? (
                                <div className="errMes">{errorMessage}</div>
                            ) : (
                                `${tags.length}/10`
                            )}
                        </div>
                    </div>

                    <div className="selectBox">
                        <div className="selectTitle">
                            연령제한
                        </div>
                        <div className="selectArea">
                            <button
                                value={1}
                                className={(selectedAdult === true) ? "selectComponent selected" : "selectComponent"}
                                onClick={() => setSelectedAdult(true)}>
                                전연령
                            </button>
                            <button
                                value={2}
                                className={(selectedAdult === false) ? "selectComponent selected" : "selectComponent"}
                                onClick={() => setSelectedAdult(false)}>
                                성인
                            </button>
                        </div>
                    </div>

                    <div className="selectBox">
                        <div className="selectTitle">
                            AI 작품
                        </div>
                        <div className="selectArea">
                            <button
                                value={1}
                                className={(selectedAI === true) ? "selectComponent selected" : "selectComponent"}
                                onClick={() => setSelectedAI(true)}>
                                예
                            </button>
                            <button
                                value={2}
                                className={(selectedAI === false) ? "selectComponent selected" : "selectComponent"}
                                onClick={() => setSelectedAI(false)}>
                                아니오
                            </button>
                        </div>
                    </div>

                    <div className="selectBox">
                        <div className="selectTitle">
                            공개 범위
                        </div>
                        <div className="selectArea">
                            <button
                                value={1}
                                className={(selectedRange === 1) ? "selectComponent selected" : "selectComponent"}
                                onClick={() => setSelectedRange(1)}>
                                전체 공개
                            </button>
                            <button
                                value={2}
                                className={(selectedRange === 2) ? "selectComponent selected" : "selectComponent"}
                                onClick={() => setSelectedRange(2)}>
                                구독자 전용
                            </button>
                            <button
                                value={2}
                                className={(selectedRange === 3) ? "selectComponent selected" : "selectComponent"}
                                onClick={() => setSelectedRange(3)}>
                                비공개
                            </button>
                        </div>
                    </div>

                    <div className="selectBox">
                        <div className="selectTitle">
                            작품 댓글
                        </div>
                        <div className="selectArea">
                            <button
                                value={1}
                                className={(selectedComment === true) ? "selectComponent selected" : "selectComponent"}
                                onClick={() => setSelectedComment(true)}>
                                예
                            </button>
                            <button
                                value={2}
                                className={(selectedComment === false) ? "selectComponent selected" : "selectComponent"}
                                onClick={() => setSelectedComment(false)}>
                                아니오
                            </button>
                        </div>
                    </div>

                </div>
                {/** 기본 | 디자인샵 | 경매 */}
                <div className="regThrid">
                    <div className="uploadCategoryBtns">
                        <button
                            className={selectedCategory === 1 ? "uploadType selected" : "uploadType"}
                            onClick={() => setSelectedCategory(1)}>
                            <ColorLensIcon />
                            <div className="typeText">기본</div>
                        </button>
                        <button
                            className={selectedCategory === 2 ? "uploadType selected" : "uploadType"}
                            onClick={() => setSelectedCategory(2)}>
                            <ShoppingBagIcon />
                            <div className="typeText">디자인샵</div>
                        </button>
                        <button
                            className={selectedCategory === 3 ? "uploadType selected" : "uploadType"}
                            onClick={() => setSelectedCategory(3)}>
                            <GavelIcon />
                            <div className="typeText">경매</div>
                        </button>
                    </div>
                    <div className="uploadOption">
                        {selectedCategory === 1
                            ? <MainTab />
                            : selectedCategory === 2
                                ? <ShopTab />
                                : selectedCategory === 3
                                    ? <BidTab />
                                    : null}
                    </div>
                </div>
                {/** 경고사항 */}
                <div className="regFourth">
                    <div className="warningBox">
                        <b>아래에 해당하는 작품의 투고를 금지하고 있습니다.투고를 진행하기 전에 확인해 주세요.</b>
                        <ul>
                            <li>타인이 제작한 작품, 시판되고 있는 상품의 이미지, 제3자가 권리를 소유한 이미지, 게임이나 영상 작품의 캡처, 스크린샷 이미지가 포함되는 작품.</li>
                            <li>위와 같은 이미지를 유용하여, 처음부터 모든 것을 본인이 직접 그리지 않은 작품.</li>
                            <li>작품 이외의 피사체를 찍은 사진 이미지.</li>
                        </ul>
                        이용약관에 위반하는 작품의 투고 유저는 투고 작품 공개 정지, 계정 정지의 대상이 됩니다.
                    </div>
                </div>
                {/** 작품 등록 버튼 */}
                <div className="regFifth">
                    <div className="alert">
                        작품 등록 시 귀사의 <a href="http://localhost:3000/" target="_blank">이용 약관</a>에 동의한 것으로 간주합니다.
                        타인의 저작권을 침해하는 행위 시 법적 제재가 가해질 수 있으며, 해당 작품은 삭제될 수 있습니다.
                    </div>
                    <button className="btn">
                        <DriveFolderUploadIcon />
                        작품 등록하기
                    </button>
                </div>
            </div>
        </div>
    );
}

const MainTab: React.FC = () => {
    const [download, setDownload] = useState<boolean>(true);
    const [share, setShare] = useState<boolean>(true);
    const [copyright, setCopyright] = useState<number>(1);

    return (
        <div className="tab">
            <div className="tabDesc">
                다른 사람들이 등록된 작품을 자유롭게 감상하고 반응을 남길 수 있습니다.
            </div>
            <div className="tabBtns">
                <div className="take">
                    <div className="title"><DownloadIcon />다운로드 가능여부</div>
                    <div className="takeBox">
                        <button className={(download === true) ? "btn selected" : "btn"} onClick={() => setDownload(true)}>허용</button>
                        <button className={(download === false) ? "btn selected" : "btn"} onClick={() => setDownload(false)}>거부</button>
                    </div>
                </div>
                <div className="take">
                    <div className="title"><ShareIcon />공유 가능여부</div>
                    <div className="takeBox">
                        <button className={(share === true) ? "btn selected" : "btn"} onClick={() => setShare(true)}>허용</button>
                        <button className={(share === false) ? "btn selected" : "btn"} onClick={() => setShare(false)}>거부</button>
                    </div>
                </div>
                <div className="take">
                    <div className="title"><AttributionIcon />저작권 허용</div>
                    <div className="takeBox">
                        <button className={(copyright === 1) ? "btn selected" : "btn"} onClick={() => setCopyright(1)}>자유롭게 이용 가능</button>
                        <button className={(copyright === 2) ? "btn selected" : "btn"} onClick={() => setCopyright(2)}>상업적 이용 불가</button>
                        <button className={(copyright === 3) ? "btn selected" : "btn"} onClick={() => setCopyright(3)}>개인 소장만 가능</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ShopTab: React.FC = () => {
    const [selectedBtn, setSelectedBtn] = useState<number>(1);

    return (
        <div className="tab">
            <div className="tabDesc">
                작품을 원하는 가격에 판매합니다. 구매자는 해당 작품에 대해 소유권을 가지게 됩니다.
            </div>
            <div className="tabBtns">
                <div className="line">
                    <div className="title">비용</div>
                    <input type="text" className="lineInput" placeholder="10,000" />원
                </div>
                <div className="line">
                    <div className="title">등록 기간</div>
                    <input type="text" className="lineInput" placeholder="3" />일
                </div>
                <div className="take">
                    <div className="title">구매자 수령 방식</div>
                    <div className="takeBox">
                        <button className={(selectedBtn === 1) ? "btn selected" : "btn"} onClick={() => setSelectedBtn(1)}>다운로드</button>
                        <button className={(selectedBtn === 2) ? "btn selected" : "btn"} onClick={() => setSelectedBtn(2)}>택배</button>
                        <button className={(selectedBtn === 3) ? "btn selected" : "btn"} onClick={() => setSelectedBtn(3)}>직접 수령</button>
                        <button className={(selectedBtn === 4) ? "btn selected" : "btn"} onClick={() => setSelectedBtn(4)}>기타</button>
                        {selectedBtn === 4 && (
                            <div className="etcBox">
                                <input type="text" className="lineInput" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const BidTab: React.FC = () => {
    const [selectedBtn, setSelectedBtn] = useState<number>(1);

    return (
        <div className="tab">
            <div className="tabDesc">
                작품을 경매에 등록합니다. 입찰 시간이 종료되면 최고 입찰자에게 작품의 소유권이 주어집니다.
            </div>
            <div className="tabBtns">
                <div className="line">
                    <div className="title">시작가</div>
                    <input type="text" className="lineInput" placeholder="10,000" />원
                </div>
                <div className="line">
                    <div className="title">즉시 구매가</div>
                    <input type="text" className="lineInput" placeholder="50,000" />원
                </div>
                <div className="line">
                    <div className="title">등록 기간</div>
                    <input type="text" className="lineInput" placeholder="3" />일
                </div>
                <div className="take">
                    <div className="title">구매자 수령 방식</div>
                    <div className="takeBox">
                        <button className={(selectedBtn === 1) ? "btn selected" : "btn"} onClick={() => setSelectedBtn(1)}>다운로드</button>
                        <button className={(selectedBtn === 2) ? "btn selected" : "btn"} onClick={() => setSelectedBtn(2)}>택배</button>
                        <button className={(selectedBtn === 3) ? "btn selected" : "btn"} onClick={() => setSelectedBtn(3)}>직접 수령</button>
                        <button className={(selectedBtn === 4) ? "btn selected" : "btn"} onClick={() => setSelectedBtn(4)}>기타</button>
                        {selectedBtn === 4 && (
                            <div className="etcBox">
                                <input type="text" className="lineInput" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtworkRegist;