import React, { useState } from 'react';
//import { db } from '../Firebase/firebaseConfig';
//import { collection, query, where, getDocs } from 'firebase/firestore';
import Modal from './Modal';

function FilterModal(props) {
    const [modalOn, setModalOn] = useState(false);

    return (
        <div className='Main'>
            <button Onclick={()=>setModalOn(!modalOn)}>Modal</button>
            {modalOn&&(
                <Modal closeModal={()=>setModalOn(!modalOn)}>
                    filter form
                </Modal>
            )}
        </div>
    );
}

export default FilterModal;