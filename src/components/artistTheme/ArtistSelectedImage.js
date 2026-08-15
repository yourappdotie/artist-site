import { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useWindowDimensions } from "../Containers";
import { getDisplayDimensions } from './ArtistGalleryItem';

const ArtistSelectedImage = (props) => {

  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const cacheImage = async (src) => {
    const p = await new Promise(function (resolve, reject) {
      const img = new Image();
      img.src = src;
      img.onload = resolve();
      img.onerror = reject();
    });
    await p;
    setImageIsLoaded(true);
  }

  useEffect(() => {
    if (props.visible) {
      cacheImage(props.selectedImage.image);
    } else {
      setImageIsLoaded(false);
    }
  }, [props.visible, props.selectedImage.image]);

  const [imageDisplayWidth, imageDisplayHeight, imageLeft, imageTop]
    = getDisplayDimensions(props.selectedImage.image, useWindowDimensions().width, useWindowDimensions().height);

  const defaultStyle = {
    transition: `opacity 3s ease-out`,
    opacity: 0,
  }

  const transitionStyles = {
    entering: {
      opacity: 1,
    },
    entered: {
      opacity: 1,
    },
    exiting: {
      opacity: 0,
    },
    exited: {
      opacity: 0,
    },
  }

  const handleClick = () => {
    props.setSuggestionContent(
      <>
        <p>
          Clicking the image could bring up more information,
          or a purchasing option.
        </p>
        <p>
          Maybe you have your own ideas - talk to us.
        </p>
      </>
    );
    props.setSuggestionVisible(true);
  }

  return (
    <>
      <Transition in={imageIsLoaded} timeout={3000}>
        {state => (
          <div style={{
            position: 'absolute',
            top: imageTop,
            left: imageLeft,
            width: imageDisplayWidth,
            height: imageDisplayHeight,
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            <img src={props.selectedImage.image}
              alt=""
              style={{
                boxShadow: "10px 15px 5px 7px gray",
                width: '100%',
                height: '100%'

              }}
              onClick={() => {
                if (props.clickable) {
                  handleClick();
                }
              }}
            />

          </div>
        )}
      </Transition>
      {props.selectedImage.title ?
        <Transition in={imageIsLoaded && props.clickable} timeout={3000}>
          {state => (
            <div style={{
              position: 'absolute',
              bottom: imageTop / 2,
              left: '50%',
              height: 'auto',
              margin: 'auto',
              textAlign: 'center',
              backgroundColor: "white",
              color: "black",
              font: "20px Roboto",
              fontVariant: "small-caps",
              transform: 'translate(-50%)',
              paddingLeft: '20px',
              paddingRight: '20px',
              boxShadow: "6px 7px 5px 3px gray",
              ...defaultStyle,
              ...transitionStyles[state],
            }}
              onClick={() => {
                if (props.clickable) {
                  handleClick();
                }
              }}>
              <p>
                {props.selectedImage.title}<br />
                {props.selectedImage.subtitle}
              </p>
            </div>
          )}
        </Transition>
        : null}
    </>
  );
}

export default ArtistSelectedImage;