import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

import Loader from 'react-loader-spinner'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SliderSection from '../../components/SliderSection'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomePage extends Component {
  state = {
    movieData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchMovieData()
  }

  fetchMovieData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },

      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        movieData: data.results[3],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderMovieView = () => {
    const {movieData} = this.state

    return (
      <div
        className="home-movie-bg-container"
        style={{backgroundImage: `url("${movieData.backdrop_path}")`}}
      >
        <Header />
        <section>
          <h1 className="home-movie-title">{movieData.title}</h1>
          <p className="home-movie-overview">{movieData.overview}</p>
          <button className="play-btn">Play</button>
        </section>
        <div className="overlay"></div>
      </div>
    )
  }

  renderLoadingView = () => (
    <section className="movie-placeholder-container">
      <div className="movie-placeholder" data-testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={20} width={20} />
      </div>
    </section>
  )

  renderFailureView = () => (
    <section className="movie-placeholder-container">
      <div className="movie-placeholder">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.3339 17.3329C17.3339 18.0689 16.7366 18.6663 16.0006 18.6663C15.2646 18.6663 14.6673 18.0689 14.6673 17.3329V11.9996C14.6673 11.2636 15.2646 10.6663 16.0006 10.6663C16.7366 10.6663 17.3339 11.2636 17.3339 11.9996V17.3329ZM16.0006 22.6663C15.2646 22.6663 14.6673 22.0689 14.6673 21.3329C14.6673 20.5969 15.2646 19.9996 16.0006 19.9996C16.7366 19.9996 17.3339 20.5969 17.3339 21.3329C17.3339 22.0689 16.7366 22.6663 16.0006 22.6663ZM30.0821 21.7369L19.8527 4.77826C19.0541 3.45559 17.6141 2.66626 16.0007 2.66626C14.3874 2.66626 12.9474 3.45559 12.1487 4.77826L1.91939 21.7369C1.16206 22.9943 1.13939 24.5063 1.85939 25.7809C2.63139 27.1503 4.1314 27.9996 5.7714 27.9996H26.2301C27.8701 27.9996 29.3701 27.1503 30.1421 25.7809C30.8621 24.5063 30.8394 22.9943 30.0821 21.7369Z"
            fill="#D81F26"
          />
        </svg>
        <p className="failure-text">Something went wrong. Please try again</p>
        <button className="try-again-btn" type="button">
          Try Again
        </button>
      </div>
    </section>
  )

  renderMovieSection = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderMovieView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-page-container">
        {this.renderMovieSection()}
        <Footer />
      </div>
    )
  }
}

export default HomePage
