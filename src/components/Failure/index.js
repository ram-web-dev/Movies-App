const Failure = ({onClickTryAgain}) => (
  <div className="movie-failure-container">
    <img
      src="https://res.cloudinary.com/dgojdrj3n/image/upload/v1742464632/mini-project-netflix/popular-movies-not-found.png"
      alt="failure"
      className="failure-img"
    />
    <p className="movie-failure-text">Something went wrong. Please try again</p>
    <button className="try-again-btn" type="button" onClick={onClickTryAgain}>
      Try Again
    </button>
  </div>
)

export default Failure
