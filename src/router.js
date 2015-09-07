import {assign, curry, find} from 'lodash';

function first(pred, coll) {
  for (let i = 0, l = coll.length; i < l; ++i) {
    const res = pred(coll[i]);
    if (res) {
      return res;
    }
  }
}

function formatURL(route, params) {
  if (!route) { return null; }
  return route.paramNames.reduce((url, param) => {
    return url.replace(':' + param, params[param]);
  }, route.route);
}

export const getURL = curry((routes, page, params) => {
  return formatURL(find(routes, r => r.page === page), params);
});

function val(v) {
  if (!v) {
    return true;
  }
  return /^-?\d+(\.\d+)?$/.test(v.trim()) ? parseFloat(v) : v;
}

function mapify(pairs = []) {
  return pairs.reduce((m, [k, v]) => assign(m, {[k]: val(v)}), {});
}

export function toURLString({query, path}) {
  const queryString = Object.keys(query).map(k => {
    if (query[k] === null || query[k] === undefined) {
      return null;
    }
    if (query[k] === true) {
      return k;
    }
    return `${k}=${query[k]}`;
  }).filter(p => p).join('&');
  return path + (queryString ? '?' + queryString : '');
};

export function match({regexp, page, paramNames}, url) {
  const [path, query] = url.split('?');
  const vals = path.match(regexp);
  if (!vals) { return null; }

  return {
    page,
    url,
    path: path.replace(/^(https?:\/\/[^\/]+)/, ''),
    params: mapify(vals.slice(1).map((v, idx) => [paramNames[idx], v])),
    query: mapify(query && query.split('&').map(kv => kv.split('=')))
  };
}

export const getPage = curry((routes, url) => {
  return first(route => match(route, url), routes) || {params: {}};
});

export function createRoutes(routes) {
  return routes.map(([page, route]) => {
    const paramNames = (route.match(/:[a-zA-Z0-9]+/g) || []).map(n => n.slice(1));
    return {
      page,
      paramNames,
      route: route,
      regexp: new RegExp(paramNames.reduce((page, param) => {
        return page.replace(':' + param, '([^/?]+)');
      }, route) + '$')
    };
  });
}