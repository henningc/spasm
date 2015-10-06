import {createRoute, getPage, getURL, toURLString} from './router';
import {EventEmitter} from 'events';

function getData(page, currentData) {
  const res = page.getData && page.getData(currentData);
  if (res && res.then) {
    return res;
  } else {
    return new Promise((resolve, reject) => resolve(res));
  }
}

function prep(page, data) {
  return page.prepareData ? page.prepareData(data) : data;
}

export function createApp({render, state, finalizeData}) {
  const events = new EventEmitter();
  const routes = [];
  const bus = new EventEmitter();
  const pages = {};
  let currentData = {state: state || {}}, currentPage;
  finalizeData = finalizeData || (d => d);

  function renderApp() {
    const data = finalizeData(
      prep(currentPage, currentData),
      currentData.location,
      currentData.state
    );
    if (data.title) {
      document.title = data.title;
    }
    render(currentPage.render, data);
    return data;
  }

  function renderPage(page) {
    return getData(page, currentData).
      then(pageData => {
        currentData.pageData = pageData;
        currentPage = page;
        return renderApp();
      }).
      catch(e => setTimeout(() => { throw e; }));
  }

  function updateState(state) {
    if (typeof state === 'function') {
      state = state(currentData.state);
    }

    Object.keys(state).forEach(k => {
      if (state[k] === null) {
        delete currentData.state[k];
      } else {
        currentData.state[k] = state[k];
      }
    });

    events.emit('updateState', currentData.state);
  }

  function loadURL(url, state = {}) {
    updateState(state);
    const res = getPage(routes, url);
    currentData.location = res;
    return renderPage(pages[res.page] || pages[404]);
  }

  function triggerAction(action, ...callTimeArgs) {
    if (!action) {
      return;
    }

    const [actionName, ...actionArgs] = action;
    const args = actionArgs.concat(callTimeArgs);
    const listeners = bus.listeners(actionName);
    if (listeners.length === 0) {
      throw new Error(`Tried to trigger action ${actionName} (${args}), which has no handlers`);
    }
    return Promise.all(listeners.map(listener => listener(...args)));
  }

  function refresh(state = {}) {
    updateState(state);
    return renderPage(currentPage);
  }

  function getCurrentURL() {
    return toURLString(currentData.location);
  }

  function updateStateAndRender(state) {
    updateState(state);
    if (currentPage) {
      renderApp();
    }
  }

  const flashSchedule = {};

  return {
    loadURL,
    triggerAction,
    refresh,
    getCurrentURL,

    on: events.on.bind(events),
    off: events.removeListener.bind(events),

    getURL(...args) {
      return getURL(routes, ...args);
    },

    addAction(event, handler) {
      bus.on(event, (...data) => handler(...data, currentData));
    },

    performAction(action) {
      return function (e) {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
        triggerAction(action, e && e.nativeEvent || e);
      };
    },

    addPage(name, route, page) {
      routes.push(createRoute(name, route));
      pages[name] = page;
    },

    start() {
      window.onpopstate = function () {
        loadURL(location.href);
      };

      return loadURL(location.href);
    },

    gotoURL(url, state = {}) {
      history.pushState({}, '', url);
      return loadURL(url, state);
    },

    updateQueryParams(params) {
      if (!currentPage) {
        throw new Error('Cannot update query params before a page is loaded');
      }
      Object.keys(params).forEach(k => currentData.location.query[k] = params[k]);
      history.pushState({}, '', getCurrentURL());
      return refresh();
    },

    updateState: updateStateAndRender,

    flashState(state, ttl = 5000) {
      updateState(state);
      const t = new Date().getTime() + ttl;
      Object.keys(state).forEach(k => flashSchedule[k] = t);

      setTimeout(function () {
        const now = new Date().getTime();
        updateStateAndRender(Object.keys(flashSchedule).reduce((state, key) => {
          if (flashSchedule[key] <= now) {
            state[key] = null;
            delete flashSchedule[key];
          }
          return state;
        }, {}));
      }, ttl);
    }
  };
}