import TabBar from './components/TabBar.js';
import Content from './components/Content.js';
import { request } from './components/api.js';

export default function App($app) {
  this.state = {
    currentTab: 'all',
    photos: [],
  };

  const tabBar = new TabBar({
    $app,
    initialState: this.state.currentTab,
    onClick: async (name) => {
      this.setState({
        ...this.state,
        currentTab: name,
        photos: await request(name === 'all' ? '' : name),
      });
    },
  });
  const content = new Content({ $app, initialData: this.state.photos });

  this.setState = (newState) => {
    this.state = newState;
    tabBar.setState(this.state.currentTab);
    content.setState(this.state.photos);
  };

  const init = async () => {
    try {
      const initialData = await request();
      this.setState({
        ...this.state,
        photos: initialData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  init();
}
