import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';

import MainPage from '../components/MainPage'
import LandingPage from '../components/LandingPage'
import Home from '../components/Home'
import ServerPage from '../components/ServerPage'
// import ChannelPage from "../components/ChannelPage";
import ServerCreationForm from "../components/ServerCreationForm";
import JoinServer from '../components/JoinServer';
import Redirect from '../components/Redirect';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginFormPage />} />
      <Route path="/signup" element={<SignupFormPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/new-server" element={<ServerCreationForm />} />
      <Route path="/join-server" element={<JoinServer />} />
      <Route path='/redirect' element={<Redirect /> } />
      <Route path="/main" element={<MainPage />}>
        <Route path="servers/:serverId/channels/:channelId" element={<ServerPage />}>
        </Route>
      </Route>
      <Route path="*" element={<Redirect />} />
    </Route>
  )
);
