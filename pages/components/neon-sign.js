import Head from 'next/head';
import { useEffect, useState } from 'react';
import Router from 'next/router';

import firebase from 'config/firebase-config';

import '../../styles/NeonSign.module.css';

const globalStyle = `
  :root {
    /* Base font size */
    font-size: 10px;   
    
    /* Set neon color */
    --neon-text-color: #08f;
    --neon-border-color: #FF69B4;
  }

  body {
    font-family: 'Exo 2', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;  
    background: #000;
    min-height: 100vh;
    overflow: hidden;
    cursor: none;
  }

  h1 {
    font-size: 13rem;
    font-weight: 200;
    font-style: italic;
    color: #fff;
    padding: 4rem 6rem 5.5rem;
    border: 0.4rem solid #fff;
    border-radius: 2rem;
    text-transform: uppercase;
    animation: flicker 1.5s infinite alternate;     
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  }

  h1::-moz-selection {
    background-color: var(--neon-border-color);
    color: var(--neon-text-color);
  }

  h1::selection {
    background-color: var(--neon-border-color);
    color: var(--neon-text-color);
  }

  h1:focus {
    outline: none;
  }

  /* Animate neon flicker */
  @keyframes flicker {
      
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
      
      text-shadow:
        -0.2rem -0.2rem 1rem #fff,
        0.2rem 0.2rem 1rem #fff,
        0 0 2rem var(--neon-text-color),
        0 0 4rem var(--neon-text-color),
        0 0 6rem var(--neon-text-color),
        0 0 8rem var(--neon-text-color),
        0 0 10rem var(--neon-text-color);
        
      box-shadow:
        0 0 .5rem #fff,
        inset 0 0 .5rem #fff,
        0 0 2rem var(--neon-border-color),
        inset 0 0 2rem var(--neon-border-color),
        0 0 4rem var(--neon-border-color),
        inset 0 0 4rem var(--neon-border-color);        
    }
    
    20%, 24%, 55% {        
      text-shadow: none;
      box-shadow: none;
    }    
  }
`;

export default function NeonSign() {
  const [title, setTitle] = useState();

  useEffect(() => {
    const ref = firebase.firestore()
      .collection('components')
      .doc('neon-sign');
    ref.onSnapshot(async doc => {
      const data = doc.data();
      const title = data.title;
      const refresh = data.refresh;
      const root = document.documentElement;
      const textColor = data.textColor;
      const borderColor = data.borderColor;
      setTitle(title);
      root.style.setProperty('--neon-text-color', textColor);
      root.style.setProperty('--neon-border-color', borderColor);
      if (refresh) {
        await ref.update({
          refresh: false,
        });

        Router.reload(window.location.pathname);
      }
    });
  }, []);

  return (
    <div>
      <Head>
        <title>{title || 'Loading...'}</title>
        <link rel="icon" href="/favicon.ico" />
        <style>{globalStyle}</style>
      </Head>

      <main>
        {title 
          ? (<h1>{title}</h1>)
          : null
        }
      </main>
    </div>
  );
}
