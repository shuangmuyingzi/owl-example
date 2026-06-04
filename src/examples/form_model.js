import { Component, useState, xml } from '@odoo/owl';

export class FormModelExample extends Component {
  static title = '表单 t-model';
  static summary = '学习 input、checkbox、radio、select、textarea 与 .trim/.number/.lazy。';
  static code = `<input t-model.trim="state.name"/>
<input type="number" t-model.number="state.age"/>
<input type="checkbox" t-model="state.enabled"/>
<select t-model="state.role">...</select>`;

  static template = xml`
    <section class="example">
      <h2>表单 t-model</h2>
      <div class="form-grid">
        <label>
          名字 .trim
          <input t-model.trim="state.name"/>
        </label>
        <label>
          年龄 .number
          <input type="number" t-model.number="state.age"/>
        </label>
        <label class="check">
          <input type="checkbox" t-model="state.enabled"/>
          启用 checkbox
        </label>
        <label>
          角色 select
          <select t-model="state.role">
            <option value="developer">developer</option>
            <option value="designer">designer</option>
            <option value="tester">tester</option>
          </select>
        </label>
        <fieldset>
          <legend>等级 radio</legend>
          <label><input type="radio" value="junior" t-model="state.level"/> junior</label>
          <label><input type="radio" value="senior" t-model="state.level"/> senior</label>
        </fieldset>
        <label>
          备注 textarea .lazy
          <textarea t-model.lazy="state.note"/>
        </label>
      </div>
      <pre class="state-preview"><t t-esc="stateJson"/></pre>
    </section>
  `;

  state = useState({
    name: 'Owl learner',
    age: 18,
    enabled: true,
    role: 'developer',
    level: 'junior',
    note: 'textarea 失焦或 change 时更新',
  });

  get stateJson() {
    return JSON.stringify(this.state, null, 2);
  }
}
