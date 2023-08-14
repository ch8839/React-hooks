export class FadeInAnimation {
  public node: any
  public duration: number = 1000
  startTime: number = 1000
  frameId: number = 0
  stopFrameId: number = 0

  constructor(node: any) {
    this.node = node;
  }

  start(duration: number) {
    this.duration = duration;
    if (this.duration === 0) {
      // 立刻跳转到最后
      this.onProgress(1);
    } else {
      this.onProgress(0);
      // 开始动画
      this.startTime = performance.now(); // performance.now() 方法返回一个精确到毫秒的时间戳,如果需要比毫秒更高的精度，可以使用这个方法
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }

  onFrame() {
    const timePassed = performance.now() - this.startTime;
    const progress = Math.min(timePassed / this.duration, 1);
    this.onProgress(progress);
    if (progress < 1) {
      // 仍然有更多的帧要绘制
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }

  onProgress(progress: number) {
    this.node && (this.node.style.opacity = progress)
  }

  // stop() {
  //   cancelAnimationFrame(this.frameId);
  //   this.startTime = 0;
  //   this.frameId = 0;
  //   this.duration = 0;
  // }

  stop(duration?: number) {
    cancelAnimationFrame(this.frameId)
    this.onProgress(1);
    // 开始动画
    this.startTime = performance.now(); // performance.now() 方法返回一个精确到毫秒的时间戳,如果需要比毫秒更高的精度，可以使用这个方法
    this.stopFrameId = requestAnimationFrame(() => this.onReverseFrame());
  }

  onReverseFrame() {
    const timePassed = performance.now() - this.startTime;
    const progress = Math.max(1- timePassed / this.duration, 0);
    // console.log('>>>onReverseFrame', progress)
    this.onProgress(progress);
    if (progress > 0) {
      // 仍然有更多的帧要绘制
      this.stopFrameId = requestAnimationFrame(() => this.onReverseFrame());
    }
  }
}