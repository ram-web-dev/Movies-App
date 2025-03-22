import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../../components/Header'

import AdditionalMovieInfo from '../../components/AdditionalMovieInfo'

import SubHeading from '../../components/SubHeading'

import MoviesList from '../../components/MoviesList'

import Footer from '../../components/Footer'

import Loader from '../../components/Loader'

import Failure from '../../components/Failure'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieDetailsPage extends Component {
  state = {apiStatus: apiStatusConstants.initial, movieDetails: {}}

  componentDidMount() {
    this.fetchMovieData()
  }

  fetchMovieData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {
      match: {
        params: {id},
      },
    } = this.props

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const {movie_details: movieDetails} = data
      this.setState({
        apiStatus: apiStatusConstants.success,
        movieDetails,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="movie-details-bg-contianer">
      <Header />
      <Loader />
    </div>
  )

  renderFaliureView = () => (
    <div className="movie-details-bg-contianer">
      <Header />
      <Failure onClickTryAgain={this.fetchMovieData} />
    </div>
  )

  renderMovieDetails = () => {
    const {movieDetails} = this.state
    const movieRuntime = parseInt(movieDetails.runtime)
    const runtimeHrs = Math.floor(movieRuntime / 60)
    const releaseDate = new Date(movieDetails.release_date)

    return (
      <div className="movie-details-bg-contianer">
        <div
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 24, 24, 1), rgba(24, 24, 24, 0.6), rgba(24, 24, 24, 0)),  url(${movieDetails.backdrop_path}) `,
          }}
          className="movie-poster-container"
        >
          <Header />
          <div className="movie-details-section-container">
            <h1 className="movie-title">{movieDetails.title}</h1>
            <div className="movie-info-container">
              <p className="movie-runtime">{`${runtimeHrs}h ${
                movieRuntime - runtimeHrs * 60
              }m`}</p>
              <p className="movie-certificate">
                {movieDetails.adult ? 'A' : 'U/A'}
              </p>
              <p className="movie-release-date">{releaseDate.getFullYear()}</p>
            </div>
            <p className="movie-overview">{movieDetails.overview}</p>
            <button className="play-btn">Play</button>
          </div>
        </div>
        <div className="movie-details-section-container fill-rest">
          <div className="additional-info-section">
            <AdditionalMovieInfo
              title="Genres"
              infoList={movieDetails.genres}
            />
            <AdditionalMovieInfo
              title="Audio Available"
              infoList={movieDetails.spoken_languages}
            />

            <div>
              <AdditionalMovieInfo
                title="Rating Count"
                infoList={[movieDetails.vote_count]}
              />
              <AdditionalMovieInfo
                title="Rating Average"
                infoList={[movieDetails.vote_average]}
              />
            </div>
            <div>
              <AdditionalMovieInfo
                title="Budget"
                infoList={[movieDetails.budget]}
              />
              <AdditionalMovieInfo
                title="Release Date"
                infoList={[movieDetails.release_date]}
              />
            </div>
          </div>

          <SubHeading text="More like this" />
          <MoviesList moviesList={movieDetails.similar_movies?.slice(0, 6)} />
        </div>
        <Footer />
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFaliureView()
      case apiStatusConstants.success:
        return this.renderMovieDetails()
      default:
        return null
    }
  }
}

export default MovieDetailsPage
