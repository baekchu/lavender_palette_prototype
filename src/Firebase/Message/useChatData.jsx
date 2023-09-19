import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import firestore functions
import { db } from '../firebaseConfig'; // Import the firebaseConfig object that provides access to Firebase Firestore

const fetchMessages = async (userEmail) => {
    try {
        const ref = collection(db, "Messages");
        const q = query(ref, where("__name__", "==", userEmail));
        const querySnapshot = await getDocs(q);
        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
            fetchedMessages.push({ data: doc.data() });
        });
        return fetchedMessages;
    } catch (error) {
        // 오류가 발생하면 빈 배열 반환
        console.error("Error fetching data:", error);
        return [];
    }
};

// Custom hook to fetch chat room data
export const useFetchRoom = (user) => {
    const [arrayNames, setArrayNames] = useState([]);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const recievedMessages = await fetchMessages(user?.email);
                const unsortedNames = Object.keys(recievedMessages[0].data);
                const sortedNames = unsortedNames.sort((a, b) => a.localeCompare(b)); // Sort alphabetically
                setArrayNames(sortedNames);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setArrayNames([]);
            }
        };

        fetchRoom();

    }, [user?.email]);

    return arrayNames;
};

// Custom hook to fetch chat data
export const useFetchData = (user, sender) => {
    const [messages, setMessages] = useState([]);
    const [sendedMessages, setSendedMessages] = useState([]);
    const RENEWALTIME = 500; // 갱신 시간

    useEffect(() => {
        const fetchData = async () => {
            try {
                const receivedMessages = await fetchMessages(user.email);
                setMessages(receivedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setMessages([]);
            }
        };

        const sendedData = async () => {
            try {
                if (sender) {  
                    const tempMessages = await fetchMessages(sender);
                    let isExist = false;
                    for (let i = 0; i < tempMessages.length; i++) {
                        const messageData = tempMessages[i].data;
                        if (messageData[user.email]) {
                            setSendedMessages(messageData[user.email]);
                            isExist = true;
                            break;
                        }
                    }
                    if (!isExist) setSendedMessages([]);
                } else {
                    // If no sender, set sendedMessages to an empty array
                    setSendedMessages([]);
                }
            } catch (error) {
                console.error("Error fetching sended data:", error);
                setSendedMessages([]);
            }
        };

        fetchData();
        const interval = setInterval(() => {
            fetchData();
            if (sender) {
                sendedData();
            }
        }, RENEWALTIME); // 주기

        return () => {
            clearInterval(interval);
        };
    }, [user?.email, sender]);

    return { messages, sendedMessages };
};

// Custom hook to get combined messages
export const useCombinedMessages = (messages, sendedMessages, selectedSender) => {
    return messages.reduce((combinedMessages, message) => {
        if (message.data[selectedSender]) {
            return [
                ...combinedMessages,
                ...message.data[selectedSender].map((message) => ({ ...message, isSend: false })),
                ...sendedMessages.map((message) => ({ ...message, isSend: true })),
            ].sort((a, b) => a.sendTime.toDate() - b.sendTime.toDate());
        }
        return combinedMessages;
    }, []);
};
