import { Transition } from 'react-transition-group';
import { useWindowDimensions } from "../Containers.jsx";

const MenuItem = (props) => {
  return (
    <div
      style={{
        width: useWindowDimensions().width / 2,
        position: "absolute",
        bottom: props.bottom,
        backgroundColor: "black",
        color: "white",
        font: "25px Arial",
        fontVariant: "small-caps",
        ...props.style,
      }}>
      <div style={{ padding: '10px' }}
        onClick={() => props.onClick()}>
        {props.text}
      </div>
    </div>
  );
}

// needs to be top-level to retain transitions
const Menu = (props) => {
  return (
    <>
      <MenuItem
        style={{ ...props.style }}
        text="Gallery"
        bottom={useWindowDimensions().height / 2}
        onClick={props.galleryActivated} />
      <MenuItem
        style={{ ...props.style }}
        text="About the artist"
        bottom={useWindowDimensions().height / 3}
        onClick={() => {
          props.setSuggestionContent(
            <>
              <p>
                Clicking this menu item may bring up a creator biography, exhibition dates or other information.
              </p>
              <p>
                You will know best what your business needs - talk to us.
              </p>
            </>
          );
          props.setSuggestionVisible(true);
        }} />
      <MenuItem
        style={{ ...props.style }}
        text="Contact"
        bottom={useWindowDimensions().height / 6}
        onClick={() => {
          props.setSuggestionContent(
            <>
              <p>
                Clicking this menu item may bring up a &apos;real-life&apos; gallery address, email addresses or phone numbers.
              </p>
              <p>
                There may even be a facility to send a message directly from the website. We can help you decide what suits you best.
              </p>
            </>
          );
          props.setSuggestionVisible(true);
        }} />
    </>
  );
};


function ArtistMenu(props) {

  const defaultStyle = {
    transition: `3s ease-out`,
    opacity: 0,
    left: useWindowDimensions().width,
  }

  const transitionStyles = {
    entering: {
      opacity: 1,
      left: useWindowDimensions().width / 2,
    },
    entered: {
      opacity: 1,
      left: useWindowDimensions().width / 2,
    },
    exiting: {
      opacity: 0,
      left: useWindowDimensions().width,
    },
    exited: {
      opacity: 0,
      left: useWindowDimensions().width,
    },
  };

  return (
    // I don't think this div serves any purpose any more
    <div style={{ width: useWindowDimensions().width, overflow: 'hidden' }}>
      <Transition in={props.visible} appear={true} timeout={3000}>
        {state => (
          <Menu
          galleryActivated={props.galleryActivated}
          setSuggestionContent={props.setSuggestionContent}
          setSuggestionVisible={props.setSuggestionVisible}
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }} />
        )}
      </Transition>
    </div>
  );
}

export default ArtistMenu;