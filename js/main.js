import { renderAdverts } from './get-adverts/render-adverts.js';
import { activateForm, activateFilters, inactivateForm, inactivateFilters } from './form/set-form.js';

renderAdverts();

inactivateForm();
inactivateFilters();
activateForm();
activateFilters();

// renderFormValidate();
