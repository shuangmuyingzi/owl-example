import { ComponentsSlotsExample } from './components_slots';
import { EnvBusExample } from './env_bus';
import { EventHandlingExample } from './event_handling';
import { FormModelExample } from './form_model';
import { LifecycleRefsExample } from './lifecycle_refs';
import { MarkupOutputExample } from './markup_output';
import { StateBasicExample } from './state_basic';
import { TemplateDirectivesExample } from './template_directives';

export const examples = [
  { id: 'state', component: StateBasicExample },
  { id: 'events', component: EventHandlingExample },
  { id: 'directives', component: TemplateDirectivesExample },
  { id: 'forms', component: FormModelExample },
  { id: 'components', component: ComponentsSlotsExample },
  { id: 'lifecycle', component: LifecycleRefsExample },
  { id: 'env-bus', component: EnvBusExample },
  { id: 'markup', component: MarkupOutputExample },
];
