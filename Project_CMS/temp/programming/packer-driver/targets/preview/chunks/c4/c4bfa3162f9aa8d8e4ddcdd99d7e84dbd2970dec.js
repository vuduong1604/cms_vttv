System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, Label, assetManager, SpriteFrame, Texture2D, find, Sprite, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, Game1_4;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Label = _cc.Label;
      assetManager = _cc.assetManager;
      SpriteFrame = _cc.SpriteFrame;
      Texture2D = _cc.Texture2D;
      find = _cc.find;
      Sprite = _cc.Sprite;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "74593FNQWJDw5M1Vdgz37zw", "Game1-4", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Game1_4", Game1_4 = (_dec = ccclass('Game1_4'), _dec2 = property(Node), _dec3 = property(SpriteFrame), _dec4 = property(SpriteFrame), _dec(_class = (_class2 = class Game1_4 extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "popupupload", _descriptor, this);

          _initializerDefineProperty(this, "disableSoundSprite", _descriptor2, this);

          _initializerDefineProperty(this, "enableSoundSprite", _descriptor3, this);

          this.nodeupload = null;
        }

        start() {}

        // node click upload
        uploadimg() {
          this.UploadFile(this.nodeupload);
        } //call từ bên item


        UploadFile(node) {
          if (cc.sys.isBrowser) {
            var ipFile = document.createElement("input");
            ipFile.type = "file";
            ipFile.accept = "image/png/mp3";
            console.log("ipFile", ipFile);
            ipFile.click();
            ipFile.addEventListener("change", () => {
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
                  dataUrl = "data:application/octet-binary;base64," + dataUrl.replace("data:image/png;base64,", "");
                  fetch(dataUrl).then(res => res.arrayBuffer()).then(buffer => {
                    console.log("buffer", buffer);
                  });
                };
              };

              console.log("ipFile.files[0]", ipFile.files);
              reader.readAsDataURL(ipFile.files[0]); // call Api

              var myHeaders = new Headers();
              myHeaders.append("Cookie", ".AspNetCore.Session=CfDJ8GmrYVI6VxlFp5hvVMclUtanrpD%2BHH0oRRUDw6oaMn3NwyayHlyo3pNzp%2BEoa5sTRFRu%2Fiycjkfhs3cCAhcMz%2FI7uzsM8IQhc14aMSSnuv8PAShbhhpB538WNIJQxIwHCpD%2BNRNl1pW04TW%2FgN9%2BD%2BQcZFNbTHkI7U%2BOu4E7BK59");
              var formdata = new FormData();
              formdata.append("Item", ipFile.files[0], ipFile.files[0].name);
              formdata.append("ClassItem", node.name);
              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
              };
              fetch("https://dev-cms-teacher.consangtao.vn/Api/UploadFile", requestOptions).then(response => response.text()).then(result => {
                console.log(result);
                var classItem = JSON.parse(result).classItem;
                var url = JSON.parse(result).url;
                this.setImage(url, node);
              }).catch(error => console.log("error", error));
            }, false);
          }
        }

        OpenpopupUpload(node) {
          this.popupupload.active = true; // this.popupupload.setSiblingIndex(100000);
          // this.nodeupload = node;
          // console.log("nodeupload =>", this.nodeupload);
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

        ClosepopupUpload() {
          this.popupupload.active = false;
        }

        setImage(remoteUrl, node) {
          this.ClosepopupUpload();
          var typefile = remoteUrl.substr(remoteUrl.length - 3); // console.warn("typefile=>", typefile);

          if (typefile == "png" || typefile == "jpg") {
            assetManager.loadRemote(remoteUrl, (err, imageAsset) => {
              var spr = find("Ques", node);
              console.log(spr);
              var spriteFrame = new SpriteFrame();
              var tex = new Texture2D();
              tex.image = imageAsset;
              spriteFrame.texture = tex;
              spr.getComponent(Sprite).spriteFrame = spriteFrame;
            });
            var textlabel = find("Mask/Sprite/Label_sprite", node); // textlabel.getComponent(Label).string = remoteUrl;
          }

          if (typefile == "mp3") {
            var textlabel = find("sound/Label_sound", node);
            textlabel.getComponent(Label).string = remoteUrl;
            find("sound", node).getComponent(Sprite).spriteFrame = this.enableSoundSprite;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "popupupload", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "disableSoundSprite", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "enableSoundSprite", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c4bfa3162f9aa8d8e4ddcdd99d7e84dbd2970dec.js.map