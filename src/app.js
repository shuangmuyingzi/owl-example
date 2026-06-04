import { Component, useState, xml } from '@odoo/owl';
import { examples } from './examples';

export class App extends Component {
  static template = xml`
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <span>OWL</span>
          <strong>语法实验台</strong>
        </div>
        <nav>
          <button
            t-foreach="examples"
            t-as="example"
            t-key="example.id"
            t-att-class="{ active: state.current === example.id }"
            t-on-click="() => this.select(example.id)"
          >
            <span><t t-esc="example.component.title"/></span>
            <small><t t-esc="example.component.summary"/></small>
          </button>
        </nav>
      </aside>

      <main class="content">
        <header class="content-header">
          <div>
            <h1><t t-esc="currentExample.component.title"/></h1>
            <p><t t-esc="currentExample.component.summary"/></p>
          </div>
          <a
            href="https://odoo.github.io/owl/documentation/v3/owl/reference/event_handling.html"
            target="_blank"
            rel="noreferrer"
          >
            事件处理文档
          </a>
        </header>

        <div class="workbench">
          <section class="preview-panel">
            <t t-component="currentExample.component"/>
          </section>
          <section class="code-panel">
            <h2>对应代码</h2>
            <pre><code><t t-esc="currentExample.component.code"/></code></pre>
          </section>
        </div>
      </main>
    </div>
  `;

  setup() {
    this.examples = examples;
    this.state = useState({
      current: examples[0].id,
    });
  }

  get currentExample() {
    return this.examples.find((example) => example.id === this.state.current) || this.examples[0];
  }

  select(id) {
    this.state.current = id;
  }
}
