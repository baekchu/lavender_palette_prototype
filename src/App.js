import React, { useState } from 'react';
import Login from './Firebase/Login/LoginMain';

import Request from 'components/Request/ReqMain';
import Shop from './components/DesignShop/ShopMain';
import ShopRegist from 'components/ArtworkRegist/ArtworkRegist.tsx'; // <ShopRegist registType={3}/>
import Interest from './components/Interest/InterestMain.tsx';
import UserPage from 'components/UserPage/UserPageMain.tsx';
import Research from 'components/Research/ResearchMain.tsx';

import ChatModal from './components/ChatModal/Chat.tsx';   // 채팅 모달 메인 파일
import NoticeModal from './components/NoticeModal/NoticeModal.tsx';
import ArtworkRegist from './components/ArtworkRegist/ArtworkRegist';

function App() {
  return(
    <>
      <Research />
    </>
  );
}

export default App;

/**

///   로그인 기능 관련
  const [user, setUser] = useState({
    email:'hana@gmail.com',
  }); // user 상태를 관리

 
  const handleSignIn = (user) => { setUser(user); };  // 로그인
  const handleSignOut = () => { setUser(null); };     // 로그아웃

  ///   메시지 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {setIsModalOpen(!isModalOpen)};
  const handleCloseModal = () => {setIsModalOpen(false)};

  return (
    <>
      
      <MessageTest user={user} />

      <button onClick={handleOpenModal}>Open Modal</button>
      <MessageModal isOpen={isModalOpen} onClose={handleCloseModal}/>
    </>
  );

 */