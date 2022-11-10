import api from '../api/api-service';
import { useEffect, useState } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
       const fetchImages = () => {
    setIsLoading(true);
    try {
      api.fetchImages(searchQuery, page).then(responce => {
        const resp = responce.hits.map(({ largeImageURL, tags, webformatURL, id }) => {
          return { largeImageURL, tags, webformatURL, id };
        });

        setImages(prevImages => [...prevImages, ...resp]);
        if (resp.length === 0) {
          return setError(`No results ${searchQuery}`);
        }
      });
    }
    catch (err) {
      setError(`Error: ${err}`);
    
    } finally { setIsLoading(false) };
  };

    fetchImages();
  }, [searchQuery, page]);
  
    const handleSubmit = searchQuery => {
      setSearchQuery(searchQuery);
      setPage(1);
      setImages([])
      setError(null)
    
    };

    const handleLMore = () => {
      setIsLoading(true);
      setPage(prevPage => prevPage + 1);
    };


    const toggleModal = largeImage => {
      setSelectedImage(largeImage);
      setModal(!showModal);

    };

    return (
      <main className="App">
        <Searchbar onSubmit={handleSubmit} />
        {error && <p>{error}</p>}
        <ImageGallery images={images} toggleModal={toggleModal} />
        {images.length >= 12 && (
          <Button onLoadMore={handleLMore} text={isLoading ? 'Loading :|' : 'Load More'} />
        )}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={selectedImage} alt="#" />
          </Modal>
        )}
        {isLoading && <Loader />}
      </main>
    );
  }
 
