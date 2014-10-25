define(["require", "exports", './Base/Scene', "./SceneController", './Helpers/Math', './Helpers/extend'],
    function (require, exports, s, sceneController, maths, e) {
    var test = (function (_super) {
        e.__extends(test, _super);
        function test() {
            _super.call(this, 10000, 10000);
            this.pointsRoad = [];
            this.index = 0;
            this.enabled = true;
            this.dayDuration = 277;
            for (var i = 0; i < sceneController.instance.scenes.length; i++) {
                this.pointsRoad.push(new THREE.Vector2((sceneController.instance.scenes[i].x + 250) * 0.1655 - 250, (sceneController.instance.scenes[i].y + 250) * -0.1655 + 248));
            }
            sceneController.instance.scenes.push(this);
            this.camera.far = 10000;
            this.camera.rotation.y = 1;
            this.camera.position.x = -60;
            this.camera.updateProjectionMatrix();
            //new THREE.OrbitControls(this.camera);
            this.texture = new THREE.Texture(sceneController.instance.mainScene.canvas);
            var material = new THREE.MeshLambertMaterial({ map: this.texture });
            material.transparent = true;
            // cube
            //this.cube = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), material);
            this.cube = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), material);
            //cube.rotation.x = Math.PI * 0.1;
            this.add(this.cube);
            // add subtle ambient lighting
            var ambientLight = new THREE.AmbientLight(0xbbbbbb);
            this.add(ambientLight);
            // directional lighting
            var directionalLight = new THREE.DirectionalLight(0xffffff);
            directionalLight.position.set(1, 1, 1).normalize();
            this.add(directionalLight);
            this.camera.position.z = 60;
            this.camera.position.y = 200;
            this.renderer.domElement.style.display = 'block';
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.sunAngle = -3 / 6 * Math.PI * 4;
            this.skydom = new THREEx.DayNight.Skydom();
            this.add(this.skydom.object3d);
            this.starField = new THREEx.DayNight.StarField();
            this.add(this.starField.object3d);
            this.timer = 0;
            this.traveling = true;
        }
        test.prototype.update = function (deltaTime) {
            this.sunAngle += deltaTime / this.dayDuration * Math.PI * 2;
            this.texture.needsUpdate = true;
            _super.prototype.update.call(this, deltaTime);
            this.skydom.update(this.sunAngle);
            this.starField.update(this.sunAngle);
            //this.camera.position.z -= 1;
            //this.cube.rotateY(0.001);
            if (this.traveling) {
                if (this.camera.position.x < this.pointsRoad[this.index].x + 1 && this.camera.position.x > this.pointsRoad[this.index].x - 1) {
                    this.timer += deltaTime;
                    this.camera.position.z = maths.lerp(this.camera.position.z, 60, deltaTime);
                    if (this.timer >= sceneController.instance.scenes[this.index].time) {
                        this.timer = 0;
                        sceneController.instance.scenes[this.index].enabled = false;
                        this.index++;
                        if (this.index >= this.pointsRoad.length) {
                            this.traveling = false;
                        }
                        else {
                            sceneController.instance.scenes[this.index].enabled = true;
                        }
                    }
                }
                else {
                    this.camera.rotation.y = maths.lerp(this.camera.rotation.y, 0, deltaTime);
                    this.camera.position.z = maths.lerp(this.camera.position.z, 90, deltaTime);
                    this.camera.position.x = maths.lerp(this.camera.position.x, this.pointsRoad[this.index].x, deltaTime);
                    this.camera.position.y = maths.lerp(this.camera.position.y, this.pointsRoad[this.index].y, deltaTime);
                }
            }
            else {
                this.camera.position.z = maths.lerp(this.camera.position.z, 350, deltaTime * 0.5);
                this.camera.position.y = maths.lerp(this.camera.position.y, 80, deltaTime * 0.5);
                this.camera.rotation.y = maths.lerp(this.camera.rotation.y, -0.8, deltaTime * 0.5);
                this.cube.material.opacity -= 0.003;
            }
        };
        test.prototype.render = function () {
            _super.prototype.render.call(this);
        };
        return test;
    })(s.Scene);
    exports.test = test;
});
