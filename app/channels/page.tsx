'use client'

// import { genPageMetadata } from 'app/seo'

// export const metadata = genPageMetadata({ title: 'Channels' })

import { DATA } from './databank'
import { useState } from 'react'
import ChannelCard from './ChannelCard'
import './channels.css'

export default function Channels() {
  const [accordionState, setAccordionState] = useState([...DATA])

  const toggleAccordion = (index: string | number) => {
    let temp = [...accordionState]
    temp[index].isShow = !temp[index].isShow
    setAccordionState([...temp])
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <div className="flex sm:space-x-24 container">
            <div id="accordionExample" className="w-full">
              {accordionState.map((item, index) => {
                return (
                  <div
                    className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 "
                    key={index}
                    style={{ maxHeight: '61vh', overflow: 'auto' }}
                  >
                    <h2 className="mb-0" id="headingOne">
                      <button
                        className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                        type="button"
                      >
                        {item.title} {index + 1}
                        <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                          {item.isShow ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="h-6 w-6"
                              onClick={() => toggleAccordion(index)}
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="h-6 w-6"
                              style={{ transform: 'rotate(180deg)' }}
                              onClick={() => toggleAccordion(index)}
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          )}
                        </span>
                      </button>
                    </h2>
                    <div className="flex flex-row flex-wrap w-full">
                      {item.isShow &&
                        item.items.map((card) => {
                          return <ChannelCard {...card} />
                        })}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className=" max-h-screen h-full sm:flex flex-wrap bg-gray-50 dark:bg-gray-900/70 shadow-md pt-5 dark:shadow-gray-800/40 rounded min-w-[280px] max-w-[280px]">
              <div className="py-4 px-6">
                <h3 className="text-primary-500 font-bold uppercase">Other stuff area</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
