import { memo, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const style = {
    width: '100%',
    height: '100%',
    border: '1px solid gray',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    overflowX: 'auto',
}

const handleStyle = {
    position: 'relative', // 상단에 고정
    top: 0, // 상단 위치
    zIndex: 1, // 다른 컨텐츠보다 위에 배치
    width: '99%',
    height: '27px',
    color: 'white',
    border: '1px solid black',
    backgroundColor: 'purple',
    cursor: 'move',
};

export const Card = memo(function Card({ id, urls, moveCard, findCard }) {
    const originalIndex = findCard(id).index
    const [deletedCardIds, setDeletedCardIds] = useState([]); // 추가: 삭제된 카드의 id를 저장하는 배열

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.CARD,           // 드래그 항목 유형 지정
            item: { id, originalIndex },    // 드래그 항목 정보 제공
            collect: (monitor) => ({
                // 현재 항목이 드래그 중인지 확인
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                const { id: droppedId, originalIndex } = item;
                const didDrop = monitor.didDrop();
                if (!didDrop) { // 드롭 x 시 원래 위치로 이동
                    moveCard(droppedId, originalIndex);
                }
            },
        }),
        [id, originalIndex, moveCard],
        // 의존성 배열로 컴포넌트의 props 또는 state 변경 시 항목 새로 생성
    )

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            hover({ id: draggedId }) {
                if (draggedId !== id) {
                    const { index: overIndex } = findCard(id);
                    moveCard(draggedId, overIndex);
                }
            },
        }),
        [findCard, moveCard],
    )

    const handleCardDelete = () => {
        setDeletedCardIds((prevIds) => [...prevIds, id]); // 삭제된 카드의 id를 추가
    };
    if (deletedCardIds.includes(id)) {
        return null;
    };

    // 필터 버튼을 통해 이미지의 링크를 불러옴
    const getUrlsByFilter = () => {
        console.log(id);
    };

    const opacity = isDragging ? 0.4 : 1;

    const images = urls
        ? urls.map((url) => <img key={url} style={{ width: '98%' }} src={url} alt='Img' />)
        : [];

    return (
        <>
            <div ref={drag} style={{ ...style, opacity }}>
                <div ref={(node) => drag(drop(node))} style={{ ...handleStyle, opacity }}>
                    {id}
                    <button >
                        <FilterAltIcon onClick={getUrlsByFilter} fontSize='5px' style={{ margin: '-3px' }} />
                    </button>
                    <button onClick={(handleCardDelete)}>x</button>
                </div>
                {images}
            </div>
        </>
    )
})
