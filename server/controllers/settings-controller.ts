import type { Strapi } from '@strapi/strapi';
import pluginId from '../../common/pluginId';
import { defaultSettings, PluginSettings } from '../../common/settings';

export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    const savedSettings: PluginSettings | null = await strapi
      .store({ type: 'plugin', name: pluginId, key: 'settings' })
      .get();
    ctx.send({
      ...defaultSettings,
      ...(savedSettings || {}),
    });
  },
  async updateSettings(ctx) {
    const newSettings: PluginSettings = ctx.request.body;
    await strapi.store({ type: 'plugin', name: pluginId, key: 'settings' }).set({
      value: {
        ...defaultSettings,
        ...newSettings,
      },
    });
    ctx.send({ success: true });
  },
});
