import './index.css'

const LanguageFilterItem = props => {
  const {language, onSelectLanguage, activeID} = props

  const selectedLanguage =
    activeID === language.id ? 'selected-language' : 'inactive-language'

  const onClickLanguage = () => {
    onSelectLanguage(language.id)
  }

  return (
    <li>
      <button
        type="submit"
        className={selectedLanguage}
        onClick={onClickLanguage}
      >
        {language.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
