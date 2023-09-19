import React, { useState, useRef, useEffect } from 'react';
import TopMessage from './TopMessage';
import { gsap } from 'gsap';

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

interface ImgCardProps {
    imgLength: number,
    clickedButton: string | null,
    imgShow: boolean,
    setImgShow: React.Dispatch<React.SetStateAction<boolean>>,
    imgIndex: number,
    setImgIndex: React.Dispatch<React.SetStateAction<number>>,
    imgSubIndex: number,
    setImgSubIndex: React.Dispatch<React.SetStateAction<number>>,
    imgUrl: string | string[],
    isArray: boolean,
    arrLen: number
}

const ImgCard: React.FC<ImgCardProps> = ({
    imgLength, clickedButton, imgShow, setImgShow,
    imgIndex, setImgIndex, imgSubIndex, setImgSubIndex,
    imgUrl, isArray, arrLen
}) => {
    // 이미지 출력 함수
    const [startPos, setStartPos] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [deltaX, setDeltaX] = useState<number>(0);
    const [imgShowDelay, setImgShowDelay] = useState<boolean>(false);

    const imgRef = useRef<HTMLImageElement | null>(null);

    // 드래그 시 사이드 바 등장
    const [sidebarDisplay, setSidebarDisplay] = useState<string>('');

    // 다음 이미지 로딩 딜레이함수 동작
    useEffect(() => {
        if (imgShow) {
            const timeout = setTimeout(() => {
                setImgShowDelay(imgShow);
            }, 150);
            return () => clearTimeout(timeout);
        }
        else {
            const timeout = setTimeout(() => {
                setImgShowDelay(imgShow);
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [imgShow]);

    // 이미지를 가운데로 이동시키는 함수
    const moveToMid = () => {
        gsap.to(imgRef.current, {
            x: 0,
            y: 0,
            duration: 0.15,
            scale: 1,
            transform: 'rotate(0deg)',
            ease: 'power2.inOut',
        });
    }

    // 클릭 해제 시 중앙으로 복귀하는 애니메이션 동작
    useEffect(() => {
        if (!isDragging) {
            const controlWidth = (window.innerWidth) / 8;
            if (deltaX < -controlWidth) { // 왼쪽으로 스와이프 되었을 때
                moveToLeft();
            }
            else if (deltaX > controlWidth) {// 오른쪽으로 스와이프 되었을 때
                moveToRight();
            }
            else { // 스와이프 행동이 취소됨
                setDeltaX(0);
                moveToMid();
            }
        }
    }, [isDragging]);


    // 이미지 액션
    // 다음 이미지로
    const moveToLeft = () => {
        // 마지막 페이지 판별
        if (imgIndex >= imgLength - 1) {
            if (isArray && imgSubIndex >= arrLen - 1) {
                moveToMid();
                setSidebarDisplay('none');
                showAlermMessage("마지막 페이지입니다");
                return;
            }
        }
        // 배열 이미지인 경우
        if (isArray) {
            if (imgSubIndex >= arrLen - 1) {
                setImgIndex(imgIndex + 1);
                setImgSubIndex(0);
            } else {
                setImgSubIndex(imgSubIndex + 1);
            }
        } else {    // 단일 이미지인 경우
            setImgIndex(imgIndex + 1);
        }

        // 애니메이션 동작
        setImgShow(false);
        setDeltaX(0);
        gsap.to(imgRef.current, {
            x: -window.innerWidth,
            duration: 0.3,
            scale: 0.8,
            ease: 'power2.inOut',
        });
    };

    useEffect(() => { setImgSubIndex(0) }, [imgIndex]);
    // 이전 이미지로
    const moveToRight = () => {
        // 처음 페이지 판별
        if (imgIndex - 1 < 0) {
            moveToMid();
            setSidebarDisplay('none');
            showAlermMessage("처음 페이지입니다");
            return;
        }

        // 배열 이미지를 보는 상태라면
        if (imgSubIndex > 0) {
            setImgSubIndex(imgSubIndex - 1);
        } else {    // 아니라면
            setImgIndex(imgIndex - 1);
        }

        setImgShow(false);
        setDeltaX(0);
        gsap.to(imgRef.current, {
            x: window.innerWidth,
            duration: 0.3,
            scale: 0.8,
            //transform: 'rotate(30deg)',
            ease: 'power2.inOut',
        });
    };

    // 묶음 스킵
    const imgArrSkip = () => {
        // 이미 마지막 이미지인 경우
        if (imgIndex >= imgLength - 1) {
            // 배열의 마지막 이미지로 이동
            if (imgSubIndex >= arrLen - 1) {
                moveToMid();
                setSidebarDisplay('none');
                showAlermMessage("마지막 페이지입니다");
            } else {
                setImgSubIndex(arrLen - 1);
                setImgShow(false);
                setDeltaX(0);
                gsap.to(imgRef.current, {
                    x: -window.innerWidth,
                    duration: 0.3,
                    scale: 0.8,
                    ease: 'power2.inOut',
                });
            }
        } else { // 아니라면 다음 이미지로 이동
            setImgIndex(imgIndex + 1);
            setImgShow(false);
            setDeltaX(0);
            gsap.to(imgRef.current, {
                x: -window.innerWidth,
                duration: 0.3,
                scale: 0.8,
                ease: 'power2.inOut',
            });
        }
    };

    // 마우스 클릭 또는 터치 시작 시
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        // Use type assertion to access touches if it's a TouchEvent
        const clientX = (e as React.TouchEvent<HTMLDivElement>).touches
            ? (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX
            : (e as React.MouseEvent<HTMLDivElement>).clientX;

        setStartPos(clientX);
        setIsDragging(true);
    };

    // 마우스 클릭 또는 터치 종료 시
    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // 마우스 이동 또는 터치 이동 시
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;

        // Use type assertion to access clientX and clientY based on the event type
        const clientX = (e as React.TouchEvent<HTMLDivElement>).touches
            ? (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX
            : (e as React.MouseEvent<HTMLDivElement>).clientX;


        const newX = clientX;

        setDeltaX(newX - startPos);

        gsap.set(imgRef.current, {
            x: deltaX,
            //transform: `rotate(${deltaX / 52}deg)`,
        });
    };

    // 사이드 바 출력에 대한 함수
    useEffect(() => {
        const controlWidth = (window.innerWidth) / 8;
        if (deltaX < -controlWidth) {
            setSidebarDisplay('right');
        } else if (deltaX > controlWidth) {
            setSidebarDisplay('left');
        } else {
            setSidebarDisplay('none');
        }
    }, [deltaX]);

    // 마우스가 모달 창을 벗어나면 드래그 상태를 해제합니다.
    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
        }
    };

    // 마우스 이벤트와 터치 이벤트를 모두 처리할 수 있도록 이벤트 핸들러를 등록
    const eventHandlers = {
        onMouseDown: handleTouchStart,
        onMouseUp: handleTouchEnd,
        onMouseMove: handleTouchMove,
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
        onTouchMove: handleTouchMove,
        onMouseLeave: handleMouseLeave,
        onTouchLeave: handleMouseLeave,
    };

    // 상단 메세지 부분
    const [topDisplay, setTopDisplay] = useState<boolean>(false);
    const [alermMessage, setAlermMessage] = useState<string>("출력할 메세지");

    const showAlermMessage = (mes: string) => {
        setAlermMessage(mes);
        setTopDisplay(true);
    };

    // 키보드 입력 - 키보드 연속 입력으로 인해 오류 발생. 수정 필요
    useEffect(() => {
        if (clickedButton === 'a') {
            moveToRight();
        } else if (clickedButton === 'd') {
            if (imgIndex >= imgLength - 1) {
                if (!isArray) return;
                else {
                    if(imgSubIndex>=arrLen-2){
                        showAlermMessage("마지막 페이지입니다");
                    } else {
                        moveToLeft();
                    }
                };
            } else {
                if(isArray) {
                    setImgSubIndex(imgSubIndex + 1);
                } else {
                    moveToLeft();
                }
            }
        }
    }, [clickedButton]);

    /* 메인 리턴 ********************************************** */
    return (
        <>
            {/** 상단 메세지 */}
            <TopMessage
                message={alermMessage}
                topDisplay={topDisplay}
                setTopDisplay={setTopDisplay}
            />

            {(imgShow || imgShowDelay) && (
                <>
                    <ImgSkipBtn
                        isBtnShow={isArray && (imgShow && imgShowDelay)}
                        imgArrSkip={imgArrSkip}
                    />

                    <img
                        ref={imgRef}
                        src={Array.isArray(imgUrl) ? imgUrl[0] : imgUrl}
                        alt=""
                        className={(imgShow && imgShowDelay) ? 'imgDisplay' : 'imgDisplay before'}
                        style={{
                            cursor: isDragging ? 'grabbing' : 'grab',
                        }}
                        draggable="false"
                        {...eventHandlers}
                    />
                    <SideInfo sideDisplay={sidebarDisplay} />
                </>
            )}

        </>
    );
};


/** 드래그 시 나오는 사이드바 ******************************************/
interface SideInfoProps {
    sideDisplay: string;
}

const SideInfo: React.FC<SideInfoProps> = ({ sideDisplay }) => {
    const [isLeft, setIsLeft] = useState<boolean>(false);
    const [isRight, setIsRight] = useState<boolean>(false);

    useEffect(() => {
        if (sideDisplay === 'left') {
            if (!isLeft) setIsLeft(true);
            if (isRight) setIsRight(false);
        } else if (sideDisplay === 'right') {
            if (!isRight) setIsRight(true);
            if (isLeft) setIsLeft(false);
        } else {
            if (isLeft) setIsLeft(false);
            if (isRight) setIsRight(false);
        }
    }, [sideDisplay])

    return (
        <>
            <div className={isLeft ? "SideInfo left" : "SideInfo left before"}>
                <KeyboardDoubleArrowLeftIcon sx={{ fontSize: '24px' }} />
                이전으로
            </div>
            <div className={isRight ? "SideInfo right" : "SideInfo right before"}>
                <KeyboardDoubleArrowRightIcon sx={{ fontSize: '24px' }} />
                다음으로
            </div>
        </>
    );
}

/** 이미지 스킵 버튼 **************************************************/
interface ImgSkipBtnProps {
    isBtnShow: boolean,
    imgArrSkip: Function,
}

const ImgSkipBtn: React.FC<ImgSkipBtnProps> = ({
    isBtnShow, imgArrSkip
}) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        imgArrSkip();
    };

    return (
        <button className={isBtnShow ? "imgSkip" : "imgSkip hidden"} onClick={handleClick}>
            이미지 묶음 스킵
            <KeyboardDoubleArrowRightIcon />
        </button>
    );
}

export default ImgCard;