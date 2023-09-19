import React, { useState, useEffect } from 'react';
import InfoIcon from '@mui/icons-material/Info';

interface TopMessageProps {
    message: string,
    topDisplay: boolean,
    setTopDisplay: React.Dispatch<React.SetStateAction<boolean>>,
}

const TopMessage: React.FC<TopMessageProps> = ({
    message, topDisplay, setTopDisplay
}) => {
    const [mesTime, setMesTime] = useState<number>(0);

    useEffect(() => {
        if (topDisplay) {
            setMesTime(2);
            setTopDisplay(false);
        }
    }, [topDisplay]);

    useEffect(() => {
        // 1초마다 count를 1씩 감소시킵니다.
        const messShowInt = setInterval(() => {
            if (mesTime > 0) {
                setMesTime(mesTime - 1);
            }
        }, 1000);

        // 컴포넌트가 언마운트되면 interval을 정리합니다.
        return () => clearInterval(messShowInt);
    }, [mesTime]);

    return (
        <div className={(mesTime > 0) ? "TopMessage" : "TopMessage hidden"}>
            <InfoIcon sx={{color:'#B25FF3'}}/>
            {message}
        </div>
    );
};

export default TopMessage;