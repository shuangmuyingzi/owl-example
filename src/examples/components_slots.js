import { Component, useState, xml } from '@odoo/owl';

class LearningCard extends Component {
  static template = xml`
    <article class="learning-card">
      <header>
        <h3><t t-esc="props.title"/></h3>
        <small><t t-esc="props.badge"/></small>
      </header>
      <div class="card-body">
        <t t-slot="default"/>
      </div>
      <footer>
        <t t-slot="actions">
          <span>没有传 actions 插槽时显示默认内容</span>
        </t>
      </footer>
    </article>
  `;
}

export class ComponentsSlotsExample extends Component {
  static title = '组件 Props 和 Slots';
  static summary = '学习子组件、props、默认 slot、命名 slot、组件事件。';
  static components = { LearningCard };
  static code = `class LearningCard extends Component {
  static template = xml\`
    <article>
      <h3><t t-esc="props.title"/></h3>
      <t t-slot="default"/>
      <t t-slot="actions">默认 actions</t>
    </article>
  \`;
}

<LearningCard title="'Props 标题'">
  <p>默认插槽内容</p>
  <t t-set-slot="actions">命名插槽内容</t>
</LearningCard>`;

  static template = xml`
    <section class="example">
      <h2>组件 Props 和 Slots</h2>
      <LearningCard title="'父组件传给子组件的 title'" badge="state.badge">
        <p>
          这是默认 slot。父组件可以把一段模板内容塞进子组件内部。
        </p>
        <t t-set-slot="actions">
          <button t-on-click="renameBadge">更新传入的 props</button>
        </t>
      </LearningCard>

      <LearningCard title="'只有默认插槽的卡片'" badge="'fallback'">
        <p>这个组件没有传 actions slot，所以 footer 会展示默认内容。</p>
      </LearningCard>
    </section>
  `;

  state = useState({
    badge: 'props: live',
    count: 1,
  });

  renameBadge() {
    this.state.count++;
    this.state.badge = `props update ${this.state.count}`;
  }
}
