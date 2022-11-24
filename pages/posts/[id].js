import Head from 'next/head';
import Link from 'next/link'
import { useRouter } from 'next/router';
import Layout from '../../components/layout'
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { getAllPostIds, getPostData } from '../../lib/posts'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';


export default function Post({ postData }) {
	const router = useRouter()
  return (
    <Layout>
			<Head>
        <title>{postData.title}</title>
      </Head>
			<article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
			<p>現在のPath：{router.asPath}</p>
			{router.asPath.match(/pre-rendering/) 
			? <Link href="/posts/ssg-ssr">Ssg-ssr</Link>
			: <Link href="/posts/pre-rendering">Pre-rendering</Link>
			}
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}