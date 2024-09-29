import TabBar from './components/TabBar.js';
import Content from './components/Content.js';
import { request } from './components/api.js';

export default function App($app) {
  // State
  this.state = {
    currentTab: window.location.pathname.replace('/', '') || 'all',
    photos: [],
  };

  // Tab Component
  const tabBar = new TabBar({
    $app,
    initialState: this.state.currentTab,
    onClick: async (name) => {
      history.pushState(null, null, `/${name}`);
      this.updateContent(name);
    },
  });

  // Content Component
  const content = new Content({ $app, initialData: this.state.photos });

  // setState
  this.setState = (newState) => {
    this.state = newState;
    tabBar.setState(this.state.currentTab);
    content.setState(this.state.photos);
  };

  // update
  this.updateContent = async (tabName) => {
    const name = tabName === 'all' ? '' : tabName;
    const photos = await request(name);

    this.setState({
      ...this.state,
      currentTab: tabName,
      photos: photos,
    });
  };

  window.addEventListener('popstate', () => {
    const tabName = window.location.pathname.replace('/', '') || 'all';
    this.updateContent(tabName);
  });

  const init = async () => {
    this.updateContent(this.state.currentTab);
  };

  init();
}
