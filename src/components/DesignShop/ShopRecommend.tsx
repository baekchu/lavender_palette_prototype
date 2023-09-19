import React, { useState } from "react";
import "./ShopRecommend.css";

interface TableItemProps {
    data: { imageUrl: string; title: string; description: string };
}

const TableItem: React.FC<TableItemProps> = ({ data }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`RecItem ${isHovered ? "hovered" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img className="ItemImg" src={data.imageUrl} alt='' />
            <div className="Title">
                {data.title}
                <span className="Artist">아티스트 이름</span>
            </div>
            <div className="Description">{data.description}</div>
        </div>
    );
};

const ShopRecommend: React.FC<{ data: { imageUrl: string; title:string; description: string }[] }> = ({ data }) => {
    return (
        <div className="RecBox">
            {data.map((item, index) => (
                <TableItem key={index} data={item} />
            ))}
        </div>
    );
};

export default ShopRecommend;
