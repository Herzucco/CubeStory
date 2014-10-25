define(["require", "exports", './Scenes/SceneController', './Scenes/LifeInSolo', './Scenes/BirthScene', './Scenes/Death', './Scenes/LifeTogetherScene', './Scenes/Love', './Scenes/MainScene', './Scenes/test'], function (require, exports, sceneController, lifeSolo, birth, death, lifeTogether, l, main, t) {
    function Start() {
        //sceneController.instance.birthScene = new birthScene.BirthScene();
        var mainScene = new main.MainScene();
        var birthScene = new birth.BirthScene();
        var lifeInSolo = new lifeSolo.LifeInSolo();
        var love = new l.Love();
        var lifeTogetherScene = new lifeTogether.LifeTogetherScene();
        var deathscene = new death.Death();
        var test = new t.test();
        render(0);
        var lastTimeMsec = null;
        function render(nowMsec) {
            lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
            var deltaMsec = Math.min(200, nowMsec - lastTimeMsec) / 1000;
            lastTimeMsec = nowMsec;
            requestAnimationFrame(function (nowMsec) {
                render(nowMsec);
            });
            sceneController.instance.update(deltaMsec);
        }
        var audio = document.getElementById('audio');
        audio.play();
    }
    exports.Start = Start;
});