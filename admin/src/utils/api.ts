import { request } from '@strapi/helper-plugin';
import { PluginSettings } from '../../../common/settings';
import pluginId from '../../../common/pluginId';

export async function getSettings(): Promise<PluginSettings> {
  return request(`/${pluginId}/invalid`);
}

export async function updateSettings(settings: PluginSettings): Promise<{ success: true }> {
  return request(`/${pluginId}/update-settings`, {
    method: 'PUT',
    body: settings,
  });
}
