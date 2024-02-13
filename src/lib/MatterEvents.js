import { Events } from "matter-js";

export class MatterEvents {
  constructor() {
    this.afterUpdateEvents = [];
    this.beforeUpdateEvents = [];
    this.afterRenderEvents = [];
    this.beforeRenderEvents = [];
    this.collisionActiveEvents = [];
    this.collisionEndEvents = [];
    this.collisionStartEvents = [];
  }

  /**
   * @method 更新後イベント登録
   * @param {function} event 登録したいイベント
   * @description 更新後イベントを登録する
   */
  registerAfterUpdateEvent(event) {
    this.afterUpdateEvents.push(event);
  }

  /**
   * @method 更新後イベント発火
   * @description 登録した更新後イベントを発火する
   * NOTE : 厳密には発火するのは更新後です。
   */
  onAfterUpdateEvent() {
    this.afterUpdateEvents.forEach((event) => {
      Events.on(this.engine, "afterUpdate", event);
    });
  }

  /**
   * @method 更新後イベント解除
   * @param {function} event 解除したいイベント
   * @description 登録した更新後イベントを解除する
   */
  offAfterUpdateEvent(event) {
    Events.off(this.engine, "afterUpdate", event);
  }

  /**
   * @method 更新後イベント全解除
   * @description 登録した更新後イベントを全て解除する
   */
  allOffAfterUpdateEvent() {
    Events.off(this.engine, "afterUpdate");
  }

  /**
   * @method 更新前イベント登録
   * @param {function} event 登録したいイベント
   * @description 更新前イベントを登録する
   */
  registerBeforeUpdateEvent(event) {
    this.beforeUpdateEvents.push(event);
  }

  /**
   * @method 更新前イベント発火
   * @description 登録した更新前イベントを発火する
   * NOTE : 厳密には発火するのは更新前です。
   */
  onBeforeUpdateEvent() {
    this.beforeUpdateEvents.forEach((event) => {
      Events.on(this.engine, "beforeUpdate", event);
    });
  }

  /**
   * @method 更新前イベント解除
   * @param {function} event 解除したいイベント
   * @description 登録した更新前イベントを解除する
   */
  offBeforeUpdateEvent(event) {
    Events.off(this.engine, "beforeUpdate", event);
  }

  /**
   * @method 更新前イベント全解除
   * @description 登録した更新前イベントを全て解除する
   */
  allOffBeforeUpdateEvent() {
    Events.off(this.engine, "beforeUpdate");
  }

  /**
   * @method 描画後イベント登録
   * @param {function} event 登録したいイベント
   * @description 描画後イベントを登録する
   */
  registerAfterRenderEvent(event) {
    this.afterRenderEvents.push(event);
  }

  /**
   * @method 描画後イベント発火
   * @description 登録した描画後イベントを発火する
   * NOTE : 厳密には発火するのは描画後です。
   */
  onAfterRenderEvent() {
    this.afterRenderEvents.forEach((event) => {
      Events.on(this.engine, "afterRender", event);
    });
  }

  /**
   * @method 描画後イベント解除
   * @param {function} event 解除したいイベント
   * @description 登録した描画後イベントを解除する
   */
  offAfterRenderEvent(event) {
    Events.off(this.engine, "afterRender", event);
  }

  /**
   * @method 描画後イベント全解除
   * @description 登録した描画後イベントを全て解除する
   */
  allOffAfterRenderEvent() {
    Events.off(this.engine, "afterRender");
  }

  /**
   * @method 描画前イベント登録
   * @param {function} event 登録したいイベント
   * @description 描画前イベントを登録する
   */
  registerBeforeRenderEvent(event) {
    this.beforeRenderEvents.push(event);
  }

  /**
   * @method 描画前イベント発火
   * @description 登録した描画前イベントを発火する
   * NOTE : 厳密には発火するのは描画前です。
   */
  onBeforeRenderEvent() {
    this.beforeRenderEvents.forEach((event) => {
      Events.on(this.engine, "beforeRender", event);
    });
  }

  /**
   * @method 描画前イベント解除
   * @param {function} event 解除したいイベント
   * @description 登録した描画前イベントを解除する
   */
  offBeforeRenderEvent(event) {
    Events.off(this.engine, "beforeRender", event);
  }

  /**
   * @method 描画前イベント全解除
   * @description 登録した描画前イベントを全て解除する
   */
  allOffBeforeRenderEvent() {
    Events.off(this.engine, "beforeRender");
  }

  /**
   * @method 衝突中イベント登録
   * @param {function} event 登録したいイベント
   * @description 衝突中イベントを登録する
   */
  registerCollisionActiveEvent(event) {
    this.collisionActiveEvents.push(event);
  }

  /**
   * @method 衝突中イベント発火
   * @description 登録した衝突中イベントを発火する
   * NOTE : 厳密には発火するのは衝突中です。
   */
  offCollisionActiveEvent(event) {
    Events.off(this.engine, "collisionActive", event);
  }

  /**
   * @method 衝突中イベント全解除
   * @description 登録した衝突中イベントを全て解除する
   */
  allOffCollisionActiveEvent() {
    Events.off(this.engine, "collisionActive");
  }

  /**
   * @method 衝突終了イベント登録
   * @param {function} event 登録したいイベント
   * @description 衝突終了イベントを登録する
   */
  registerCollisionEndEvent(event) {
    this.collisionEndEvents.push(event);
  }

  /**
   * @method 衝突終了イベント発火
   * @description 登録した衝突終了イベントを発火する
   * NOTE : 厳密には発火するのは衝突終了です。
   */
  onCollisionEndEvent() {
    this.collisionEndEvents.forEach((event) => {
      Events.on(this.engine, "collisionEnd", event);
    });
  }

  /**
   * @method 衝突終了イベント解除
   * @param {function} event 解除したいイベント
   * @description 登録した衝突終了イベントを解除する
   */
  offCollisionEndEvent(event) {
    Events.off(this.engine, "collisionEnd", event);
  }

  /**
   * @method 衝突終了イベント全解除
   * @description 登録した衝突終了イベントを全て解除する
   */
  allOffCollisionEndEvent() {
    Events.off(this.engine, "collisionEnd");
  }

  /**
   * @method 衝突開始イベント登録
   * @param {function} event 登録したいイベント
   * @description 衝突開始イベントを登録する
   */
  registerCollisionStartEvent(event) {
    this.collisionStartEvents.push(event);
  }

  /**
   * @method 衝突開始イベント発火
   * @description 登録した衝突開始イベントを発火する
   * NOTE : 厳密には発火するのは衝突開始です。
   */
  onCollisionStartEvent() {
    this.collisionStartEvents.forEach((event) => {
      Events.on(this.engine, "collisionStart", event);
    });
  }

  /**
   * @method 衝突開始イベント解除
   * @param {function} event 解除したいイベント
   * @description 登録した衝突開始イベントを解除する
   */
  offCollisionStartEvent(event) {
    Events.off(this.engine, "collisionStart", event);
  }

  /**
   * @method 衝突開始イベント全解除
   * @description 登録した衝突開始イベントを全て解除する
   */
  allOffCollisionStartEvent() {
    Events.off(this.engine, "collisionStart");
  }
}