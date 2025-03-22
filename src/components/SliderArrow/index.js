import './index.css'

import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'

const SliderArrow = props => {
  const {className, style, onClick, arrowType} = props

  return arrowType === 'left' ? (
    <button
      type="button"
      className={className}
      style={{...style, background: 'transparent', outline: 'none'}}
      onClick={onClick}
    >
      <FaChevronLeft className="arrow-styles" />
    </button>
  ) : (
    <button
      type="button"
      className={className}
      style={{...style, background: 'transparent', outline: 'none'}}
      onClick={onClick}
    >
      <FaChevronRight className="arrow-styles" />
    </button>
  )
}

export default SliderArrow
