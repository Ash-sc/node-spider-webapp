import * as React from 'react'
import NovelApi from '../../api/novel'
import { ActivityIndicator, List, Flex, Toast } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

const Item = List.Item

interface PathParamsType {
  link: string
  index?: string
  novelName?: string
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
  private toggleEvent:any

  constructor(props: PropsType) {
    super(props)
    this.state = {
      articleLink: '',
      loadingContent: true,
      novelName: '',
      chapterList: [],
      order: -1,
      currentView: 'chapter',
      currentIndex: -1,
      content: '',
      transformHeight: 0,
      currentTransformHeight: 0,
    }
    this.toggleEvent = null
  }

  public componentDidMount() {
    this.setState({ articleLink: atob(this.props.match.params.link) })
    // 获取章节信息
    NovelApi.getChapter(atob(this.props.match.params.link)).then(
      (data: ChapterList) => {
        this.setState({
          novelName: data.name,
          loadingContent: false,
          chapterList: data.chapterList
        })
        if (
          this.props.match.params.index &&
          this.props.match.params.index !== 'chapter'
        ) {
          const index = parseInt(this.props.match.params.index, 10)
          this.viewChapter(data.chapterList[index].href, index)
        }
      }
    )

    // 计算屏幕需要滚动的高度
    const contentAttr = parseInt(
      window
        .getComputedStyle(this.contentRef.current)
        .getPropertyValue('line-height'),
      10
    )
    const sectionHeight = (document.documentElement as HTMLElement).clientHeight - 45
    const transformHeight = sectionHeight - (sectionHeight % contentAttr)
    this.setState({
      transformHeight
    })

    this.toggleEvent = window.addEventListener('toggle-view', () => {
      if (this.state.currentView === 'chapter') {
        return this.props.history.push('/search-novel')
      }
      this.backToChapter()
    })
  }

  public componentWillUnmount() {
    window.removeEventListener('toggle-view', this.toggleEvent)
  }

  // 返回章节列表
  public backToChapter = () => {
    this.setState({
      currentView: 'chapter'
    }, () => {
      setTimeout(() => {
        const activeDom = document.querySelector('.am-list-item.active') as HTMLDivElement
        activeDom.scrollIntoView()
        document.body.scrollIntoView()
      })
    })
  }

  // 点击章节 查看内容
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
        // 更新路由
        this.props.history.push(`/novel-content/${this.props.match.params.link}/${i}/${this.props.match.params.novelName}`)
      },
      () => {
        this.setState({ loadingContent: false })
        Toast.fail('获取章节信息失败', 2)
        // this.contentRef.current.style.transform = 'translateY(0)'
      }
    )
  }

  // 上一章  下一章
  public changeContent = (type: number, event: Event) => {
    event.stopPropagation()
    const { chapterList, currentIndex } = this.state
    const href = chapterList[currentIndex + type].href
    this.viewChapter(href, currentIndex + type)
  }

  // 点击屏幕左右 上下翻屏
  public scrollContent = (e: any) => {
    const windowWidth = (document.documentElement as HTMLElement).clientWidth
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
            {this.state.chapterList.length &&
              this.state.currentView === 'content' && (
                <p className="chapter-title">
                  {this.state.chapterList[this.state.currentIndex].title}
                  <br />
                  <br />
                </p>
              )}
            <p
              className="main-content"
              dangerouslySetInnerHTML={{ __html: this.state.content }}
            />
            <Flex className="chapter-jump">
              {this.state.currentIndex !== 0 && (
                <Flex.Item>
                  <div className="jump-div" onClick={(e: any) => this.changeContent(-1, e)}>&lt;&nbsp;上一章</div>
                </Flex.Item>
              )}
              {this.state.currentIndex !==
                this.state.chapterList.length - 1 && (
                <Flex.Item>
                  <div className="jump-div" onClick={(e: any) => this.changeContent(1, e)}>下一章&nbsp;&gt;</div>
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
