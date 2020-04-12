import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Canvas, useFrame } from "react-three-fiber";
import './index.css';

function Box() {
  const mesh = useRef()

  useFrame(() =>{
    mesh.current.rotation.y += 0.01
  })

  return (
    <mesh ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <meshBasicMaterial attach="material" color={0xf95b3c} />
    </mesh>
  );
}

function App(){
  return (
      <Canvas>
        <Box />
      </Canvas>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
