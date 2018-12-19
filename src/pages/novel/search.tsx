import * as React from 'react'
import NovelApi from '../../api/novel'
import { SearchBar, ActivityIndicator, List } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

const Item = List.Item
const Brief = Item.Brief

interface Novel {
  classify: string
  articleName: string
  articleLink: string
  authorName: string
  latestCharterName: string
  updateTime: string
}

const NovelSearch = (props: any) => {

  const [loadingData, setLoadingData] = (React as any).useState(false)
  const [novelList, setNovelList] = (React as any).useState([])

  // 搜索小说
  function searchNovel(key: string) {
    if (!key) {
      return setNovelList([])
    }
    setLoadingData(true)
    return NovelApi.searchNovel(key).then(
      data => {
        setNovelList(data)
        setLoadingData(false)
      },
      () => {
        setLoadingData(false)
      }
    )
  }

  // 查看章节信息
  function viewChapterList(link: string) {
    props.history.push('/novel-content/' + btoa(link) + '/chapter')
  }
  return (
    <div className="novel-body">
      <SearchBar
        placeholder="search novel by name or author"
        maxLength={20}
        onClear={() => searchNovel('')}
        onSubmit={searchNovel}
      />
      {novelList.length ? (
        <List renderHeader='RESULTS' className="my-list">
          {novelList.map((novel: Novel, i: number) => (
            <Item
              key={i}
              arrow="horizontal"
              multipleLine
              onClick={() => viewChapterList(novel.articleLink)}
              platform="android"
            >
              {novel.articleName} {novel.classify}
              <Brief>
                {novel.latestCharterName}
                <br />
                {novel.authorName} -- {novel.updateTime}
              </Brief>
            </Item>
          ))}
        </List>
      ) : loadingData ? (
        ''
      ) : (
        <span className="no-result-text">NO RESULTS FOUND!</span>
      )}
      {loadingData && (
        <ActivityIndicator
          text="Loading..."
          className="full-screen-loading"
        />
      )}
    </div>
  )
}

export default withRouter(NovelSearch)
