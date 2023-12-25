import { renderAdverts } from './render-adverts.js';
import { inactivateForm, inactivateFilters, activateForm, activateFilters } from './form.js';
import { renderFormValidate } from './validate-form.js';

renderAdverts();

inactivateForm();
inactivateFilters();
activateForm();
activateFilters();

renderFormValidate();
