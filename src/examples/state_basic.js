import { Component, useState, xml } from '@odoo/owl';

export class StateBasicExample extends Component {
  static title = '状态 useState';
  static summary = '学习响应式状态、计算 getter、数组增删改。';
  static code = `import { Component, useState, xml } from '@odoo/owl';

export class Counter extends Component {
  static template = xml\`
    <button t-on-click="increment">
      Count: <t t-esc="state.count"/>
    </button>
  \`;

  state = useState({ count: 0 });

  increment() {
    this.state.count++;
  }
}`;

  static template = xml`
    <section class="example">
      <h2>状态 useState</h2>
      <p>点击按钮会修改响应式对象，模板会自动重新渲染。</p>
      <div class="toolbar">
        <button t-on-click="increment">+1</button>
        <button t-on-click="decrement">-1</button>
        <button t-on-click="addItem">添加列表项</button>
      </div>
      <div class="metric">
        <span>count</span>
        <strong><t t-esc="state.count"/></strong>
        <span t-esc="parity"/>
      </div>
      <ul class="list">
        <li t-foreach="state.items" t-as="item" t-key="item.id">
          <span><t t-esc="item.label"/></span>
          <button t-on-click="() => this.removeItem(item.id)">删除</button>
        </li>
      </ul>
    </section>
  `;

  state = useState({
    count: 1,
    nextId: 3,
    items: [
      { id: 1, label: '第一个响应式列表项' },
      { id: 2, label: '数组 push/remove 也会更新视图' },
    ],
  });

  get parity() {
    return this.state.count % 2 === 0 ? '偶数' : '奇数';
  }

  increment() {
    this.state.count++;
  }

  decrement() {
    this.state.count--;
  }

  addItem() {
    const id = this.state.nextId++;
    this.state.items.push({ id, label: `新项目 ${id}` });
  }

  removeItem(id) {
    this.state.items = this.state.items.filter((item) => item.id !== id);
  }
}
