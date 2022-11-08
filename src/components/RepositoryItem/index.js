import './index.css'

const Item = props => {
  const {item} = props
  const {avatarUrl, issuesCount, forksCount, starsCount, name} = item

  return (
    <li className="item-container">
      <img src={avatarUrl} alt="" className="avatar-image" />
      <p className="item-heading">{name}</p>
      <ul className="count-container">
        <li className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p>{starsCount} stars</p>
        </li>
        <li className="forks-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p>{forksCount} forks</p>
        </li>
        <li className="open-issues-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p>{issuesCount} open issues</p>
        </li>
      </ul>
    </li>
  )
}

export default Item
