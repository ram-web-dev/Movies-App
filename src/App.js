import './App.css'

import {Switch, Route} from 'react-router-dom'

import LoginPage from './Pages/LoginPage'

import HomePage from './Pages/HomePage'

import PopularMoviesPage from './Pages/PopularMoviesPage'

import MovieDetailsPage from './Pages/MovieDetailsPage'

import AccountPage from './Pages/AccountPage'

const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/account" component={AccountPage} />
    <Route exact path="/popular" component={PopularMoviesPage} />
    <Route exact path="/movies/:id" component={MovieDetailsPage} />
  </Switch>
)

export default App
