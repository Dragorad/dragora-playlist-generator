import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
// import PersistentDrawerLeft from './components/navbar/PersistDrawer'
import { TitlesArtistQuery } from './components/adminView/TitlesArtistQuery'
import UrlTitleForm from './components/adminView/UrlTitleForm'
export const ImgLoader = <img src="music-player-circle-start.svg" alt='Loading' />

const LazyPersistDrawer = lazy(() => import('./components/navbar/PersistDrawer'))

const Routes = (props) => (
  <Suspense fallback={ImgLoader} >
    <Switch>
      <Route exact path='/' component={LazyPersistDrawer} />
      <Route exact path='/admin' component={TitlesArtistQuery} />
      {/* <Route exact path='/login' component={UserForm} />
    <Route exact path='/signedIn' component={ControlForm} /> */}
      <Route exact path='/genres' component={UrlTitleForm} />
      <Redirect from='/index' to='/' />
      <Redirect from='/home' to='/' />
      {/* <Route path='/work-pane' component={WorkPaneRedux} /> */}
      <div>404 page not found</div>
    </Switch>
  </Suspense>
)
export default Routes
