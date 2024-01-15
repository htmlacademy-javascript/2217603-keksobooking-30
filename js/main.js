import { inactivateForm, inactivateFilters, activateFilters } from './form/set-form.js';
import { renderMap, setAdverts } from './map/render-map.js';
import { getData } from './api.js';
import { showDataError } from './util.js';

// Изначальные данные
const ADVERT_OBJECT_COUNT = 10;

inactivateForm();
inactivateFilters();

renderMap();

getData()
  .then((data) => {
    setAdverts(data.slice(0, ADVERT_OBJECT_COUNT));
  })
  .then(activateFilters)
  .catch(
    (err) => {
      showDataError(err.message);
    }
  );
