import * as React from 'react'
import NovelApi from '../../api/novel'
import { ActivityIndicator, List, Icon, Flex } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

const Item = List.Item

interface ChapterList {
  name: string
  chapterList: ChapterInfo[]
}

interface ChapterInfo {
  title: string
  href: string
}

const NovelSearch = (props: any) => {
  const [articleLink, setArticleLink] = React.useState('')
  const [loadingContent, setLoadingContent] = React.useState(true)
  const [novelName, setNovelName] = React.useState('')
  const [chapterList, setChapterList] = React.useState([] as ChapterInfo[])
  // const [order, setOrder] = (React as any).useState(-1)
  const [currentView, setCurrentView] = React.useState('chapter')
  const [currentIndex, setCurrentIndex] = React.useState(-1)
  const [content, setContent] = React.useState('')
  const [transformHeight, setTransformHeight] = React.useState(0)
  const [currentTransformHeight, setCurrentTransformHeight] = React.useState(0)

  React.useEffect(() => {
    setArticleLink(atob(props.match.params.link))
    // 获取章节信息
    NovelApi.getChapter(atob(props.match.params.link)).then(
      (data: ChapterList) => {
        setNovelName(data.name)
        setLoadingContent(false)
        setChapterList(data.chapterList)

        if (
          props.match.params.index &&
          props.match.params.index !== 'chapter'
        ) {
          const index = parseInt(props.match.params.index, 10)
          viewChapter(data.chapterList[index].href, index)
        }
      }
    )

    // 计算屏幕需要滚动的高度
    const contentAttr = parseInt(
      window
        .getComputedStyle((document.querySelector('#contentRef') as HTMLDivElement))
        .getPropertyValue('line-height'),
      10
    )
    const sectionHeight = (document.documentElement as HTMLElement).clientHeight - 45
    setTransformHeight(sectionHeight - (sectionHeight % contentAttr))
  })

  // 返回章节列表
  function backToChapter() {
    setCurrentView('chapter')
    setTimeout(() => {
      const activeDom = document.querySelector('.am-list-item.active') as HTMLDivElement
      activeDom.scrollIntoView()
      document.body.scrollIntoView()
    })
  }

  // 点击章节 查看内容
  function viewChapter(href: string, i: number) {
    setLoadingContent(true)
    NovelApi.getContent(articleLink + href).then(
      data => {
        setLoadingContent(false)
        setContent(data as any)
        setCurrentView('content')
        setCurrentIndex(i)
        setCurrentTransformHeight(0);
        (document.querySelector('#contentRef') as HTMLDivElement).style.transform = 'translateY(0)'
        // 更新路由
        props.history.push(
          '/novel-content/' + props.match.params.link + '/' + i
        )
      },
      () => {
        setLoadingContent(false)
        setCurrentTransformHeight(0);
        (document.querySelector('#contentRef') as HTMLDivElement).style.transform = 'translateY(0)'
      }
    )
  }

  // 上一章  下一章
  function changeContent(type: number) {
    const { href } = chapterList[currentIndex + type]
    viewChapter(href, currentIndex + type)
  }

  // 点击屏幕左右 上下翻屏
  function scrollContent (e: any) {
    const windowWidth = (document.documentElement as HTMLElement).clientWidth
    const sectionHeight = parseInt(
      window.getComputedStyle(e.target).getPropertyValue('height'),
      10
    )
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
      setCurrentTransformHeight(newTransformHeight)
    }
  }

  return (
    <div className="novel-body">
      {!loadingContent &&
        currentView === 'content' && (
          <Icon
            type={'left'}
            className="back-icon"
            onClick={backToChapter}
          />
        )}
      {chapterList.length ? (
        <List
          renderHeader={novelName + '-- 章节列表'}
          className={
            'chapter-section' +
            (currentView === 'content' ? ' hide' : '')
          }
        >
          {chapterList.map((chapter: ChapterInfo, i: number) => (
            <Item
              key={chapter.href}
              onClick={() => viewChapter(chapter.href, i)}
              className={currentIndex === i ? 'active' : ''}
            >
              {chapter.title}
            </Item>
          ))}
        </List>
      ) : loadingContent ? (
        ''
      ) : (
        <span className="no-result-text">NO RESULTS FOUND!</span>
      )}
      {loadingContent && (
        <ActivityIndicator
          text="Loading..."
          className="full-screen-loading"
        />
      )}
      <div
        className="content-section"
        style={{
          display: currentView === 'content' ? 'block' : 'none'
        }}
      >
        <div
          id="contentRef"
          className="content-paragraph"
          onClick={scrollContent}
        >
          {chapterList.length &&
            currentView === 'content' && (
              <p className="chapter-title">
                {(chapterList[currentIndex] as any).title}
                <br />
                <br />
              </p>
            )}
          <p
            className="main-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <Flex className="chapter-jump">
            {currentIndex !== 0 && (
              <Flex.Item onClick={() => changeContent(-1)}>
                上一章
              </Flex.Item>
            )}
            {currentIndex !==
              chapterList.length - 1 && (
              <Flex.Item onClick={() => changeContent(1)}>
                下一章
              </Flex.Item>
            )}
          </Flex>
        </div>
      </div>
    </div>
  )
}

export default withRouter(NovelSearch)
