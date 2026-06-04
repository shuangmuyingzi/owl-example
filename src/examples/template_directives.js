import { Component, useState, xml } from '@odoo/owl';

export class TemplateDirectivesExample extends Component {
  static title = '模板指令';
  static summary = '学习 t-if/t-elif/t-else、t-foreach、t-key、t-set、t-att、t-esc/t-out。';
  static code = `<t t-if="state.mode === 'ready'">Ready</t>
<t t-elif="state.mode === 'loading'">Loading</t>
<t t-else="">Empty</t>

<li t-foreach="state.todos" t-as="todo" t-key="todo.id">
  <t t-esc="todo.label"/>
</li>

<button t-att-class="{ active: todo.done }">动态 class</button>`;

  static template = xml`
    <section class="example">
      <h2>模板指令</h2>
      <div class="toolbar">
        <button t-on-click="cycleMode">切换状态</button>
        <button t-on-click="toggleHighlight">切换动态 class</button>
      </div>

      <div class="notice" t-att-class="{ notice: true, strong: state.highlight }">
        <t t-if="state.mode === 'ready'">t-if：现在是 ready</t>
        <t t-elif="state.mode === 'loading'">t-elif：现在是 loading</t>
        <t t-else="">t-else：现在是 empty</t>
      </div>

      <t t-set="completed" t-value="state.todos.filter((todo) => todo.done).length"/>
      <p>
        t-set 临时变量：已完成 <strong><t t-esc="completed"/></strong> /
        <t t-esc="state.todos.length"/>
      </p>

      <ul class="list">
        <li t-foreach="state.todos" t-as="todo" t-key="todo.id" t-att-class="{ done: todo.done }">
          <label t-att-title="todo.done ? '点击改为未完成' : '点击改为完成'">
            <input type="checkbox" t-att-checked="todo.done" t-on-change="() => this.toggleTodo(todo.id)"/>
            <span><t t-esc="todo.label"/></span>
          </label>
        </li>
      </ul>
      <p>
        <code>t-esc</code> 会转义：
        <span t-esc="state.htmlText"/>
      </p>
      <p>
        <code>t-out</code> 输出普通字符串也会转义：
        <span t-out="state.htmlText"/>
      </p>
    </section>
  `;

  state = useState({
    mode: 'ready',
    highlight: false,
    htmlText: '<strong>不会当成 HTML 执行</strong>',
    todos: [
      { id: 1, label: 't-if / t-elif / t-else', done: true },
      { id: 2, label: 't-foreach 必须配 t-key', done: false },
      { id: 3, label: 't-att-class / t-att-title', done: false },
    ],
  });

  cycleMode() {
    const modes = ['ready', 'loading', 'empty'];
    const index = modes.indexOf(this.state.mode);
    this.state.mode = modes[(index + 1) % modes.length];
  }

  toggleHighlight() {
    this.state.highlight = !this.state.highlight;
  }

  toggleTodo(id) {
    const todo = this.state.todos.find((item) => item.id === id);
    todo.done = !todo.done;
  }
}
