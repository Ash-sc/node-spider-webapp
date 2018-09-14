import * as React from 'react'
import NovelApi from '../../api/novel'
import { SearchBar, ActivityIndicator, List } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

const Item = List.Item
const Brief = Item.Brief

interface PathParamsType {
  key?: string
}

interface Novel {
  classify: string
  articleName: string
  articleLink: string
  authorName: string
  latestCharterName: string
  updateTime: string
}

type PropsType = RouteComponentProps<PathParamsType> & {}

class NovelSearch extends React.Component<PropsType, {}> {
  public state = {
    loadingData: false,
    novelList: []
  }

  constructor(props: any) {
    super(props)
    this.searchNovel = this.searchNovel.bind(this)
  }

  // 搜索小说
  public searchNovel(key: string) {
    if (!key) {
      return this.setState({
        novelList: []
      })
    }
    this.setState({
      loadingData: true
    })
    return NovelApi.searchNovel(key).then(
      data => {
        this.setState({
          novelList: data,
          loadingData: false
        })
      },
      () => {
        this.setState({
          loadingData: false
        })
      }
    )
  }

  // 查看章节信息
  public viewChapterList(link: string) {
    this.props.history.push('/novel-content/' + btoa(link) + '/chapter')
  }

  public render() {
    return (
      <div className="novel-body">
        <SearchBar
          placeholder="search novel by name or author"
          maxLength={20}
          onClear={() => this.searchNovel('')}
          onSubmit={this.searchNovel}
        />
        {this.state.novelList.length ? (
          <List renderHeader={() => 'RESULTS'} className="my-list">
            {this.state.novelList.map((novel: Novel, i) => (
              <Item
                key={i}
                arrow="horizontal"
                multipleLine
                onClick={() => this.viewChapterList(novel.articleLink)}
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
        ) : this.state.loadingData ? (
          ''
        ) : (
          <span className="no-result-text">NO RESULTS FOUND!</span>
        )}
        {this.state.loadingData && (
          <ActivityIndicator
            text="Loading..."
            className="full-screen-loading"
          />
        )}
      </div>
    )
  }
}

export default withRouter(NovelSearch)
