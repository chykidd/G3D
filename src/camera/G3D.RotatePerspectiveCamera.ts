import BasePerspectiveCamera from './G3D.BasePerspectiveCamera';
import Engine from '../core/G3D.Engine';

import Tools from '../math/G3D.Tools';

class RotatePerspectiveCamera extends BasePerspectiveCamera {

    radius = 100;
    alpha = 45;
    beta = 45;

    constructor(scene) {
        super();

        const { width, height } = Engine.instance;

        this.viewRatio = width / height;

        scene.activeCamera = this;
    }

    getVMatrix() {

        const r2 = Math.cos(Tools.deg2rad(this.beta)) * this.radius;
        const y = Math.sin(Tools.deg2rad(this.beta)) * this.radius;
        const x = Math.sin(Tools.deg2rad(this.alpha)) * r2;
        const z = Math.cos(Tools.deg2rad(this.alpha)) * r2;

        const center = this.center;
        this.position.x = center.x + x;
        this.position.y = center.y + y;
        this.position.z = center.z + z;

        return super.getVMatrix();
    }

    getViewRay(x, y, flip) {
        const { width, height } = Engine.instance;
        return super.getViewRay(x / width, y / height, flip);
    }
}

export default RotatePerspectiveCamera;