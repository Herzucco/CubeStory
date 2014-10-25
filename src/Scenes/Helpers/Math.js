define(["require", "exports"], function (require, exports) {
    function lerp(value1, value2, step) {
        return ((value2 - value1) * step) + value1;
    }
    exports.lerp = lerp;
    function Vector3Lerp(vector1, vector2, step) {
        return new THREE.Vector3(lerp(vector1.x, vector2.x, step), lerp(vector1.y, vector2.y, step), lerp(vector1.z, vector2.z, step));
    }
    exports.Vector3Lerp = Vector3Lerp;
    function AddToAbs(nb1, nb2) {
        var signe = nb1 / Math.abs(nb1);
        return (Math.abs(nb1) + nb2) * signe;
    }
    exports.AddToAbs = AddToAbs;
});