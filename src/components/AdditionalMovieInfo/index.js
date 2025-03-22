import './index.css'

const AdditionalMovieInfo = ({title, infoList}) =>
  infoList ? (
    <div>
      <h1 className="info-title">{title}</h1>
      {infoList.length > 1 ? (
        <ul className="info-list">
          {infoList.map(info => (
            <li className="info-item" key={info.id}>
              {info.name || info.english_name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="info-item">{infoList[0]}</p>
      )}
    </div>
  ) : null

export default AdditionalMovieInfo
