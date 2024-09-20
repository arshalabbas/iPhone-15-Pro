import { Dispatch, MutableRefObject, SetStateAction, Suspense } from "react";
import * as THREE from "three";
import { ModelType } from "../types";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import Lights from "./Lights";
import IphoneModel from "./IPhoneModel";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import Loader from "./Loader";

interface Props {
  index: number;
  groupRef: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  gsapType: string;
  controlRef: MutableRefObject<OrbitControlsImpl>;
  setRotationState: Dispatch<SetStateAction<number>>;
  item: ModelType;
  size: "small" | "large";
}

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}: Props) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 && "right-[-100%]"}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => {
          if (controlRef)
            setRotationState(controlRef.current.getAzimuthalAngle());
        }}
      />

      <group ref={groupRef} name={size} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <IphoneModel
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
