import React, { useState } from 'react';
import { ReactComponent as FolderOpenIcon } from '../../media/FolderOpenIcon.svg';
import { ReactComponent as FolderCloseIcon } from '../../media/FolderCloseIcon.svg';

interface InterestContentProps {
    isFolderOpen: boolean,
    folderName: string,
}

const InterestFolder: React.FC<InterestContentProps> = ({ isFolderOpen, folderName }) => {
    return (
        <div className="folder">
            <div className="folderIcon">
                {isFolderOpen ?
                    (<FolderOpenIcon className="icon" />) :
                    (<FolderCloseIcon className="icon close" />)}
            </div>
            <div className="folderName">
                {folderName}
            </div>
        </div>
    );
}

export default InterestFolder;