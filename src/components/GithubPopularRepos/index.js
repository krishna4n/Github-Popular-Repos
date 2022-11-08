import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class Repos extends Component {
  state = {
    filteredList: [],
    activeID: 'ALL',
    isLoading: false,
    loadingFailed: false,
  }

  componentDidMount() {
    this.getFilterLanguageData()
  }

  onSelectLanguage = id => {
    this.setState(
      {
        activeID: id,
        isLoading: true,
        loadingFailed: false,
      },

      this.getFilterLanguageData,
    )
  }

  getFilterLanguageData = async () => {
    const {activeID} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeID}`

    const response = await fetch(githubReposApiUrl)
    if (response.status === 200) {
      const data = await response.json()
      const popularRepos = await data.popular_repos
      const languageList = await popularRepos.map(each => ({
        id: each.id,
        name: each.name,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))

      this.setState({
        filteredList: languageList,
        isLoading: false,
      })
    } else {
      this.setState({
        loadingFailed: true,
      })
    }
  }

  render() {
    const {filteredList, isLoading, loadingFailed, activeID} = this.state
    console.log(activeID)
    return (
      <div testid="loader" className="popular-repos-container">
        <h1 className="popular-repos-heading">Popular</h1>
        <ul className="menu-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              language={eachItem}
              key={eachItem.id}
              activeID={activeID}
              onSelectLanguage={this.onSelectLanguage}
            />
          ))}
        </ul>

        {isLoading && (
          <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
        )}

        {!isLoading && (
          <ul className="repository-list-container">
            {filteredList.map(eachItem => (
              <RepositoryItem item={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}

        {loadingFailed && (
          <div className="failed-loading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
            />
            <h1>Something went wrong</h1>
          </div>
        )}
      </div>
    )
  }
}

export default Repos
