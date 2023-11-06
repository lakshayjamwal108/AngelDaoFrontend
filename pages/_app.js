import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Sepolia } from "@thirdweb-dev/chains";
import { BrowserRouter as Router } from 'react-router-dom';
import '../styles/globals.css';
import { MyComponent } from '../context'; // Import MyComponent from your context file
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId=""//add your thirdweb client id here
    >
      <MyComponent> {/* Wrap your entire application with MyComponent */}
      <Navbar/>
        <Component {...pageProps} />
      </MyComponent>
    </ThirdwebProvider>
  );
}

export default MyApp;
