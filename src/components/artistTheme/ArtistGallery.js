import { useWindowDimensions } from '../Containers';
import ArtistGalleryItem from './ArtistGalleryItem';

function useViewportAspectRatio() {
  return useWindowDimensions().width
    / useWindowDimensions().height;
}

function useGalleryLayout() {
  if (useViewportAspectRatio() > 1) {
    return {
      framesInRow: 3,
      framesInColumn: 2
    };
  }
  return {
    framesInRow: 2,
    framesInColumn: 3
  }
}

const ArtistGallery = (props) => {

  var layout = useGalleryLayout();
  var frameWidth = (useWindowDimensions().width * .8) / layout.framesInRow;
  var frameHeight = (useWindowDimensions().height * .8) / layout.framesInColumn;
  var framePositions = [];
  var galleryTop = useWindowDimensions().height * .1;
  var galleryLeft = useWindowDimensions().width * .1;
  for (let r = 0; r < layout.framesInColumn; r++) {
    for (let c = 0; c < layout.framesInRow; c++) {
      let top = galleryTop + (r * frameHeight);
      let left = galleryLeft + (c * frameWidth);
      framePositions.push({
        top: top,
        left: left,
      });
    }
  }

  return (
    <>
      {framePositions.map((pos, index) => {
        return (
          <ArtistGalleryItem
            pos={pos}
            index={index}
            width={frameWidth}
            height={frameHeight}
            onClick={props.handleGalleryItemSelected}
            visible={props.visible}
            image={props.images[index]}
            key={pos + index}
          />
        );
      })}
      {
        props.visible ? props.backButton : null
      }
    </>
  )
}

export default ArtistGallery;