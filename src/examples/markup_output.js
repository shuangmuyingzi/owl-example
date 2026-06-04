import { Component, markup, useState, xml } from '@odoo/owl';

export class MarkupOutputExample extends Component {
  static title = '安全输出 markup';
  static summary = '学习 t-esc、t-out 和 markup() 的差异。';
  static code = `import { markup } from '@odoo/owl';

state = useState({
  escaped: '<strong>普通字符串会被转义</strong>',
  trusted: markup('<strong>markup 会作为 HTML 输出</strong>'),
});`;

  static template = xml`
    <section class="example">
      <h2>安全输出 markup</h2>
      <div class="toolbar">
        <button t-on-click="toggleTrusted">切换可信 HTML</button>
      </div>
      <p>
        <code>t-esc</code>：
        <span t-esc="state.raw"/>
      </p>
      <p>
        <code>t-out</code> + 普通字符串：
        <span t-out="state.raw"/>
      </p>
      <p>
        <code>t-out</code> + <code>markup()</code>：
        <span t-out="trustedHtml"/>
      </p>
    </section>
  `;

  state = useState({
    raw: '<strong>普通字符串会被转义</strong>',
    trusted: true,
  });

  get trustedHtml() {
    const html = this.state.trusted
      ? '<strong class="trusted">可信 HTML 被渲染</strong>'
      : '<em class="trusted">也可以动态切换</em>';
    return markup(html);
  }

  toggleTrusted() {
    this.state.trusted = !this.state.trusted;
  }
}
