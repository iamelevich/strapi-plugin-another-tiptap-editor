import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from '../../common/pluginId';
import Initializer from './components/Initializer';
import getTrad from './utils/get-trad';
import Wysiwyg from "./components/Wysiwyg";

const name = pluginPkg.strapi.name;

export default {
  register(app) {

    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          id: getTrad('settings.section-label'),
          defaultMessage: 'Another Tiptap Editor plugin',
        },
      },
      [
        {
          intlLabel: {
            id: getTrad('settings.label'),
            defaultMessage: 'Settings',
          },
          id: 'settings',
          to: `/settings/${pluginId}/settings`,
          async Component() {
            const component = await import(
              /* webpackChunkName: "users-roles-settings-page" */ './pages/Settings'
            );

            return component;
          }
        },
      ]
    );

    app.addFields({ type: 'wysiwyg', Component: Wysiwyg });

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app) {},
  async registerTrads(app) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
