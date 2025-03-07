"use client";

import { Group, Mesh, MeshBasicMaterial, ShapeGeometry } from "three";
// @ts-expect-error - Ignore import error
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";

import { WorldController } from "@/components/canvas/world";

class _ extends Group {
  url: string;
  options?: {
    color: string;
  };

  constructor(
    url: string,
    options?: {
      color: string;
    }
  ) {
    super();

    this.url = url;
    this.options = options;
  }

  async initMesh() {
    const { loadSVG } = WorldController;

    // Fetch the SVG data from the provided URL
    const svgData = await fetch(this.url);
    const svgText = await svgData.text();

    // Load the SVG data
    const data = await loadSVG(`data:image/svg+xml,${encodeURIComponent(svgText)}`);

    const paths = data.paths;

    const group = new Group();
    group.scale.y *= -1;
    group.scale.multiplyScalar(0.002);

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];

      const material = new MeshBasicMaterial({
        color: this.options?.color || "white",
        transparent: true,
        depthTest: false
      });
      const shapes = SVGLoader.createShapes(path);

      for (let j = 0; j < shapes.length; j++) {
        const shape = shapes[j];
        const geometry = new ShapeGeometry(shape);
        const mesh = new Mesh(geometry, material);
        group.add(mesh);
      }
    }

    this.add(group);
  }

  public update(): void {
    // always be looking at the camera
    this.lookAt(WorldController.camera.position);
  }
}

export default _;
