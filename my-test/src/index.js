import React, { useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Canvas, useFrame } from "react-three-fiber";
import './index.css';

// composant = cube
const Box = () => {
  const [isHovered, setIsHovered] = useState(false);
  const color = isHovered ? 0xe5d54d : 0xf95b3c;

  const onHover = useCallback((e, value) => {
    e.stopPropagation();
    setIsHovered(value);
  }, [setIsHovered]);

  // construction de notre objet
  const mesh = useRef()

  // boucle d'animation
  useFrame(() =>{
    mesh.current.rotation.y += 0.01
  });

  return (
    // construction de notre cube
    <mesh 
    ref={mesh}
    position={[0, 2, 0]}
    onPointerOver={e => onHover(e, true)}
    onPointerOut={e => onHover(e, false)}
    >
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <meshBasicMaterial attach="material" color={color} />
    </mesh>
  );
}

const App = () => {
  return (
      <Canvas>
        <Box />
      </Canvas>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
