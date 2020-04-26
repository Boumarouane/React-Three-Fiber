import React, { useRef, useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Canvas, useFrame } from "react-three-fiber";
import './index.css';

// composant = cube
const Box = () => {

  // construction de notre objet
  const mesh = useRef();

  const time = useRef(0);

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const color = isHovered ? 0xe5d54d : (isActive ? 0xf7e7e5 : 0xf95b3c);

  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);


  // callback du hover
  const onHover = useCallback((e, value) => {
    e.stopPropagation();
    setIsHovered(value);
  }, [setIsHovered]);

  // callback du click
  const onClick = useCallback(
    e => {
      e.stopPropagation();
      setIsActive(v => !v);
    },
    [setIsActive]
  );


  // boucle d'animation
  useFrame(() =>{
    mesh.current.rotation.y += 0.01;
    if (isActiveRef.current) { 
    time.current += 0.3;
    mesh.current.scale.y =  Math.sin(time.current) * 0.4;
    mesh.current.scale.z =  Math.sin(time.current) * 0.4;
    mesh.current.scale.x =   2;
  }
  });

  return (
    // construction de notre cube
    <mesh 
    ref={mesh}
    position={[0, 2, 0]}
    onPointerOver={e => onHover(e, true)}
    onPointerOut={e => onHover(e, false)}
    onClick={e => onClick(e)}
    >
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material" color={color} />
      <ambientLight intensity={0.9} />
      <pointLight intensity={2} position={[10, 0, 0]} color={0x089776}/>
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
