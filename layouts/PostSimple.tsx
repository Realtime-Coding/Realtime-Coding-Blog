import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Image from '@/components/Image'
import logo from '../public/static/images/logo.png'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { path, slug, date, title } = content

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
            <div className="divide-y text-gray-800 dark:text-gray-100 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
            </div>
            <ChannelSection />
            {siteMetadata.comments && (
              <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                <Comments slug={slug} />
              </div>
            )}
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && prev.path && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${prev.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      style={{ color: '#e75d60' }}
                      aria-label={`Previous post: ${prev.title}`}
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && next.path && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${next.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      style={{ color: '#e75d60' }}
                      aria-label={`Next post: ${next.title}`}
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}


function ChannelSection() {
  const subscribeUrl = "https://www.youtube.com/@realtimecoding"; // Replace with your actual subscribe URL
  return (
    <div className="w-full">
      <div className="py-4 px-6">
        <div className="flex flex-col items-center">
          <div className="w-44 h-44 rounded-full bg-white shadow-md border-red-200 border-2 mb-3 flex items-center justify-center">
            <div className="w-40 h-40 p-4 bg-white rounded-full shadow-md">
              <Image
                alt={"Realtime Coding"}
                src={logo}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#e75d60' }}>
              {"Realtime Coding"}
            </h2>
            <p className="mr-3 text-sm text-gray-600 dark:text-gray-300 w-full mb-4">
              {"Sharing is caring and a better way to learn new things then to transform that knowledge to learners."}
            </p>
            <a href={subscribeUrl} target="_blank" rel="noopener noreferrer">
              <button
                className="text-primary-500 font-bold rounded-lg p-3"
                style={{ backgroundColor: '#e75d60', color: 'white' }}
              >
                Subscribe
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

