/**
 * Created by herzucco on 08/10/2014.
 */
define(["require", "exports"], function (require, exports) {
    exports.classicRed = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    exports.lamber = new THREE.MeshLambertMaterial();
    exports.phong = new THREE.MeshPhongMaterial();
    exports.lamberGrey = new THREE.MeshLambertMaterial({ color: 0xf0f0f0 });
});