import { Composite, Engine, Render, Runner } from "matter-js";
import { Component } from "react";

class MatterEngine {
  /**
   * TODO : 画面幅をここで設定するとほかで使いづらいのでどうにかしたい
   */
  DisplayWidth = 800;
  DisplayHeight = 600;
  engine = null;
  render = null;
  constructor() {
    this.engine = Engine.create();
  }

  /**
   * @method セットアップ
   * @param {string} 表示する要素のクラス名
   * @description 表示する要素のクラス名を指定して、表示設定を行う
   */
  setup(elementName) {
    this.render = Render.create({
      element: document.body.querySelector(elementName),
      engine: this.engine,
      options: {
        width: this.DisplayWidth,
        height: this.DisplayHeight,
        wireframes: false,
      },
    });
    Render.run(this.render);
  }

  /**
   * @method 実行
   * @description 登録したオブジェクトの実行
   */
  run() {
    Runner.run(Runner.create(), this.engine);
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
          Composite.add(this.engine.world, item.getObject());
          return
        }
        Composite.add(this.engine.world, item);
      });
      return;
    }

    if (typeof object.getObject === 'function') {
      Composite.add(this.engine.world, object.getObject());
      return;
    }
    Composite.add(this.engine.world, object);
  }

  /* ゲッター */
  getEngine() {
    return this.engine;
  }

  getRender() {
    return this.render;
  }

  setRendereMouse(mouse) {
    this.render.mouse = mouse;
  }
}

export default MatterEngine;
