import {
  Component,
  EventBus,
  useEnv,
  useExternalListener,
  useState,
  useSubEnv,
  xml,
} from '@odoo/owl';

const bus = new EventBus();

class EnvReader extends Component {
  static template = xml`
    <div class="notice">
      子组件读取 env：theme=<strong><t t-esc="env.theme"/></strong>,
      course=<strong><t t-esc="env.course"/></strong>
    </div>
  `;

  setup() {
    this.env = useEnv();
  }
}

class BusReader extends Component {
  static template = xml`
    <div>
      <button t-on-click="send">通过 EventBus 发消息</button>
      <ul class="log">
        <li t-foreach="state.logs" t-as="log" t-key="log.id">
          <t t-esc="log.text"/>
        </li>
      </ul>
    </div>
  `;

  setup() {
    this.state = useState({ nextId: 1, logs: [] });
    useExternalListener(bus, 'lesson:ping', (ev) => {
      this.state.logs.unshift({
        id: this.state.nextId++,
        text: `收到事件：${ev.detail.message}`,
      });
      this.state.logs = this.state.logs.slice(0, 5);
    });
  }

  send() {
    bus.trigger('lesson:ping', { message: `hello ${this.state.nextId}` });
  }
}

export class EnvBusExample extends Component {
  static title = 'Env 和 EventBus';
  static summary = '学习 useSubEnv/useEnv 传上下文，以及 EventBus + useExternalListener。';
  static components = { EnvReader, BusReader };
  static code = `setup() {
  useSubEnv({ theme: 'light', course: 'OWL' });
}

const bus = new EventBus();
useExternalListener(bus, 'lesson:ping', (ev) => {
  console.log(ev.detail);
});`;

  static template = xml`
    <section class="example">
      <h2>Env 和 EventBus</h2>
      <EnvReader/>
      <BusReader/>
    </section>
  `;

  setup() {
    useSubEnv({
      theme: 'light',
      course: 'OWL syntax lab',
    });
  }
}
