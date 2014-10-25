define(["require", "exports"], function (require, exports) {
    var SceneController = (function () {
        function SceneController() {
            this.scenes = [];
        }
        SceneController.prototype.update = function (deltaTime) {
            this.mainScene.update(deltaTime);
        };
        return SceneController;
    })();
    exports.SceneController = SceneController;
    exports.instance = new SceneController();
});
