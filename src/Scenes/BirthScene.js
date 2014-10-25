define(["require", "exports", './Base/Scene', "./SceneController", './Helpers/Math', './Helpers/extend'],
 function (require, exports, s, sceneController, MathHelper, e) {
    var BirthScene = (function (_super) {
        e.__extends(BirthScene, _super);
        function BirthScene() {
            _super.call(this, 100, 0);
            this.particles = [];
            this.timePast = 0;
            this.cinematicOver = false;
            sceneController.instance.scenes.push(this);
            this.createSpermato();
            this.createOvule();
            this.createLights();
            this.createParticles();
            this.camera.position.set(0, 150, 0);
            this.camera.far = 10000;
            this.camera.updateProjectionMatrix();
            this.camera.rotation.set(-Math.PI / 2, 0, 0);
            //var orbitControl = new THREE.OrbitControls(this.camera);
            this.start();
            this.time = 45;
            //this.enabled = false;
        }
        BirthScene.prototype.createSpermato = function () {
            var GEO_Spermato = new THREE.BoxGeometry(150, 50, 150);
            var TX_spermato = THREE.ImageUtils.loadTexture("./src/Graph/TX_Cube.png");
            var MT_Spermato = new THREE.MeshBasicMaterial({ map: TX_spermato });
            MT_Spermato.transparent = true;
            this.spermatocube = new THREE.Mesh(GEO_Spermato, MT_Spermato);
            this.add(this.spermatocube);
        };
        BirthScene.prototype.createOvule = function () {
            var GEO_Ovule = new THREE.BoxGeometry(500, 500, 500);
            var TX_ovule = THREE.ImageUtils.loadTexture("./src/Graph/TX_Cube.png");
            this.MT_Ovule = new THREE.MeshBasicMaterial({ map: TX_ovule });
            this.MT_Ovule.transparent = true;
            this.ovuleCube = new THREE.Mesh(GEO_Ovule, this.MT_Ovule);
            this.add(this.ovuleCube);
            TX_ovule.wrapS = TX_ovule.wrapT = THREE.RepeatWrapping;
            TX_ovule.repeat.set(1, 1);
            this.ovuleCube.position.set(0, 200, 3000);
        };
        BirthScene.prototype.createParticles = function () {
            var _this = this;
            THREE.ImageUtils.loadTexture("./src/Graph/Spermato.png", null, function (texture) {
                var canvas = document.createElement("canvas");
                _this.SpermatoSpriteSheetCanvas = canvas.getContext("2d");
                canvas.width = texture.image.width / 5;
                canvas.height = texture.image.height;
                _this.TX_SpermatoParticle = texture;
                _this.SpermatoSpriteSheetCanvas.drawImage(_this.TX_SpermatoParticle.image, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                _this.SpermatoSpriteSheet = new THREE.Texture(_this.SpermatoSpriteSheetCanvas.canvas);
                var MT_Particle = new THREE.PointCloudMaterial({ map: _this.SpermatoSpriteSheet });
                MT_Particle.size = 100;
                MT_Particle.transparent = true;
                for (var j = 0; j < 5; j++) {
                    var particleEmiter = new THREE.Geometry();
                    for (var i = 0; i < 50; i++) {
                        particleEmiter.vertices.push(new THREE.Vector3(Math.random() * 2000 - 1000, Math.random() * 2000 - 1000, Math.random() * 2000 - 1000));
                    }
                    var pointCloud = new THREE.PointCloud(particleEmiter, MT_Particle);
                    _this.add(pointCloud);
                    pointCloud.RotationDirection = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
                    pointCloud.RotationSpeed = Math.random();
                    _this.particles.push(pointCloud);
                }
            });
        };
        BirthScene.prototype.update = function (deltaTime) {
            _super.prototype.update.call(this, deltaTime);
            this.timePast += deltaTime;
            if (this.SpermatoSpriteSheet !== undefined) {
                this.SpermatoSpriteSheetCanvas.clearRect(0, 0, this.SpermatoSpriteSheetCanvas.canvas.width, this.SpermatoSpriteSheetCanvas.canvas.height);
                this.SpermatoSpriteSheetCanvas.drawImage(this.TX_SpermatoParticle.image, (Math.floor(this.timePast * 10) % 4) * this.SpermatoSpriteSheetCanvas.canvas.width, 0, this.SpermatoSpriteSheetCanvas.canvas.width, this.SpermatoSpriteSheetCanvas.canvas.height, 0, 0, this.SpermatoSpriteSheetCanvas.canvas.width, this.SpermatoSpriteSheetCanvas.canvas.height);
                this.SpermatoSpriteSheet.needsUpdate = true;
            }
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].rotateX(this.particles[i].RotationDirection.x * this.particles[i].RotationSpeed * deltaTime);
                this.particles[i].rotateY(this.particles[i].RotationDirection.y * this.particles[i].RotationSpeed * deltaTime);
                this.particles[i].rotateZ(this.particles[i].RotationDirection.z * this.particles[i].RotationSpeed * deltaTime);
            }
            //Cinematique
            if (this.enabled) {
                if (this.timePast < 5) {
                    this.camera.rotateZ(0.4 * deltaTime);
                }
                else if (this.timePast < 7) {
                    this.camera.rotation.set(this.camera.rotation.x, this.camera.rotation.y, MathHelper.lerp(this.camera.rotation.z, Math.PI * 2, 0.05));
                }
                else if (this.timePast < 9) {
                    this.camera.rotation.set(MathHelper.lerp(this.camera.rotation.x, 0, 0.06), this.camera.rotation.y, this.camera.rotation.z);
                }
                else if (this.timePast < 11) {
                    this.camera.rotation.set(this.camera.rotation.x, MathHelper.lerp(this.camera.rotation.y, Math.PI, 0.06), this.camera.rotation.z);
                }
                else if (this.timePast < 16) {
                    this.camera.position.set(MathHelper.lerp(this.camera.position.x, this.spermatocube.position.x, 0.05), MathHelper.lerp(this.camera.position.y, this.spermatocube.position.y + 100, 0.1), MathHelper.lerp(this.camera.position.z, this.spermatocube.position.z - 200, 0.1));
                }
                else if (this.timePast < 29) {
                    this.spermatocube.position.set(this.spermatocube.position.x, MathHelper.lerp(this.spermatocube.position.y, this.ovuleCube.position.y, 0.006), MathHelper.lerp(this.spermatocube.position.z, this.ovuleCube.position.z, 0.006));
                    this.camera.position.set(this.spermatocube.position.x, this.spermatocube.position.y + 100, this.spermatocube.position.z - 200);
                }
                else if (this.timePast < 37) {
                    this.camera.position.set(MathHelper.lerp(this.camera.position.x, 0, 0.01), MathHelper.lerp(this.camera.position.y, 150, 0.01), MathHelper.lerp(this.camera.position.z, -200, 0.01));
                }
                else if (this.timePast < 39) {
                    this.MT_Ovule.map.repeat.set(2, 2);
                    this.ovuleCube.scale.set(MathHelper.lerp(this.ovuleCube.scale.x, 1.5, 0.2), MathHelper.lerp(this.ovuleCube.scale.y, 1.5, 0.2), MathHelper.lerp(this.ovuleCube.scale.z, 1, 0.2));
                }
                else if (this.timePast < 41) {
                    this.MT_Ovule.map.repeat.set(4, 4);
                    this.ovuleCube.scale.set(MathHelper.lerp(this.ovuleCube.scale.x, 2, 0.2), MathHelper.lerp(this.ovuleCube.scale.y, 2.5, 0.2), MathHelper.lerp(this.ovuleCube.scale.z, 1, 0.2));
                }
                else if (this.timePast < 43) {
                    this.MT_Ovule.map.repeat.set(8, 8);
                    this.ovuleCube.scale.set(MathHelper.lerp(this.ovuleCube.scale.x, 2.5, 0.2), MathHelper.lerp(this.ovuleCube.scale.y, 4, 0.2), MathHelper.lerp(this.ovuleCube.scale.z, 1, 0.2));
                }
                else if (this.timePast < 45) {
                    this.MT_Ovule.map.repeat.set(16, 16);
                    this.ovuleCube.scale.set(MathHelper.lerp(this.ovuleCube.scale.x, 3, 0.2), MathHelper.lerp(this.ovuleCube.scale.y, 5, 0.2), MathHelper.lerp(this.ovuleCube.scale.z, 1, 0.2));
                }
                else if (!this.cinematicOver) {
                    this.cinematicOver = true;
                    this.remove(this.ovuleCube);
                    var GEO_BebeCube = new THREE.BoxGeometry(1500, 2500, 500);
                    var MT_BebeCube = new THREE.MeshBasicMaterial({ color: 0x000000 });
                    var bebeCube = new THREE.Mesh(GEO_BebeCube, MT_BebeCube);
                    bebeCube.position.set(0, 200, 3000);
                    this.add(bebeCube);
                }
            }
        };
        BirthScene.prototype.createLights = function () {
            this.renderer.setClearColor(0xF5A9E1);
            var directionalLight = new THREE.DirectionalLight();
            directionalLight.position.set(1, 1, 0);
            this.add(directionalLight);
        };
        BirthScene.prototype.start = function () {
            this.enabled = true;
        };
        return BirthScene;
    })(s.Scene);
    exports.BirthScene = BirthScene;
});