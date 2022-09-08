import type { Strapi } from '@strapi/strapi';
import pluginId from '../../common/pluginId';
import { defaultSettings, PluginSettings } from '../../common/settings';

export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    const savedSettings: PluginSettings | null = await strapi
      .store({ type: 'plugin', name: pluginId, key: 'settings' })
      .get();
    if (savedSettings !== null) {
      ctx.send(savedSettings);
    } else {
      ctx.send(defaultSettings);
    }
  },
  async updateSettings(ctx) {
    const newSettings: PluginSettings = ctx.request.body;
    await strapi
      .store({ type: 'plugin', name: pluginId, key: 'settings' })
      .set({ value: newSettings });
    ctx.send({ success: true });
  },
});
