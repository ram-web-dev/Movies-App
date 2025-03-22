import {Component} from 'react'

import Slider from 'react-slick'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import SliderArrow from '../SliderArrow'

import SubHeading from '../SubHeading'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SliderSection extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchSliderData()
  }

  fetchSliderData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {url} = this.props

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
      this.setState({data: data.results, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <section className="loader-container">
      <div className="loader" data-testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={20} width={20} />
      </div>
    </section>
  )

  renderSuccessView = () => {
    const {heading} = this.props
    const {data} = this.state

    const settings = {
      dots: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      initialSlide: 0,
      prevArrow: <SliderArrow arrowType="left" />,
      nextArrow: <SliderArrow />,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <section className="slider-section">
        <div className="slider-container">
          <SubHeading text={heading} />
          <Slider {...settings}>
            {data?.map(ele => (
              <img
                key={ele.id}
                src={ele.poster_path}
                alt={ele.title}
                className="slide-img"
              />
            ))}
          </Slider>
        </div>
      </section>
    )
  }

  renderFailureView = () => (
    <section className="failure-container">
      <div className="failure">
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

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default SliderSection
