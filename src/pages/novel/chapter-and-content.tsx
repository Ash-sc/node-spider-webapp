import * as React from 'react'
import NovelApi from '../../api/novel'
import { ActivityIndicator, List, Icon, Flex } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

const Item = List.Item

interface PathParamsType {
  link: string
}

interface ChapterList {
  name: string
  chapterList: ChapterInfo
}

interface ChapterInfo {
  title: string
  href: string
}

type PropsType = RouteComponentProps<PathParamsType> & {}

class NovelSearch extends React.Component<PropsType, any> {
  private contentRef = React.createRef<any>()

  constructor(props: PropsType) {
    super(props)
    this.state = {
      articleLink: '',
      loadingContent: true,
      novelName: '',
      chapterList: [],
      order: -1,
      currentView: 'chapter',
      currentIndex: 0,
      content: '',
      transformHeight: 0,
      currentTransformHeight: 0
    }
  }

  public componentDidMount() {
    this.setState({ articleLink: atob(this.props.match.params.link) })
    NovelApi.getChapter(atob(this.props.match.params.link)).then(
      (data: ChapterList) => {
        this.setState({
          novelName: data.name,
          loadingContent: false,
          chapterList: data.chapterList
        })
      }
    )

    // 计算屏幕需要滚动的高度
    const contentAttr = parseInt(
      window
        .getComputedStyle(this.contentRef.current)
        .getPropertyValue('line-height'),
      10
    )
    const sectionHeight = document.documentElement.clientHeight - 45
    const transformHeight = sectionHeight - (sectionHeight % contentAttr)
    this.setState({
      transformHeight
    })
  }

  public backToChapter = () => {
    this.setState({
      currentView: 'chapter'
    })
  }

  public viewChapter = (href: string, i: number) => {
    this.setState({
      loadingContent: true
    })
    NovelApi.getContent(this.state.articleLink + href).then(
      data => {
        this.setState({
          loadingContent: false,
          content: data,
          currentView: 'content',
          currentIndex: i,
          currentTransformHeight: 0
        })
        this.contentRef.current.style.transform = 'translateY(0)'
      },
      () => {
        this.setState({ loadingContent: false, currentTransformHeight: 0 })
        this.contentRef.current.style.transform = 'translateY(0)'
      }
    )
  }

  public changeContent = (type: number) => {
    const { chapterList, currentIndex } = this.state
    const href = chapterList[currentIndex + type].href
    this.viewChapter(href, currentIndex + type)
  }

  public scrollContent = (e: any) => {
    const windowWidth = document.documentElement.clientWidth
    const sectionHeight = parseInt(
      window.getComputedStyle(e.target).getPropertyValue('height'),
      10
    )
    const { currentTransformHeight, transformHeight } = this.state
    const newTransformHeight =
      e.pageX > windowWidth / 2
        ? currentTransformHeight + transformHeight
        : currentTransformHeight - transformHeight
    if (e.pageX > windowWidth / 2) {
      e.currentTarget.style.transform = `translateY(-${Math.min(
        newTransformHeight,
        sectionHeight
      )}px)`
    } else {
      e.currentTarget.style.transform = `translateY(-${Math.max(
        newTransformHeight,
        0
      )}px)`
    }
    if (newTransformHeight > 0 && newTransformHeight < sectionHeight) {
      this.setState({
        currentTransformHeight: newTransformHeight
      })
    }
  }

  public render() {
    return (
      <div className="novel-body">
        {!this.state.loadingContent &&
          this.state.currentView === 'content' && (
            <Icon
              type={'left'}
              className="back-icon"
              onClick={this.backToChapter}
            />
          )}
        {this.state.chapterList.length ? (
          <List
            renderHeader={() => this.state.novelName + '-- 章节列表'}
            className={
              'chapter-section' +
              (this.state.currentView === 'content' ? ' hide' : '')
            }
          >
            {this.state.chapterList.map((chapter: ChapterInfo, i: number) => (
              <Item
                key={chapter.href}
                onClick={() => this.viewChapter(chapter.href, i)}
                className={this.state.currentIndex === i ? 'active' : ''}
              >
                {chapter.title}
              </Item>
            ))}
          </List>
        ) : this.state.loadingContent ? (
          ''
        ) : (
          <span className="no-result-text">NO RESULTS FOUND!</span>
        )}
        {this.state.loadingContent && (
          <ActivityIndicator
            text="Loading..."
            className="full-screen-loading"
          />
        )}
        <div
          className="content-section"
          style={{
            display: this.state.currentView === 'content' ? 'block' : 'none'
          }}
        >
          <div
            ref={this.contentRef}
            className="content-paragraph"
            onClick={this.scrollContent}
          >
            {this.state.chapterList.length && (
              <p className="chapter-title">
                {this.state.chapterList[this.state.currentIndex].title}
              </p>
            )}
            <p
              className="main-content"
              dangerouslySetInnerHTML={{ __html: this.state.content }}
            />
            <Flex className="chapter-jump">
              {this.state.currentIndex !== 0 && (
                <Flex.Item onClick={() => this.changeContent(-1)}>
                  上一章
                </Flex.Item>
              )}
              {this.state.currentIndex !==
                this.state.chapterList.length - 1 && (
                <Flex.Item onClick={() => this.changeContent(1)}>
                  下一章
                </Flex.Item>
              )}
            </Flex>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NovelSearch)
