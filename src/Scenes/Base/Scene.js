define(["require", "exports", '../Helpers/extend'], function (require, exports, e) {
    var Scene = (function (_super) {
        e.__extends(Scene, _super);
        function Scene(x, y) {
            _super.call(this);
            this.enabled = false;
            this.x = x;
            this.y = y;
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(700, 500);
            this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
            this.renderer.shadowMapEnabled = true;
            document.body.appendChild(this.renderer.domElement);
            this.renderer.domElement.style.display = 'none';
            this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            this.add(this.camera);
            this.colladaLoader = new THREE.ColladaLoader();
            this.time = 1;
            this.enabled = false;
        }
        Scene.prototype.render = function () {
            this.renderer.render(this, this.camera);
        };
        Scene.prototype.update = function (deltaTime) {
        };
        Scene.prototype.baseLight = function () {
            var l = new THREE.DirectionalLight();
            l.castShadow = true;
            l.shadowCameraVisible = true;
            l.shadowCameraNear = 1;
            l.shadowCameraFar = 10;
            l.shadowCameraLeft = -5;
            l.shadowCameraRight = 5;
            l.shadowCameraTop = 5;
            l.shadowCameraBottom = -5;
            l.position.y = 5;
            this.add(l);
        };
        return Scene;
    })(THREE.Scene);
    exports.Scene = Scene;
});