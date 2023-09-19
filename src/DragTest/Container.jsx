import update from 'immutability-helper'
import React, { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { Card } from './Card'
import { ItemTypes } from './ItemTypes'

const style = {
    width: '100%',
    border: '1px solid black',
    padding: '2px',
    height: 600,
    display: 'flex',
    gap: '1rem',

}

const urlList = [
    'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSXs1QxM9Dh8HQ4jqzmniWXCZBxUu5pgY0y61By5dEBvo_6LTEtJ27fb6I0iLC1GgLt',
    'https://images.pexels.com/photos/408884/pexels-photo-408884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.freeimages.com/images/large-previews/0ef/purple-flower-1401423.jpg',
    'https://cdn.crowdpic.net/detail-thumb/thumb_d_3B759FD967B045F8E3103E900118DDD1.jpg',
    'https://img.hankyung.com/photo/202206/AA.30320569.1.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxv0CcQ3uCwQbzMSdvARX-k5MERz--VnOIHg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk-p7lRtk2gwO0kBy9y9mdRiLobImJHPk-Bxyo7X6ujYrW63SoyBW3DDpDI2vsM4Hc1uw&usqp=CAU',
    'https://images.unsplash.com/photo-1669690393772-f4c094c6853b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8&w=1000&q=80',
];

const ITEMS = [
    {
        id: 1,
        urls: urlList
    },
    {
        id: 2,
        urls: ['https://images.pexels.com/photos/408884/pexels-photo-408884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    },
    {
        id: 3,
        urls: ['https://images.freeimages.com/images/large-previews/0ef/purple-flower-1401423.jpg'],
    },
    {
        id: 4,
        urls: ['https://cdn.crowdpic.net/detail-thumb/thumb_d_3B759FD967B045F8E3103E900118DDD1.jpg'],
    },
]


export const Container = memo(function Container() {
    const [cards, setCards] = useState(ITEMS);

    const AddTemplate = () => {
        const newId = Math.max(...cards.map((item) => item.id)) + 1; // 기존 id 중 최대값보다 1 큰 새로운 id 생성
        const newTemplate = {
            id: newId,
            text: `New Item ${newId}`, // 새로운 텍스트를 원하는 형식으로 지정
        };
        setCards((prevCards) => [...prevCards, newTemplate]); // 새로운 아이템 추가
    }

    const findCard = useCallback(
        (id) => {
            const card = cards.filter((c) => `${c.id}` === id)[0];
            return {
                card,
                index: cards.indexOf(card),
            };
        },
        [cards],
    );

    const moveCard = useCallback(
        (id, atIndex) => {
            const { card, index } = findCard(id);
            setCards(
                update(cards, {
                    $splice: [
                        [index, 1],
                        [atIndex, 0, card],
                    ],
                }),
            );
        },
        [findCard, cards, setCards],
    );

    const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

    return (
        <>
        <button onClick={AddTemplate}>탬플릿 추가</button>
            <div ref={drop} style={style}>
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        id={`${card.id}`}
                        text={card.text}
                        urls={card.urls}
                        moveCard={moveCard}
                        findCard={findCard}
                        style={{ display: 'inline-block' }}
                        // Card 컴포넌트를 가로로 정렬
                    />
                ))}
            </div>
        </>
    );
});