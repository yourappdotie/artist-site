import React, { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useWindowDimensions, Suggestion } from "./components/Containers.jsx";
import ArtistMenu from './components/artistTheme/ArtistMenu.jsx';
import ArtistSelectedImage from './components/artistTheme/ArtistSelectedImage.jsx';
import ArtistGallery from './components/artistTheme/ArtistGallery.jsx';

const image1 = '/assets/images/artist/birmingham-museums-trust-HslbEeUauYA-unsplash-1920x1392.jpg';
const image2 = '/assets/images/artist/europeana-VsnDYMWollM-unsplash-1920x2857.jpg';
const image3 = '/assets/images/artist/vitaly-mazur-2FoOJYuWIEk-unsplash-1920x2560.jpg';
const image4 = '/assets/images/artist/mayur-deshpande-zZPeoLxLRyM-unsplash-1920x1440.jpg';
const image5 = '/assets/images/artist/steve-johnson-e5LdlAMpkEw-unsplash-1920x2432.jpg';
const smallImage1 = '/assets/images/artist/birmingham-museums-trust-HslbEeUauYA-unsplash-640x464.jpg';
const smallImage2 = '/assets/images/artist/europeana-VsnDYMWollM-unsplash-640x952.jpg';
const smallImage3 = '/assets/images/artist/vitaly-mazur-2FoOJYuWIEk-unsplash-640x853.jpg';
const smallImage4 = '/assets/images/artist/mayur-deshpande-zZPeoLxLRyM-unsplash-640x480.jpg';
const smallImage5 = '/assets/images/artist/steve-johnson-e5LdlAMpkEw-unsplash-640x811.jpg';

const Spinner = () => {
  return (
    <div style={{
      position: 'fixed',
      top: useWindowDimensions().height / 2,
      left: useWindowDimensions().width / 2,
      transform: 'translateX(-50%) translateY(-50%)',

    }} >
      <svg width="57" height="57" viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg" stroke="#000">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle cx="5" cy="50" r="5">
              <animate attributeName="cy"
                begin="0s" dur="2.2s"
                values="50;5;50;50"
                calcMode="linear"
                repeatCount="indefinite" />
              <animate attributeName="cx"
                begin="0s" dur="2.2s"
                values="5;27;49;5"
                calcMode="linear"
                repeatCount="indefinite" />
            </circle>
            <circle cx="27" cy="5" r="5">
              <animate attributeName="cy"
                begin="0s" dur="2.2s"
                from="5" to="5"
                values="5;50;50;5"
                calcMode="linear"
                repeatCount="indefinite" />
              <animate attributeName="cx"
                begin="0s" dur="2.2s"
                from="27" to="27"
                values="27;49;5;27"
                calcMode="linear"
                repeatCount="indefinite" />
            </circle>
            <circle cx="49" cy="50" r="5">
              <animate attributeName="cy"
                begin="0s" dur="2.2s"
                values="50;50;5;50"
                calcMode="linear"
                repeatCount="indefinite" />
              <animate attributeName="cx"
                from="49" to="49"
                begin="0s" dur="2.2s"
                values="49;5;27;49"
                calcMode="linear"
                repeatCount="indefinite" />
            </circle>
          </g>
        </g>
      </svg>
    </div>
  );
}

const Heading = (props) => {

  const defaultStyle = {
    transition: `3s ease-out`,
    left: 0,
    opacity: 0,
  }

  const transitionStyles = {
    entering: {
      left: useWindowDimensions().width / 10,
      opacity: 1,
    },
    entered: {
      left: useWindowDimensions().width / 10,
      opacity: 1,
    },
    exiting: {
      left: 0,
      opacity: 0,
    },
    exited: {
      left: 0,
      opacity: 0,
    }
  }

  const height = useWindowDimensions().height;

  return (
    <Transition in={props.isVisible}
      appear={true} timeout={3000}>
      {state => (
        <div style={{
          fontFamily: 'Comforter',
          fontSize: '80px',
          lineHeight: '80px',
          position: 'absolute',
          top: height / 10,
          backgroundColor: "#FFFFFFCC",
          boxShadow: '2px 2px 30px 30px #FFFFFFCC',
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          Artist Theme
          <Subheading />
        </div>
      )}
    </Transition>
  );
}

const Subheading = () => {
  return (
    <div style={{ font: "25px Arial", fontVariant: "small-caps" }}>
      Elegant and Sophisticated
    </div>
  );
}

const ArtistTheme = () => {

  document.body.style.overflow = 'hidden';
  const images = [
    {
      image: image1,
      galleryImage: smallImage1,
      title: 'Birmingham Museums Trust',
      subtitle: '',
    }, {
      image: image2,
      galleryImage: smallImage2,
      title: '',
      subtitle: '',
    }, {
      image: image3,
      galleryImage: smallImage3,
      title: '',
      subtitle: '',
    }, {
      image: image4,
      galleryImage: smallImage4,
      title: '',
      subtitle: '',
    }, {
      image: image5,
      galleryImage: smallImage5,
      title: '',
      subtitle: '',
    },
  ];

  const galleryElement = useRef();

  function imagesLoaded() {
    console.log('galleryElement: ' + galleryElement);
    console.log('galleryElement.current: ' + galleryElement.current);
    // const imgElements = document.getElementById('image-loader').querySelectorAll('img');
    // for (const img of imgElements) {
    //   if (!img.complete) {
    //     return false;
    //   }
    // }
    return true;
  }

  function handleStateChange(imageUrl) {
    console.log("State change recorded for " + imageUrl);
    setLoadingImages(!imagesLoaded());
  }

  function renderImage(imageUrl) {
    return (
      <div>
        <img src={imageUrl} alt=""
          onLoad={handleStateChange(imageUrl)}
          onError={handleStateChange(imageUrl)} />
      </div>
    );
  }
  const [loadingImages, setLoadingImages] = useState(true);

  /* For the purposes of preloading images */
  const ImageLoader = () => {
    return (
      <div
        ref={galleryElement}>
        {images.map(imageUrl => {
          renderImage(imageUrl.image);
          renderImage(imageUrl.galleryImage);
          return (<div key={imageUrl.image}></div>);
        })}
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [headingIsVisible, setHeadingIsVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [selectedImageVisible, setSelectedImageVisible] = useState(false);
  const [suggestionVisible, setSuggestionVisible] = useState(false);
  const [suggestionContent, setSuggestionContent] = useState(null);

  useEffect(() => {
    setHeadingIsVisible(true);
    setMenuVisible(true);
    setSelectedImageVisible(true);
  }, []);

  function galleryActivated() {
    setSelectedImageVisible(false);
    setMenuVisible(false);
    setGalleryVisible(true);
  }

  function handleGalleryItemSelected(image) {
    setSelectedImage(image);
    setGalleryVisible(false);
    setSelectedImageVisible(true);
  }

  function exitGallery() {
    setGalleryVisible(false);
    setMenuVisible(true);
    setSelectedImageVisible(true);
  }

  const BackButton = (innerProps) => {
    return (
      <div
        onClick={() => innerProps.backAction()}
        style={{
          font: "25px Arial",
          fontVariant: "small-caps",
          position: 'absolute',
          bottom: useWindowDimensions().height * .1,
          left: useWindowDimensions().width * .1,
          backgroundColor: "#FFFFFFCC",
          boxShadow: '2px 2px 30px 30px #FFFFFFCC'
        }}>
        &lt; Back
      </div>
    );
  }

  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;

  return (
    <div
      style={{
        overflow: 'hidden',
        backgroundImage: "linear-gradient(to bottom right, #FFFFFF, #AAAAAA)",
        width: screenWidth, height: screenHeight
      }}>
      <ImageLoader />
      {loadingImages
        ? <Spinner />
        : <>
          <ArtistSelectedImage
            visible={selectedImageVisible}
            selectedImage={selectedImage}
            clickable={selectedImageVisible && !menuVisible && !galleryVisible}
            setSuggestionVisible={setSuggestionVisible}
            setSuggestionContent={setSuggestionContent} />
          <ArtistGallery
            handleGalleryItemSelected={handleGalleryItemSelected}
            backAction={exitGallery}
            visible={galleryVisible}
            images={images}
            backButton={<BackButton backAction={exitGallery} />} />
          <Heading isVisible={headingIsVisible} />
          <ArtistMenu
            visible={menuVisible}
            galleryActivated={galleryActivated}
            setSuggestionContent={setSuggestionContent}
            setSuggestionVisible={setSuggestionVisible} />
          {
            selectedImageVisible && !menuVisible ?
              <BackButton backAction={galleryActivated} />
              : null
          }
          {/* Suggestion has to be last to go in front of everything */}
          {suggestionVisible ?
            <Suggestion setIsVisible={setSuggestionVisible}>
              {suggestionContent}
            </Suggestion>
            : null
          }
        </>}
    </div>
  );
}

export default ArtistTheme;
