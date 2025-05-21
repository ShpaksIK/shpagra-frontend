import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Input from '../../ui/Input/Input'
import Dropdown from '../../ui/Dropdown/Dropdown'
import Line from '../../ui/Line/Line'
import ProfilePreview from '../../ui/ProfilePreview/ProfilePreview'
import ArticlePreview from '../../ui/ArticlePreview/ArticlePreview'

import style from './Search.module.scss'
import { AppStateType } from '../../redux'
import { setArticleSearch, setProfileSearch, setRecentSearch } from '../../redux/reducers/searchReducer'
import { ArticleSearch, ProfileSearch, RecentSearch } from '../../redux/types/searchStateSchema'


interface StateProps {
    recentSearch: RecentSearch[]
    articleSearch: ArticleSearch[]
    profileSearch: ProfileSearch[]
}

interface DispatchProps {
    setRecentSearch: () => void
    setArticleSearch: () => void
    setProfileSearch: () => void
}

type SearchProps = StateProps & DispatchProps

const Search: React.FC<SearchProps> = (props) => {
    const [isDropdownShow, setDropdownShow] = useState(false)

    useEffect(() => {
        if (isDropdownShow && props.profileSearch.length === 0) {
            props.setRecentSearch()
            props.setArticleSearch()
            props.setProfileSearch()
        }
    }, [isDropdownShow])

    return (
        <form className={style.form}>
            <Input type='search' onFocus={() => setDropdownShow(true)} placeholder='Искать' isMaxWidth={true} />
            {isDropdownShow && (
                <Dropdown isShowCloseImg={true} dropdownClose={() => setDropdownShow(false)}>
                    <div className={style.dropdown}>
                        <b className={style.dropdown__title}>Недавнее</b>
                        <div className={style.dropdown__list}>
                            {props.recentSearch.map(recent => {
                                if ('articleId' in recent) {
                                    return (
                                        props.articleSearch.map(article => (
                                            <div className={style.dropdown__item} key={article.articleId}>
                                                <ArticlePreview
                                                    articleCreatedAt={article.articleCreatedAt}
                                                    articleDescription={article.articleDescription}
                                                    articleId={article.articleId}
                                                    articleTitle={article.articleTitle}
                                                />
                                            </div>
                                        ))
                                    )
                                } else {
                                    return (
                                        props.profileSearch.map(profile => (
                                            <div className={style.dropdown__item} key={profile.profileId}>
                                                <ProfilePreview
                                                    profileAvatar={profile.profileAvatar}
                                                    profileId={profile.profileId}
                                                    profileName={profile.profileName}
                                                    isSubscribed={false}
                                                />
                                            </div>
                                        ))
                                    ) 
                                }
                            })}
                            {props.recentSearch.length === 0 && (
                                <p className={style.dropdown__error}>Вы ничего не находили</p>
                            )}
                        </div>
                        <Line />
                        <b className={style.dropdown__title}>Статьи</b>
                        <div className={style.dropdown__list}>
                            {props.articleSearch.map(article => (
                                <div className={style.dropdown__item} key={article.articleId}>
                                    <ArticlePreview
                                        articleCreatedAt={article.articleCreatedAt}
                                        articleDescription={article.articleDescription}
                                        articleId={article.articleId}
                                        articleTitle={article.articleTitle}
                                    />
                                </div>
                            ))}
                            {props.articleSearch.length === 0 && (
                                <p className={style.dropdown__error}>Нет рекомендуемых статей</p>
                            )}
                        </div>
                        <Line />
                        <b className={style.dropdown__title}>Пользователи</b>
                        <div className={style.dropdown__list}>
                            {props.profileSearch.map(profile => (
                                <div className={style.dropdown__item} key={profile.profileId}>
                                    <ProfilePreview
                                        profileAvatar={profile.profileAvatar}
                                        profileId={profile.profileId}
                                        profileName={profile.profileName}
                                        isSubscribed={false}
                                    />
                                </div>
                            ))}
                            {props.profileSearch.length === 0 && (
                                <p className={style.dropdown__error}>Нет рекомендуемых пользователей</p>
                            )}
                        </div>
                    </div>
                </Dropdown>
            )}
            
        </form>
    )
}

const mapState = (state: AppStateType) => {
    return {
        recentSearch: state.search.recentSearch,
        articleSearch: state.search.articleSearch,
        profileSearch: state.search.profileSearch
    }
}

const mapDispatch = {setRecentSearch, setArticleSearch, setProfileSearch}

export default connect(mapState, mapDispatch)(Search)