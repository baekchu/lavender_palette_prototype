import React from 'react';

// 메시지 출력 관리 모듈
const ShowMessages = ({ sender, combinedMessages }) => {
    const renderMessages = () => {
        return (
            <ul>
                {combinedMessages.map((message, index) => {
                    const isSentMessage = message.isSend;

                    return (
                        <li
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: isSentMessage ? 'flex-end' : 'flex-start',
                                flexDirection: 'column',
                                alignItems: isSentMessage ? 'flex-end' : 'flex-start',
                                margin: '8px 0',
                            }}
                        >
                            <span
                                style={{
                                    backgroundColor: isSentMessage ? '#e8f5e9' : '#e0f7fa',
                                    padding: '8px',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                }}
                            >
                                {message.context}
                            </span>
                            <span
                                style={{
                                    fontSize: '10px',
                                    marginTop: '4px',
                                    alignSelf: isSentMessage ? 'flex-end' : 'flex-start',
                                }}
                            >
                                {message.sendTime.toDate().toLocaleString()}
                            </span>
                        </li>
                    );
                })}
            </ul>
        );
    };

    return <div>{renderMessages()}</div>;
};

export default ShowMessages;