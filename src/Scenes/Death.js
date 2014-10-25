define(["require", "exports", './Base/Scene', "./SceneController", './Helpers/geometries', './Helpers/extend'], 
    function (require, exports, s, sceneController, geometries, e) {
    var Death = (function (_super) {
        e.__extends(Death, _super);
        function Death() {
            _super.call(this, 0, 1800);
            this.timePast = 0;
            sceneController.instance.scenes.push(this);
            //var controls = new THREE.OrbitControls(this.camera);
            this.fogBuild();
            this.groundBuild();
            this.lightsBuild();
            this.cubeBuild();
            this.sunSphere = new THREEx.DayNight.SunSphere();
            this.add(this.sunSphere.object3d);
            this.skydom = new THREEx.DayNight.Skydom();
            this.add(this.skydom.object3d);
            this.sunAngle = -3 / 6 * Math.PI * 2.1;
            this.dayDuration = 500;
            this.starField = new THREEx.DayNight.StarField();
            this.add(this.starField.object3d);
            this.sunLight = new THREEx.DayNight.SunLight();
            this.add(this.sunLight.object3d);
            this.fog = new THREE.Fog(0x000000, 3500, 15000);
            this.fog.color.setHSL(0.51, 0.4, 0.01);
            this.time = 50;
        }
        Death.prototype.update = function (deltaTime) {
            _super.prototype.update.call(this, deltaTime);
            this.timePast += deltaTime;
            this.sunAngle += deltaTime / this.dayDuration * Math.PI * 2;
            this.cube.position.z -= 0.01;
            this.cube.material.opacity -= 0.02 * deltaTime;
            this.cube.position.y += Math.sin(this.timePast * 10) * 0.01;
            if (this.cube.material.opacity < 0.1) {
                this.cube.castShadow = false;
            }
            //this.camera.rotateY(0.01);
            this.sunSphere.update(this.sunAngle);
            this.skydom.update(this.sunAngle);
            this.starField.update(this.sunAngle);
            this.sunLight.update(this.sunAngle);
            //this.y -= 1;
        };
        Death.prototype.groundBuild = function () {
            var groundMaterial = new THREE.MeshPhongMaterial({ ambient: 0xffffff, color: 0xffffff, specular: 0x050505 });
            groundMaterial.shininess = 150;
            groundMaterial.color.setHSL(0.095, 1, 0.75);
            this.ground = new THREE.Mesh(geometries.plane, groundMaterial);
            this.ground.rotateX(-Math.PI / 2);
            this.ground.scale.x = 1000;
            this.ground.scale.y = 1000;
            this.ground.receiveShadow = true;
            this.add(this.ground);
        };
        Death.prototype.lightsBuild = function () {
            var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
            hemiLight.color.setHSL(0.6, 1, 0.6);
            hemiLight.groundColor.setHSL(0.095, 1, 0.75);
            hemiLight.position.set(0, 500, 0);
            this.add(hemiLight);
            var dirLight = new THREE.DirectionalLight(0xffffff, 1);
            dirLight.color.setHSL(0.1, 1, 0.95);
            dirLight.position.set(-1, 1.75, 1);
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
            //dirLight.shadowCameraVisible = true;
        };
        Death.prototype.fogBuild = function () {
            this.fog = new THREE.Fog(0xffffff, 1, 5000);
            this.fog.color.setHSL(0.6, 0, 1);
        };
        Death.prototype.cubeBuild = function () {
            this.cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: 0x000000 }));
            this.cube.scale.y *= 4;
            this.cube.position.x = 5;
            this.cube.castShadow = true;
            this.cube.position.y = 1;
            this.cube.material.transparent = true;
            this.add(this.cube);
            this.camera.position.y = 5;
            this.camera.position.z = 10;
            this.camera.far = 10000;
            this.camera.updateProjectionMatrix();
            this.camera.rotateX(-0.2);
            //this.cube.add(this.camera);
        };
        return Death;
    })(s.Scene);
    exports.Death = Death;
});