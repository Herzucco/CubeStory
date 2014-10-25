define(["require", "exports", './Base/Scene', "./SceneController", './Helpers/Math', './Helpers/extend'], 
    function (require, exports, s, sceneController, MathHelper, e) {
    var LifeTogetherScene = (function (_super) {
        e.__extends(LifeTogetherScene, _super);
        function LifeTogetherScene() {
            _super.call(this, 1000, 1400);
            this.buildings = [];
            this.TX_building = [];
            this.timeDone = [];
            this.timePast = 0;
            //var orbitControl = new THREE.OrbitControls(this.camera);
            this.renderer.setClearColor(new THREE.Color(0x0000dd));
            sceneController.instance.scenes.push(this);
            this.camera.position.set(0, 60, -35);
            this.camera.rotation.y = Math.PI;
            this.camera.rotation.x = Math.PI / 18;
            this.camera.far = 10000;
            for (var i = 1; i < 4; i++) {
                this.loadBuildingTexture(i);
            }
            this.createCharacters();
            this.createLight();
            this.createSky();
            this.createGround();
            this.createBaseBuildings();
            //this.enabled = true;
            this.time = 20;
        }
        LifeTogetherScene.prototype.createCharacters = function () {
            var Geo_CubeBoy = new THREE.BoxGeometry(20, 50, 5);
            var MT_CubeBoy = new THREE.MeshBasicMaterial({ color: 0x000000 });
            this.cubeBoy = new THREE.Mesh(Geo_CubeBoy, MT_CubeBoy);
            this.cubeBoy.position.set(-15, 25, 20);
            this.add(this.cubeBoy);
            var MT_CubeGirl = new THREE.MeshBasicMaterial({ color: 0x8C8B8B });
            this.cubeGirl = new THREE.Mesh(Geo_CubeBoy, MT_CubeGirl);
            this.cubeGirl.position.set(15, 25, 20);
            this.cubeGirl.material.transparent = true;
            this.add(this.cubeGirl);
        };
        LifeTogetherScene.prototype.createLight = function () {
            var directional = new THREE.DirectionalLight();
            directional.intensity = 1;
            directional.position.set(0, 1, -1);
            directional.castShadow = true;
            this.add(directional);
            var ambient = new THREE.AmbientLight(0xA0A0A0);
            this.add(ambient);
        };
        LifeTogetherScene.prototype.createGround = function () {
            var Geo_Ground = new THREE.PlaneGeometry(1600, 1600);
            var MT_Ground = new THREE.MeshPhongMaterial({ color: 0x080808 });
            this.ground = new THREE.Mesh(Geo_Ground, MT_Ground);
            this.ground.receiveShadow = true;
            this.add(this.ground);
            this.ground.rotation.x = -Math.PI / 2;
        };
        LifeTogetherScene.prototype.createSky = function () {
            this.sunSphere = new THREEx.DayNight.SunSphere();
            this.add(this.sunSphere.object3d);
            this.skydom = new THREEx.DayNight.Skydom();
            this.add(this.skydom.object3d);
            this.sunLight = new THREEx.DayNight.SunLight();
            this.add(this.sunLight.object3d);
            this.starfield = new THREEx.DayNight.StarField();
            this.add(this.starfield.object3d);
            this.starfield.object3d.scale = 10;
        };
        LifeTogetherScene.prototype.update = function (deltaTime) {
            _super.prototype.update.call(this, deltaTime);
            this.timePast += deltaTime;
            this.sunSphere.update(Math.PI / 2 + 2 * this.timePast);
            this.skydom.update(Math.PI / 2 + 2 * this.timePast);
            this.sunLight.update(Math.PI / 2 + 2 * this.timePast);
            this.starfield.update(Math.PI / 2 + 2 * this.timePast);
            this.cubeBoy.position.y += Math.sin(this.timePast * 10) * 0.1;
            this.cubeGirl.position.y += Math.cos(this.timePast * 10) * 0.1;
            if (this.timePast > this.time * (1 / 2)) {
                this.cubeGirl.material.opacity -= 0.1 * deltaTime;
            }
            for (var i = this.buildings.length - 1; i >= 0; i--) {
                this.buildings[i].position.set(MathHelper.AddToAbs(this.buildings[i].position.x, -6 * deltaTime), this.buildings[i].position.y, this.buildings[i].position.z + 60 * deltaTime);
                this.buildings[i].scale.set(this.buildings[i].scale.x, this.buildings[i].scale.y * 0.997, this.buildings[i].scale.z);
                if (this.buildings[i].position.z >= 900) {
                    this.remove(this.buildings[i]);
                    this.buildings.splice(i, 1);
                }
            }
            var _this = this;
            if ((this.timePast >> 0) % 2 == 0 && this.timeDone.filter(function (nb) {
                return nb === (_this.timePast >> 0);
            }).length === 0 && this.cubeGirl.material.opacity >= 0.2) {
                this.createBuildings();
                this.timeDone.push(this.timePast >> 0);
            }
        };
        LifeTogetherScene.prototype.createBuildings = function () {
            for (var i = -1; i < 2; i += 2) {
                for (var j = 1; j < 3; j++) {
                    var size = Math.random() * 100 + 40;
                    var height = Math.random() * 250 + 150;
                    var geo_Building = new THREE.BoxGeometry(size, height, size);
                    var nb = ((Math.random()) * 2.9) >> 0;
                    var Tx = this.TX_building[nb];
                    var MT_Building = new THREE.MeshPhongMaterial({ map: Tx });
                    var building = new THREE.Mesh(geo_Building, MT_Building);
                    this.buildings.push(building);
                    this.add(building);
                    building.position.set(150 * i * j, 0, -50);
                    building.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, height / 2, 0));
                    building.castShadow = true;
                    building.receiveShadow = true;
                }
            }
        };
        LifeTogetherScene.prototype.loadBuildingTexture = function (buildingNumber) {
            var tx = THREE.ImageUtils.loadTexture("./src/Graph/building" + buildingNumber + ".jpg");
            this.TX_building.push(tx);
            //console.log(buildingNumber);
        };
        LifeTogetherScene.prototype.createBaseBuildings = function () {
            for (var y = 1; y < 6; y++) {
                for (var i = -1; i < 2; i += 2) {
                    for (var j = 1; j < 3; j++) {
                        var size = Math.random() * 100 + 40;
                        var height = (Math.random() * 250 + 150) * (1 / y);
                        var geo_Building = new THREE.BoxGeometry(size, height, size);
                        var nb = ((Math.random()) * 2.9) >> 0;
                        var Tx = this.TX_building[nb];
                        var MT_Building = new THREE.MeshPhongMaterial({ map: Tx });
                        var building = new THREE.Mesh(geo_Building, MT_Building);
                        this.buildings.push(building);
                        this.add(building);
                        building.position.set(150 * i * j, 0, -50 + (y * 150));
                        building.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, height / 2, 0));
                        building.castShadow = true;
                        building.receiveShadow = true;
                    }
                }
            }
        };
        return LifeTogetherScene;
    })(s.Scene);
    exports.LifeTogetherScene = LifeTogetherScene;
});