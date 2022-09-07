import packageJson from '../package.json';

const pluginId = packageJson.name.replace(/^@[^-,.][\w,-]+\/strapi-plugin-/i, '');

export default pluginId;
