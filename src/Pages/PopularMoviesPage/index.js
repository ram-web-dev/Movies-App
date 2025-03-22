import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../../components/Header'

import Failure from '../../components/Failure'

import Loader from '../../components/Loader'

import MoviesList from '../../components/MoviesList'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PopularMoviesPage extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    popularMovies: [],
  }

  componentDidMount() {
    this.fetchPopularMovies()
  }

  fetchPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/movies-app/popular-movies'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      this.setState({data: data.results, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderPopularMovies = () => {
    const {popularMovies, apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return <MoviesList MoviesList={popularMovies} />
      case apiStatusConstants.failure:
        return <Failure />
      case apiStatusConstants.inProgress:
        return <Loader />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-page-container">
        <Header />
        {this.renderPopularMovies()}
      </div>
    )
  }
}

export default PopularMoviesPage
