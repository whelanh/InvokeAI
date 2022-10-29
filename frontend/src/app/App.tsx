import { useEffect, useState } from 'react';
import ProgressBar from '../features/system/ProgressBar';
import SiteHeader from '../features/system/SiteHeader';
import Console from '../features/system/Console';
import Loading from '../Loading';
import { useAppDispatch } from './store';
import { requestSystemConfig } from './socketio/actions';
import { keepGUIAlive } from './utils';
import InvokeTabs from '../features/tabs/InvokeTabs';
import ImageUploader from '../common/components/ImageUploader';

keepGUIAlive();

const App = () => {
  const dispatch = useAppDispatch();

  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    dispatch(requestSystemConfig());
    setIsReady(true);
  }, [dispatch]);

  return isReady ? (
    <div className="App">
      <ImageUploader>
        <ProgressBar />
        <div className="app-content">
          <SiteHeader />
          <InvokeTabs />
        </div>
        <div className="app-console">
          <Console />
        </div>
      </ImageUploader>
    </div>
  ) : (
    <Loading />
  );
};

export default App;
