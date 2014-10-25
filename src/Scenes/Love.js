define(["require", "exports", './Base/Scene', "./SceneController", './Helpers/geometries', './Helpers/Math', './Helpers/extend'],
 function (require, exports, s, sceneController, geometries, maths, e) {
    var Love = (function (_super) {
        e.__extends(Love, _super);
        function Love() {
            _super.call(this, 100, 1000);
            sceneController.instance.scenes.push(this);
            var controls = new THREE.OrbitControls(this.camera);
            this.groundBuild();
            this.lightsBuild();
            this.cubeBuild();
            this.loverBuild();
            this.time = 15;
            this.enabled = false;
            this.renderer.setClearColor(0x550033);
            var loader = new THREE.ColladaLoader();
            loader.convertUpAxis = true;
            var self = this;
            loader.load('images/heart.dae', function (collada) {
                var object3d = collada.scene;
                object3d.scale.x *= 100;
                object3d.scale.y *= 100;
                object3d.scale.z *= 100;
                object3d.position.y = 4;
                object3d.position.x = -30;
                for (var i = 0; i < object3d.children.length; i++) {
                    var daemesh = object3d.children[i];
                    daemesh.castShadow = true;
                    daemesh.receiveShadow = true;
                    if (daemesh.material) {
                        daemesh.material.transparent = true;
                        daemesh.material.opacity = 0;
                    }
                    if (daemesh.children[0].material) {
                        daemesh.children[0].material.transparent = true;
                        daemesh.children[0].material.opacity = 0;
                        self.heart = daemesh.children[0];
                    }
                }
                self.add(object3d);
            });
        }
        Love.prototype.groundBuild = function () {
            var groundMaterial = new THREE.MeshPhongMaterial({ ambient: 0xffffff, color: 0xffffff, specular: 0xf0000f });
            groundMaterial.shininess = 50;
            groundMaterial.color.setHex(0xa0000f);
            this.ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), groundMaterial);
            this.ground.rotateX(-Math.PI / 2);
            this.ground.scale.x = 1000;
            this.ground.scale.y = 1000;
            this.ground.receiveShadow = true;
            this.add(this.ground);
        };
        Love.prototype.lightsBuild = function () {
            var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
            hemiLight.color.setHSL(0.6, 1, 0.6);
            hemiLight.groundColor.setHSL(0.095, 1, 0.75);
            hemiLight.position.set(0, 500, 0);
            this.add(hemiLight);
            var dirLight = new THREE.DirectionalLight(0xffffff, 1);
            dirLight.color.setHSL(0.1, 1, 0.95);
            dirLight.position.set(-3, 1.75, 1);
            dirLight.position.multiplyScalar(50);
            this.add(dirLight);
            dirLight.castShadow = true;
            dirLight.shadowMapWidth = 2048;
            dirLight.shadowMapHeight = 2048;
            var d = 50;
            dirLight.shadowCameraLeft = -d;
            dirLight.shadowCameraRight = d;
            dirLight.shadowCameraTop = d;
            dirLight.shadowCameraBottom = -d;
            dirLight.shadowCameraFar = 3500;
            dirLight.shadowBias = -0.0001;
            dirLight.shadowDarkness = 0.35;
            this.mainLight = dirLight;
            //dirLight.shadowCameraVisible = true;
        };
        Love.prototype.fogBuild = function () {
            this.fog = new THREE.Fog(0xffffff, 1, 5000);
            this.fog.color.setHSL(0.6, 0, 1);
        };
        Love.prototype.cubeBuild = function () {
            this.cube = new THREE.Mesh(geometries.box, new THREE.MeshPhongMaterial({ color: 0x000000 }));
            this.cube.scale.y *= 4;
            this.cube.position.x = 5;
            this.cube.castShadow = true;
            this.cube.position.y = 1;
            this.cube.material.transparent = true;
            this.add(this.cube);
            this.camera.position.x = -35;
            this.camera.position.y = 35;
            this.camera.position.z = -10;
            this.camera.rotation.x = -1.8826;
            this.camera.rotation.y = -0.3277;
            this.camera.rotation.z = -2.3569;
            this.camera.far = 10000;
            this.camera.updateProjectionMatrix();
            //this.camera.rotateX(-0.2);
            //this.cube.add(this.camera);
        };
        Love.prototype.loverBuild = function () {
            // MATERIALS
            /*var materialColor = new THREE.Color();
            materialColor.setHex(0x8C8B8B);
    
            var phongMaterial = shaders.createShaderMaterial("phongDiffuse", this.mainLight);
            phongMaterial.uniforms.uMaterialColor.value.copy(materialColor);
            phongMaterial.side = THREE.DoubleSide;*/
            this.lover = new THREE.Mesh(geometries.box, new THREE.MeshPhongMaterial({ color: 0x8C8B8B }));
            this.lover.scale.y *= 3;
            //this.lover.scale.z *= 1.5;
            this.lover.position.x = -50;
            this.lover.castShadow = true;
            this.lover.position.y = 1;
            this.lover.material.transparent = true;
            this.add(this.lover);
        };
        Love.prototype.update = function (deltaTime) {
            _super.prototype.update.call(this, deltaTime);
            this.cube.position.x = maths.lerp(this.cube.position.x, -23, deltaTime * 0.5);
            this.lover.position.x = maths.lerp(this.lover.position.x, -24, deltaTime * 0.3);
            if (this.lover.position.x < -23.5 && this.lover.position.x > -24.5) {
                this.heart.castShadow = true;
            }
            this.camera.position.y = maths.lerp(this.camera.position.y, 12, deltaTime * 0.1);
            this.camera.position.z = maths.lerp(this.camera.position.z, -3, deltaTime * 0.1);
            this.camera.position.x = maths.lerp(this.camera.position.x, -30, deltaTime * 0.1);
        };
        return Love;
    })(s.Scene);
    exports.Love = Love;
});