import { Transition } from 'react-transition-group';
import { useWindowDimensions } from '../Containers.jsx'

function useScreenCentre() {
  return {
    x: useWindowDimensions().width / 2,
    y: useWindowDimensions().height / 2,
  }
}

/**
 * String must name the form <name>-<width>x<height>.<extension>
 * Returns 10% padding values for imageTop and imageLeft
 * @param {String} image 
 * @param {Number} frameWidth 
 * @param {Number} frameHeight 
 * @returns [imageDisplayWidth, imageDisplayHeight, imageLeft, imageTop]
 */
export function getDisplayDimensions(image, frameWidth, frameHeight) {
  let indexOfSeparator = image.lastIndexOf('-');
  let indexOfX = image.lastIndexOf('x');
  let endOfDimensions = image.indexOf('.', indexOfX);

  var actualWidth = image.substring(indexOfSeparator + 1, indexOfX);
  var actualHeight = image.substring(indexOfX + 1, endOfDimensions);
  var imageAspectRatio = actualWidth / actualHeight;
  var frameAspectRatio = frameWidth / frameHeight;
  var imageDisplayWidth, imageDisplayHeight;
  // With aspect ratios, "> 1" means landscape,
  // ">" means left is MORE landscape (i.e. need to squeeze rather than squash)
  if (imageAspectRatio > frameAspectRatio) {
    imageDisplayWidth = frameWidth * .8;
    imageDisplayHeight = imageDisplayWidth / imageAspectRatio;
    return [
      imageDisplayWidth,
      imageDisplayHeight,
      frameWidth * .1,
      (frameHeight - imageDisplayHeight) / 2,
    ];
  } else {
    imageDisplayHeight = frameHeight * .8; 
    imageDisplayWidth = imageDisplayHeight * imageAspectRatio;
    return [
      imageDisplayWidth,
      imageDisplayHeight,
      (frameWidth - imageDisplayWidth) / 2,
      frameHeight * .1,
    ];
  }
}

const ArtistGalleryItem = (props) => {
  const itemCentre = {
    x: props.pos.left + (props.width / 2),
    y: props.pos.top + (props.height / 2),
  }
  const distanceToScreenCentre = {
    dx: useScreenCentre().x - itemCentre.x,
    dy: useScreenCentre().y - itemCentre.y,
  }
  const startLeft = itemCentre.x
    - (distanceToScreenCentre.dx * 2)
    - (props.width / 2);
  const startTop = itemCentre.y
    - (distanceToScreenCentre.dy * 2)
    - (props.height / 2);

  const defaultStyle = {
    transition: `3s ease-out`,
    top: startTop,
    left: startLeft,
    opacity: 0,
  }

  const transitionStyles = {
    entering: {
      top: props.pos.top,
      left: props.pos.left,
      opacity: 1,
    },
    entered: {
      top: props.pos.top,
      left: props.pos.left,
      opacity: 1,
    },
    exiting: {
      top: startTop,
      left: startLeft,
      opacity: 0,
    },
    exited: {
      top: startTop,
      left: startLeft,
      opacity: 0,
    }
  }

  const [imageDisplayWidth, imageDisplayHeight, imageLeft, imageTop]
    = getDisplayDimensions(props.image.galleryImage, props.width, props.height);

  return (
    <Transition in={props.visible} timeout={3000}>
      {state => (
        <div
          key={props.index}
          style={{
            position: 'absolute',
            width: props.width,
            height: props.height,
            // border: '5px solid black',
            ...defaultStyle,
            ...transitionStyles[state]
          }}
          onClick={() => {
            if (props.visible) {
              props.onClick(props.image);
            }
            }}>
          <img
            src={props.image.galleryImage}
            alt={props.alt}
            height={imageDisplayHeight}
            width={imageDisplayWidth}
            style={{ paddingLeft: imageLeft, paddingTop: imageTop }} />
        </div>

      )}
    </Transition>
  );
}

export default ArtistGalleryItem;