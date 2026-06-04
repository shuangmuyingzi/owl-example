import { Component, useState, xml } from '@odoo/owl';

export class EventHandlingExample extends Component {
  static title = '事件处理 t-on';
  static summary = '学习 t-on-click、参数、事件对象和 stop/prevent/self 修饰符。';
  static code = `static template = xml\`
  <button t-on-click="increment">普通点击</button>
  <button t-on-click="() => this.add(5)">传参数</button>
  <form t-on-submit.prevent="save">阻止默认提交</form>
  <div t-on-click.self="selectPanel">只响应自身</div>
\`;`;

  static template = xml`
    <section class="example">
      <h2>事件处理 t-on</h2>
      <p>事件名写在 <code>t-on-事件名</code> 后面，表达式可以是方法名，也可以是箭头函数。</p>
      <div class="toolbar">
        <button t-on-click="addOne">普通点击 +1</button>
        <button t-on-click="() => this.addMany(5)">传参 +5</button>
        <button t-on-click="recordEvent">读取 event</button>
      </div>
      <form class="inline-form" t-on-submit.prevent="save">
        <input placeholder="submit.prevent 示例" t-model="state.draft"/>
        <button>提交但不刷新页面</button>
      </form>
      <div class="event-box" t-on-click.self="boxOnly">
        <span>点灰色区域触发 <code>.self</code></span>
        <button t-on-click.stop="childOnly">子按钮 stop</button>
      </div>
      <div class="metric">
        <span>total</span>
        <strong><t t-esc="state.total"/></strong>
      </div>
      <ul class="log">
        <li t-foreach="state.logs" t-as="log" t-key="log.id">
          <t t-esc="log.text"/>
        </li>
      </ul>
    </section>
  `;

  state = useState({
    total: 0,
    draft: '',
    nextLogId: 1,
    logs: [],
  });

  log(text) {
    this.state.logs.unshift({ id: this.state.nextLogId++, text });
    this.state.logs = this.state.logs.slice(0, 6);
  }

  addOne() {
    this.state.total++;
    this.log('普通点击：total + 1');
  }

  addMany(amount) {
    this.state.total += amount;
    this.log(`箭头函数传参：total + ${amount}`);
  }

  recordEvent(ev) {
    this.log(`事件对象：${ev.type} 来自 ${ev.currentTarget.tagName.toLowerCase()}`);
  }

  save() {
    this.log(`submit.prevent：保存 "${this.state.draft || '空内容'}"`);
    this.state.draft = '';
  }

  boxOnly() {
    this.log('.self：只点到容器自身才触发');
  }

  childOnly() {
    this.log('.stop：子按钮触发后阻止冒泡');
  }
}
