import {
  Component,
  onMounted,
  onPatched,
  onWillUnmount,
  useEffect,
  useRef,
  useState,
  xml,
} from '@odoo/owl';

export class LifecycleRefsExample extends Component {
  static title = '生命周期和 Ref';
  static summary = '学习 setup、t-ref、useRef、onMounted、onPatched、onWillUnmount、useEffect。';
  static code = `setup() {
  this.inputRef = useRef('nameInput');
  this.state = useState({ name: 'Owl' });

  onMounted(() => this.inputRef.el.focus());
  onPatched(() => console.log('DOM 已更新'));
  onWillUnmount(() => console.log('组件将卸载'));
}`;

  static template = xml`
    <section class="example">
      <h2>生命周期和 Ref</h2>
      <div class="toolbar">
        <button t-on-click="focusInput">聚焦输入框</button>
        <button t-on-click="rename">改名触发 patch/effect</button>
      </div>
      <label>
        t-ref 输入框
        <input t-ref="nameInput" t-model="state.name"/>
      </label>
      <div class="metric">
        <span>当前名字</span>
        <strong><t t-esc="state.name"/></strong>
      </div>
      <ul class="log">
        <li t-foreach="state.logs" t-as="log" t-key="log.id">
          <t t-esc="log.text"/>
        </li>
      </ul>
    </section>
  `;

  setup() {
    this.inputRef = useRef('nameInput');
    this.state = useState({
      name: 'Owl',
      nextId: 1,
      logs: [],
    });

    onMounted(() => {
      this.log('onMounted：组件挂载完成');
      this.focusInput();
    });

    onPatched(() => {
      this.log('onPatched：DOM 更新完成');
    });

    onWillUnmount(() => {
      console.log('LifecycleRefsExample will unmount');
    });

    useEffect(
      (name) => {
        this.log(`useEffect：name 变成 ${name}`);
      },
      () => [this.state.name]
    );
  }

  log(text) {
    this.state.logs.unshift({ id: this.state.nextId++, text });
    this.state.logs = this.state.logs.slice(0, 7);
  }

  focusInput() {
    if (this.inputRef.el) {
      this.inputRef.el.focus();
      this.log('useRef：已聚焦输入框');
    }
  }

  rename() {
    this.state.name = `Owl ${this.state.nextId}`;
  }
}
