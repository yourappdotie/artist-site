import React from "react";
import { DarkCard, IconHeading } from './Containers';

export const SuggestionCard = (props) => {
  var icon;
  switch (props.icon) {
    case "website":
      icon = '/assets/images/icons/icon_yourapp_webpage.png';
      break;
    case "web":
      icon = '/assets/images/icons/icon_yourapp_icon_socmed.png';
      break;
    case "mobile":
      icon = '/assets/images/icons/icon_yourapp_icon_mobapp.png';
      break;
    default:
      icon = '/assets/images/icons/icon_yourapp_webpage.png';
  }

  return (
    <DarkCard onClick={props.onClick} exitAction={props.exitAction} >
      <IconHeading icon={icon} heading={props.heading} />
      {props.children}
    </DarkCard>
  );
}
