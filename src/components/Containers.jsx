import React, { useEffect, useState } from 'react';
import { SuggestionCard } from './SuggestionCard.jsx';
import '../styles/containers.css';

export const Suggestion = (props) => {
  return (
    <div
      onClick={() => {
        props.setIsVisible(false);
      }}
      style={{
        position: 'absolute',
        width: useWindowDimensions().width,
        height: useWindowDimensions().height,
        backdropFilter: 'blur(5px)',
      }}>
      <div style={{
        minWidth: Math.min(300, useWindowDimensions().width) + 'px',
        position: 'absolute',
        top: useWindowDimensions().height / 2,
        left: useWindowDimensions().width / 2,
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Roboto',
      }}>
        <SuggestionCard
          icon='website'
          heading='More information'
          exitAction={() => props.setIsVisible(false)} >
          {props.children}
        </SuggestionCard>
      </div>
    </div>
  );
}

export const Card = (props) => {
  return (<div
    onClick={(e) => {
      e.stopPropagation();
      if (props.onClick) {
        props.onClick();
      }
    }}
    style={{
      borderRadius: '20px',
      width: "90%",
      margin: props.margin,
      marginLeft: '5%',
      color: props.fontColor,
      backgroundColor: props.backgroundColor,
      height: '100%'
    }}>
    {props.exitAction ?
      <img
        src={'/assets/images/icons/yourapp_button_exit.png'}
        alt="exit button"
        onClick={() => props.exitAction()}
        style={{
          position: 'absolute',
          right: '44px',
          top: '20px',
          height: '24px',
          width: '24px',
        }} />
      : null}
    {props.children}
  </div>)
}

export const ContainerRow = (props) => {
  return (<div style={{
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    ...props.style
  }}>
    {props.children}
  </div>);
}

export const ContainerXpc = (props) => {
  return (<div
    style={{
      flex: props.percentage,
    }}>
    {props.child ? props.child : props.children}
  </div>)
}

export const ExactHeightSquareImage = (props) => {
  return (
    <div style={{
      backgroundImage: `url(${props.image})`,
      backgroundColor: props.backgroundColor,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      height: props.side,
      width: props.side,
    }}>
      {props.children}
    </div>
  );
}

export const IconHeading = (props) => {
  return (
    <ContainerRow>
      <div float='left' style={{ paddingRight: '12px' }}>
        <ExactHeightSquareImage
          image={props.icon}
          side="24px" />
      </div>
      <h2 style={{ margin: 0 }} >
        {props.heading}
      </h2>
    </ContainerRow>
  );
}

export const DarkCard = (props) => {
  return (
    <Card backgroundColor="#303030" fontColor="white" onClick={props.onClick} exitAction={props.exitAction} >
      <div style={{ margin: '16px', padding: '24px'}}>
        {props.children}
      </div>
    </Card>
  );
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
