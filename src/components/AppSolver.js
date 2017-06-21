

import strings from './../strings';
import contextService from './../service/context';
/* eslint-disable */
export default function (resolve) {
  function setApplicationStyle(app) {
    require(`./../styles/applications/${app.shortName}.css`);
    /* eslint-enable */
  }

  let error;

  contextService.get().then((response) => {
    if (response.data.app) {
      Object.assign(strings, response.data);
      setApplicationStyle(response.data.app);
      contextService.set(response.data.app);
    }
  }).catch(() => {
    error = true;
  }).finally(() => {
    resolve({
      name: 'app-solver',
      render: mount => mount(),
      mounted() {
        if (error) {
          this.$emit('error');
        }
        this.$emit('resolved', contextService.getStored());
        this.$emit('updateHead');
      },
    });
  });
}
