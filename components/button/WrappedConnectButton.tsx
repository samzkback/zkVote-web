import React from 'react';
import { connectSnap } from '../../utils/snap';
// import { ConnectButton } from "@rainbow-me/rainbowkit";

// This is the higher-order component
const withConnectSnap = (WrappedComponent:any) => {
  // The returned component will have the same name as the wrapped component
  return class extends React.Component<React.ComponentProps<typeof WrappedComponent>> {
    // Add a new handler function for the onClick event
    handleClick = async () => {
      // Call the connectSnap() function here
      await connectSnap();

      // Call the original onClick handler, if it exists
      if (this.props.onClick) {
        this.props.onClick();
      }
    }

    render() {
      // Spread the original props onto the new component
      // and add the new onClick handler
      return <WrappedComponent {...this.props} onClick={this.handleClick} />;
    }
  };
};

// This is the original component that we want to enhance
const ConnectButton = (props:any) => {
  return <button onClick={props.onClick}>Connect</button>;
};

// Create the enhanced component by calling the higher-order component
const WrappedConnectButton = withConnectSnap(ConnectButton);

// Use the Wrapped component like you would use the original component
// The connectSnap() function will be called whenever the button is clicked
export default WrappedConnectButton;
