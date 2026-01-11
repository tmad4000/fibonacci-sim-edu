
import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NatureType, GeometryProps } from '../types';

const NatureObject: React.FC<GeometryProps> = ({ type, phi, count }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorObj = useMemo(() => new THREE.Color(), []);

  // Determine the effective angle based on the current phi scale
  const goldenAngle = (2 * Math.PI) / (phi + 1);

  useEffect(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      let x = 0, y = 0, z = 0, s = 1;
      let color = '#ffffff';

      if (type === NatureType.SUNFLOWER) {
        const r = Math.sqrt(i) * 0.25;
        const theta = i * goldenAngle;
        x = r * Math.cos(theta);
        y = r * Math.sin(theta);
        z = -0.05 * r * r;
        s = 0.15;
        color = '#facc15';
      } else if (type === NatureType.SEASHELL) {
        const t = i * 0.1;
        const growth = 1.12;
        const radius = Math.pow(growth, t);
        const theta = t * 2 * Math.PI / (phi - 0.618 + 1);
        x = radius * Math.cos(theta);
        y = radius * Math.sin(theta);
        z = -t * 0.4;
        s = 0.08 * radius;
        color = '#f1f5f9';
      } else if (type === NatureType.PINECONE) {
        const py = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - py * py);
        const theta = i * goldenAngle;
        x = Math.cos(theta) * radius * 3;
        z = Math.sin(theta) * radius * 3;
        y = py * 5;
        s = 0.25;
        color = '#78350f';
      }

      dummy.position.set(x, y, z);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      colorObj.set(color);
      meshRef.current.setColorAt(i, colorObj);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [type, phi, count, goldenAngle, dummy, colorObj]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <instancedMesh 
      key={`nature-mesh-${type}-${count}`}
      ref={meshRef} 
      args={[null as any, null as any, count]}
    >
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial roughness={0.1} metalness={0.8} />
    </instancedMesh>
  );
};

export default NatureObject;
