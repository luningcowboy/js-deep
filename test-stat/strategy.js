/** 策略
 * let stra = new Strategy([
 * {
 *     tag: '唯一标识',
 *     strategy: [function],
 *     execute: function
 *     }
 * ]);
 * stra.add({
 *  tag: '',
 *  strategys: [function/build=>return Function.apply(target, params)],
 *  execute: function/cmd(与事件分发器或命令模式结合)
 * });
 * stra.del(tag)
 *
 * 策略主循环
 * stra.update();
 *
 */
