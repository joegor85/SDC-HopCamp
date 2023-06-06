import React, { useState, useEffect } from 'react';
import './Photo_gallery.css';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function PhotoGallery() {
 const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [photoGallery, setPhotoGallery] = useState([]);
  console.log(photoGallery)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/photogallery/");
        // const response = await fetch("http://159.223.122.220:5001/api/photogallery/");
        if (response.ok) {
          const data = await response.json();
          setPhotoGallery(data);
          console.log(data)
        } else {
          throw new Error('Request Failed');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPhotos();
  }, []);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPhoto('');
  };



  return (
    <div className="galley-root-container">
      {photoGallery.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="d-flex" style={{maxHeight:'400px', gap:'5px'}}>
              <div overflow="hidden">
                <div className="photo-gallery-left">
                    <button className="photo-gallery-button" onClick={() => openModal(photoGallery[0])}  style={{height:'100%'}}>
                      <img
                        alt=""
                        src={photoGallery[0].url} 
                        decoding="async"
                        data-nimg="fill"
                        className="photo-gallery-img"
                      />
                    </button>
                </div>
              </div>
           

              <div className="photo-gallery-square">           
                    <div className="photo-gallery-item">
                      <button className="photo-gallery-button" onClick={() => openModal(photoGallery[2])} style={{height:'100%'}}>
                        <img
                          alt=""
                          sizes="45vw"
                          src={photoGallery[1].url} 
                          decoding="async"
                          data-nimg="fill"
                          className="photo-gallery-img"
                        />
                      </button>
                    </div>
                    <div className="photo-gallery-item" style={{ display: 'flex', justifyContent: 'left' }}>
                      <button className="photo-gallery-button" onClick={() => openModal(photoGallery[4])} style={{height:'100%'}}> 
                        <img
                          alt=""
                          sizes="45vw"
                          src={photoGallery[2].url} 
                          decoding="async"
                          data-nimg="fill"
                          className="photo-gallery-img"
                          style={{borderRadius:"0px 10px 0px 0px"}}
                        />
                      </button>
                    </div>
                
                
                    <div className="photo-gallery-item" style={{ display: 'flex', justifyContent: 'left'}}>
                      <button className="photo-gallery-button" onClick={() => openModal(photoGallery[6])} style={{height:'100%'}}>
                        <img
                          alt=""
                          sizes="45vw"
                          src={photoGallery[3].url} 
                          decoding="async"
                          data-nimg="fill"
                          className="photo-gallery-img"
                        />
                      </button>
                    </div>
                    <div className="photo-gallery-item" style={{ display: 'flex', justifyContent: 'left' } }>
                      <button className="photo-gallery-button" onClick={() => openModal(photoGallery[8]) } style={{height:'100%'}}>
                        <img
                          alt=""
                          sizes="45vw"
                          src={photoGallery[4].url} 
                          decoding="async"
                          data-nimg="fill"
                          className="photo-gallery-img"
                          style={{borderRadius:"0px 0px 10px 0px"}}
                        />
                      </button>
                      <button className="morePhotos" onClick={() => openModal(photoGallery)}>View 10 Photos</button>
                    </div>
                
              </div>
            
          </div>

          {/*modal*/}
          <Modal show={showModal} onHide={closeModal} className="modal-fullscreen" style={{zIndex:1050}}>
            <Modal.Body className="modal-body-photo-gallery p-0" style={{zIndex:1050}} >
              <div className="photo-gallery-grid">
                {photoGallery.map((photoGallery, index) => (
                  <img
                    key={index}
                    src={photoGallery.url}
                    alt=""
                    size="100vw"
                    className="modal-photo"
                  />
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}

export default PhotoGallery;