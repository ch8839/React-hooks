import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

const ArticleItem = ({ article }: any) => {
  const fetchArticleDetail = () => {
    const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=main`
    return fetch(API_URL).then((response) => response.json())
  }

  const { isLoading, isError, data, error } = useQuery(
    'my-data',
    fetchArticleDetail
  )
  let content: any = null
  if (isLoading) {
    content = <div>Loading...</div>
  } else if (isError) {
    console.log('>>>error', error)
    content = <div>Error: 111</div>
  } else {
    console.log('>>>data', data)

    content = (() => {
      return (
        <ul>
          {data.map((commits: any) => {
            const { html_url, sha, author, commit } = commits || {}
            return (
              <li key={sha}>
                <a href='html_url' target='_blank'>
                  {sha.slice(0, 7)}
                </a>
                <span> by </span>
                <span>
                  <a href='author.html_url' target='_blank'>
                    {commit.author.name}
                  </a>
                </span>
              </li>
            )
          })}
        </ul>
      )
    })()
  }

  useEffect(() => {
    console.log('>>>ArticleItem useEffect', article)
  }, [article])

  console.log('>>>ArticleItem render')

  return (
    <div>
      <div>title: {article}</div>
      <div>content: {content}</div>
    </div>
  )
}

function Exp4() {
  const [count, setCount] = useState(0)
  const [article, setArticle] = useState<any>(null)

  console.log('>>>Exp4 render')

  const fetchArticle = (id?: any) =>
    new Promise((reoslve) => {
      setTimeout(() => {
        reoslve('hh')
      }, 1000)
    })

  useEffect(() => {
    console.log('>>>Exp4 useEffect')
    async function fetchData() {
      const article = await fetchArticle()
      console.log('>>>fetchArticle done')
      setArticle(article)
    }

    fetchData()

    // 在下一次effect触发时会执行return
    return () => {
      console.log('>>>useEffect return')
    }
  }, [count])

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <QueryClientProvider client={queryClient}>
        <ArticleItem article={article}></ArticleItem>
      </QueryClientProvider>
    </div>
  )
}

export default Exp4
