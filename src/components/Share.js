import React from 'react';
import { ShareSocial } from 'react-share-social';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'absolute',
    border: 'none',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '10px',
    outline: 'none',
    padding: '20px',
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
    width: '400px',
  },
};
const style = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};
const baseUrl = 'http://localhost:3000';
const Share = function ({ url, modalIsOpen, setModalIsOpen }) {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ShareSocial
          style={style}
          url={`${baseUrl}/${url}`}
          socialTypes={['facebook', 'twitter', 'reddit', 'linkedin']}
        />
      </Modal>
    </div>
  );
};

export default Share;
