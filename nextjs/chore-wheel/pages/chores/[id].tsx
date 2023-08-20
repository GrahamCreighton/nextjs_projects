import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from 'next'
import { getChoreData, getAllChoreIds } from '@/lib/chores'
import type { NextPage } from "next";
import { ChoreProps } from '@/components/chore-data'

export default function Chore({
  choreData
}: {
  choreData: ChoreProps
}) {
  return (
    <Layout>
      <Head>
        <title>{choreData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{choreData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={choreData.deadline} />
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const choreIds = (await getAllChoreIds()).map(chore => { 
    return { params: { id: chore.params.id.toString() } }}
  )

  return {
    paths: choreIds,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const choreData = await getChoreData(params?.id as string)
  return {
    props: {
      choreData
    }
  }
}