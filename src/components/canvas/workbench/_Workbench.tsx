import { state } from "@/store";
import { useDevice } from "@/utils";
import { useFrame } from "@react-three/fiber";
import { editable as e } from "@theatre/r3f";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";

import "@/utils/_bentPlaneGeometry";

import Content from "@/components/canvas/sandboxes/_Content";
import Modal from "@/components/canvas/sandboxes/_Modal";

import Dashboard from "./_Dashboard";

interface Props {
  rotation?: [number, number, number];
}

const _ = ({ rotation = [0, 0, 0] }: Props) => {
  const { isMobile } = useDevice();
  const ref = useRef() as React.MutableRefObject<THREE.Group>;
  const { selectedStep, wbSelectedModal } = useSnapshot(state);

  useFrame(({ pointer }) => {
    if (ref.current && !isMobile) {
      ref.current.rotation.x = rotation[0] - pointer.y / 400;
      ref.current.rotation.y = rotation[1] + pointer.x / 50;
      ref.current.rotation.z = rotation[2] - pointer.y / 400;
    }
  });

  useEffect(() => {
    if (selectedStep === 3 && state.wbSelectedModal === undefined)
      gsap.delayedCall(1.5, () => (state.wbSelectedModal = 1));
    else if ((selectedStep || 0) < 3) state.wbSelectedModal = undefined;
  }, [selectedStep]);

  return (
    <e.group ref={ref} theatreKey="workbench-content" rotation={rotation} position={[0, 2, -8]}>
      <Dashboard visible={selectedStep === 3} modalStep={wbSelectedModal} />

      {/* Introducing Workbench */}
      <group position={[0, 0, 0]}>
        <Content
          visible={wbSelectedModal === 1}
          url={"/textures/stripe/workbench/ui1.png"}
          position={[0, -0.4, 0.8]}
          size={{
            width: 3,
            height: 1.47
          }}
          bottom
        />
        <Modal
          theatreKey="wb-modal-1"
          visible={wbSelectedModal === 1}
          title="Introducing Workbench"
          description="See your Stripe integration’s health and activity with one tap. Summon Workbench from anywhere in the Stripe Dashboard."
          position={[isMobile ? 0.3 : 1.5, isMobile ? 0.85 : 0.9, isMobile ? 1.5 : 0]}
        />
      </group>

      {/* Logging and events */}
      <group position={[0, 0.15, 0.025]}>
        <Content
          visible={wbSelectedModal === 2}
          url={"/textures/stripe/workbench/ui2.png"}
          position={[0, -0.55, 0.8]}
          size={{
            width: 3,
            height: 1.47
          }}
          bottom
        />
        <Modal
          visible={wbSelectedModal === 2}
          title="Logging and events"
          description="Dig in and troubleshoot with powerful filtering on a complete view of your logs and events."
          position={[isMobile ? -0.2 : -1.5, isMobile ? 0.7 : 0.8, isMobile ? 1.5 : 0]}
        />
      </group>

      {/* Inspector */}
      <group position={[0, 0, 0.05]}>
        <Content
          visible={wbSelectedModal === 3}
          url={"/textures/stripe/workbench/ui3.png"}
          position={[0, -0.4, 0.8]}
          size={{
            width: 3,
            height: 1.47
          }}
          bottom
        />
        <Modal
          visible={wbSelectedModal === 3}
          title="Inspector"
          description="Peek under the hood at the JSON of any API object. View the object’s request logs and state changes over time to understand and debug your integration."
          position={[isMobile ? 0.35 : 1.5, isMobile ? 0.75 : 1, isMobile ? 1.5 : 0]}
        />
      </group>

      {/* Shell and API explorer */}
      <group position={[0, 0, 0.075]}>
        <Content
          visible={wbSelectedModal === 4}
          url={"/textures/stripe/workbench/ui4.png"}
          position={[0, -0.4, 0.8]}
          size={{
            width: 3,
            height: 1.47
          }}
          bottom
        />
        <Modal
          visible={wbSelectedModal === 4}
          title="Shell and API Explorer"
          description="Build API requests with the API Explorer, and run them from the Shell. When you’re ready to code, use the generated snippets in the language you need."
          position={[isMobile ? -0.25 : 1.5, isMobile ? 0.75 : 1, isMobile ? 1.5 : 0]}
        />
      </group>
    </e.group>
  );
};

export default _;
