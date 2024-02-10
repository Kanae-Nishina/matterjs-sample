import Matter from "matter-js";

class MatterEngine {
  DisplayWidth = 800;
  DisplayHeight = 600;
  matter = null;
  engine = null;
  runner = null;
  composite = null;
  render = null;
  constructor() {
    this.matter = Matter;
    this.engine = this.matter.Engine.create();
    this.runner = this.matter.Runner;
    this.composite = this.matter.Composite;
  }

  /**
   * @method セットアップ
   * @param {string} 表示する要素のクラス名
   * @description 表示する要素のクラス名を指定して、表示設定を行う
   */
  setup(elementName) {
    this.render = this.matter.Render.create({
      element: document.body.querySelector(elementName),
      engine: this.engine,
      options: {
        width: this.DisplayWidth,
        height: this.DisplayHeight,
        wireframes: false,
      },
    });
    this.matter.Render.run(this.render);
  }

  /**
   * @method 実行
   * @description 登録したオブジェクトの実行
   */
  run() {
    this.runner.run(this.runner.create(), this.engine);
  }

  /**
   * @method オブジェクト登録
   * @param {Bodies} object 登録したいオブジェクト
   * @description オブジェクトを登録する。配列も可能。
   */
  registerObject(object) {
    if (Array.isArray(object)) {
      object.forEach((item) => {
        if (typeof item.getObject === 'function') {
          this.composite.add(this.engine.world, item.getObject());
        } else {
          this.composite.add(this.engine.world, item);
        }
      });
    } else {
      if (typeof object.getObject === 'function') {
        this.composite.add(this.engine.world, object.getObject());
      } else {
        this.composite.add(this.engine.world, object);
      }
    }

  }

  /* ゲッター */
  getMatter() {
    return this.matter;
  }

  getEngine() {
    return this.engine;
  }

  getRender() {
    return this.render;
  }

  getComposite() {
    return this.composite;
  }
}

export default MatterEngine;
