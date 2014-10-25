define(["require", "exports", './SceneController'], function (require, exports, sceneController) {
    var MainScene = (function () {
        function MainScene() {
            sceneController.instance.mainScene = this;
            this.canvas = document.createElement('canvas');
            document.body.appendChild(this.canvas);
            this.canvas.width = 3000;
            this.canvas.height = 3000;
            this.canvas.style.display = 'none';
            this.context = this.canvas.getContext('2d');
            this.context.msImageSmoothingEnabled = false;
        }
        MainScene.prototype.update = function (deltaTime) {
            var i = 0;
            for (i = 0; i < sceneController.instance.scenes.length; i++) {
                if (sceneController.instance.scenes[i].enabled) {
                    sceneController.instance.scenes[i].update(deltaTime);
                    sceneController.instance.scenes[i].render();
                }
                this.context.strokeStyle = 'white';
                this.context.beginPath();
                this.context.moveTo(sceneController.instance.scenes[i].x + 250, sceneController.instance.scenes[i].y + 250);
                if (i < sceneController.instance.scenes.length - 2) {
                    this.context.bezierCurveTo(sceneController.instance.scenes[i + 1].x - 100, sceneController.instance.scenes[i + 1].y - 100, sceneController.instance.scenes[i + 1].x, sceneController.instance.scenes[i + 1].y, sceneController.instance.scenes[i + 1].x + 250, sceneController.instance.scenes[i + 1].y + 250);
                    this.context.lineWidth = 10;
                    this.context.stroke();
                }
                this.context.drawImage(sceneController.instance.scenes[i].renderer.context.canvas, sceneController.instance.scenes[i].x, sceneController.instance.scenes[i].y, 500, 500);
            }
        };
        return MainScene;
    })();
    exports.MainScene = MainScene;
});