import {
    _decorator,
    Component,
    Node,
    Prefab,
    instantiate,
    Label,
    assetManager,
    SpriteFrame,
    Texture2D,
    find,
    Sprite,
    AudioClip,
    AudioSource,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass('Game1_4')
export class Game1_4 extends Component {
    @property(Node)
    popupupload: Node = null;

    @property(SpriteFrame)
    disableSoundSprite: SpriteFrame = null;

    @property(SpriteFrame)
    enableSoundSprite: SpriteFrame = null;

    start() {

    }

    nodeupload = null; // node click upload
    uploadimg() {
        this.UploadFile(this.nodeupload);
    }

    //call từ bên item
    UploadFile(event) {
        var namenode = event.target.uuid;
        console.log(event.target.uuid);
        console.log(event.target);
        this.nodeSave = event.target;
        //   console.log("aaaaa",find("Canvas"))
        if (cc.sys.isBrowser) {
            let ipFile = document.createElement("input");
            ipFile.type = "file";
            ipFile.accept = "image/png/mp3";
            console.log("ipFile", ipFile);
            ipFile.click();
            ipFile.addEventListener(
                "change",
                () => {
                    var img = document.createElement("img");
                    var canvas = document.createElement("canvas");
                    var reader = new FileReader();
                    reader.onload = function (progressEvent) {
                        img.src = progressEvent.target.result;
                        img.onload = function () {
                            // access image size here
                            var ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0);

                            var MAX_WIDTH = 800;
                            var MAX_HEIGHT = 600;
                            var width = img.width;
                            var height = img.height;

                            if (width > height) {
                                if (width > MAX_WIDTH) {
                                    height *= MAX_WIDTH / width;
                                    width = MAX_WIDTH;
                                }
                            } else {
                                if (height > MAX_HEIGHT) {
                                    width *= MAX_HEIGHT / height;
                                    height = MAX_HEIGHT;
                                }
                            }
                            canvas.width = width;
                            canvas.height = height;
                            var ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0, width, height);
                            var dataUrl = canvas.toDataURL("image/png");
                            console.log("buffer", dataUrl);
                            dataUrl =
                                "data:application/octet-binary;base64," +
                                dataUrl.replace("data:image/png;base64,", "");
                            fetch(dataUrl)
                                .then((res) => res.arrayBuffer())
                                .then((buffer) => {
                                    console.log("buffer", buffer);
                                });
                        };
                    };
                    console.log("ipFile.files[0]", ipFile.files);
                    reader.readAsDataURL(ipFile.files[0]);
                    // call Api

                    var myHeaders = new Headers();
                    myHeaders.append(
                        "Cookie",
                        ".AspNetCore.Session=CfDJ8GmrYVI6VxlFp5hvVMclUtanrpD%2BHH0oRRUDw6oaMn3NwyayHlyo3pNzp%2BEoa5sTRFRu%2Fiycjkfhs3cCAhcMz%2FI7uzsM8IQhc14aMSSnuv8PAShbhhpB538WNIJQxIwHCpD%2BNRNl1pW04TW%2FgN9%2BD%2BQcZFNbTHkI7U%2BOu4E7BK59"
                    );

                    var formdata = new FormData();
                    formdata.append("Item", ipFile.files[0], ipFile.files[0].name);
                    formdata.append("ClassItem", namenode);

                    var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: formdata,
                        redirect: "follow",
                    };

                    fetch("http://localhost:64457/Api/UploadFile", requestOptions)
                        .then((response) => response.text())
                        .then((result) => {
                            console.log(result);
                            let classItem = JSON.parse(result).classItem;
                            let url = JSON.parse(result).url;
                            //   console.log(this.nodeSave.uuid);

                            this.setImage(url);
                            this.popupupload.active = false;
                        })
                        .catch((error) => console.log("error", error));
                },
                false
            );
        }
        this.popupupload.active = false;
    }


    public OpenpopupUpload(node) {
        this.popupupload.active = true;

        // this.popupupload.setSiblingIndex(100000);
        const newLocal = this;
        newLocal.nodeupload = node;
        console.log("nodeupload =>", this.nodeupload);
        // if (this.nodeupload.name != "question") {
        //   this.button_tpnl.active = false;
        // }
        // if (this.nodeupload.name == "question") {
        //   if (
        //     this.nodeupload.parent.getChildByName("iditem").getComponent(Label)
        //       .string != "00000000-0000-0000-0000-000000000000"
        //   ) {
        //     this.button_tpnl.active = true;
        //   } else {
        //     this.button_tpnl.active = false;
        //   }
    }

    public ClosepopupUpload() {
        this.popupupload.active = false;
    }


    nodeSave: Node = null;
    setImage(remoteUrl) {
        var typefile = remoteUrl.substr(remoteUrl.length - 3);
        console.warn("typefile=>", typefile);
        if (typefile == "png" || typefile == "jpg") {
            assetManager.loadRemote(remoteUrl, (err, imageAsset) => {
                var spr = find("Img", this.nodeSave);
                console.log(spr);
                console.log(spr.getComponent(Sprite));
                console.log("spriteFrame", spr.getComponent(Sprite).spriteFrame);
                console.log("spriteFrame", imageAsset);
                const spriteFrame = new SpriteFrame();
                const tex = new Texture2D();
                tex.image = imageAsset;
                spriteFrame.texture = tex;
                spr.getComponent(Sprite).spriteFrame = spriteFrame;
            });

            var textlabel = find("Img/Label", this.nodeSave);
            textlabel.getComponent(Label).string = remoteUrl;
            console.log("remoteUrl", remoteUrl);
            
        }
        if (typefile == "mp3") {
            var textlabel = find("Sound/Label_sound", this.nodeSave);
            textlabel.getComponent(Label).string = remoteUrl;
            find("Sound", this.nodeSave).getComponent(Sprite).spriteFrame =
                this.enableSoundSprite;
        }
    
    }

    playSound(event, id) {
        console.log(id);
        console.log(
            event.target.getChildByName("Label_sound").getComponent(Label).string
        );
        var url = event.target
            .getChildByName("Label_sound")
            .getComponent(Label).string;
        assetManager.loadRemote(url, (err, audioClip: AudioClip) => {
            // this.node.getComponent(cc.AudioSource).clip.clear();
            this.node.getComponent(AudioSource).clip = audioClip;
            this.node.getComponent(AudioSource).play();
        });
    }
}

