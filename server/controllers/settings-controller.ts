import type { Strapi } from '@strapi/strapi';
import type { Context } from 'koa';
import pluginId from '../../common/pluginId';
import { defaultSettings, PluginSettings } from '../../common/settings';

export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx: Context) {
    const savedSettings: PluginSettings | null = await strapi
      .store({ type: 'plugin', name: pluginId, key: 'settings' })
      .get();
    if (savedSettings !== null) {
      ctx.send(savedSettings);
    } else {
      ctx.send(defaultSettings);
    }
  },
  async updateSettings(ctx: Context) {
    const newSettings: PluginSettings = ctx.request.body;
    await strapi
      .store({ type: 'plugin', name: pluginId, key: 'settings' })
      .set({ value: newSettings });
    ctx.send({ success: true });
  },
});
