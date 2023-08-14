'use client'

// import { genPageMetadata } from 'app/seo'

<<<<<<< Updated upstream
// export const metadata = genPageMetadata({ title: 'Channels' })

import React, { useState } from 'react';
import ChannelCard from './ChannelCard';
import './channels.css';
import { DATA } from './databank';
import Card from '@/components/Card';
=======
const metadata = genPageMetadata({ title: 'Channels' })
import { DATA } from './databank'
import { useState } from 'react'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { allAuthors } from 'contentlayer/generated'
>>>>>>> Stashed changes

function CourseAccordion({ item, index, openIndex, toggleAccordion, currentPage, itemsPerPage, setCurrentPage }) {
  const isOpen = index === openIndex;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(item.items.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={`rounded border ${
        isOpen ? 'border-primary' : 'border-neutral-200'
      } bg-white dark:border-neutral-600 dark:bg-neutral-800`}
      style={{ overflow: 'hidden'}} 
    >
      <h2 className="mb-0" id={`heading-${index}`}>
      <button
          className={`group relative font-bold flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition overflow-anchor-none hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`}
          type="button"
          onClick={() => toggleAccordion(index)}
        >
          {item.title}
          <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`h-6 w-6 ${isOpen ? 'rotate-0 fill-primary' : 'rotate-180'}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              ></path>
            </svg>
          </span>
        </button>
      </h2>
      <div
        className="flex flex-row flex-wrap w-full"
        style={{
          maxHeight: isOpen ? 'inherit' : '0',
          transition: 'max-height 0.3s ease',
          overflow: isOpen ? 'auto' : 'hidden',
          marginLeft: '6px',
        }}
      >
        {item.items
          .slice(startIndex, endIndex)
          .map((card, cardIndex) => (
            <ChannelCard key={cardIndex} {...card} />
          ))}
      </div>
      {isOpen && (
        <div className="flex justify-center mt-4 mb-4">
          <button
            className="px-3 py-1 bg-primary text-primary rounded-md"
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            Previous Page
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-3 py-1 ml-3 rounded-md ${
                currentPage === pageNumber - 1 ? 'bg-black text-white' // Black for selected page
                  : 'bg-gray-200 text-gray-600' // Gray for other pages
              }`}
              onClick={() => setCurrentPage(pageNumber - 1)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="px-3 py-1 ml-3 bg-primary text-primary rounded-md"
            onClick={() =>
              setCurrentPage(
                Math.min(
                  Math.ceil(item.items.length / itemsPerPage) - 1,
                  currentPage + 1
                )
              )
            }
            disabled={
              currentPage === Math.floor(item.items.length / itemsPerPage)
            }
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
}

<<<<<<< Updated upstream
export default function Channel() {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Number of items to display per page
  const latestVideo = DATA.find((item) => item.latest === true); 
  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    setCurrentPage(0); // Reset the page when toggling accordion
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="flex sm:space-x-24 container">
          <div id="accordionExample" className="w-full">
            {DATA.map((item, index) => (
              <CourseAccordion
                key={index}
                item={item}
                index={index}
                openIndex={openIndex}
                toggleAccordion={toggleAccordion}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
              />
            ))}
          </div>
          {/* Other stuff area */}
          <div className="max-h-screen h-full sm:flex flex-wrap bg-gray-50 dark:bg-gray-900/70 shadow-md pt-5 dark:shadow-gray-800/40 rounded min-w-[280px] max-w-[280px]">
          <LatestVideoCard card={ latestVideo } />
=======
            <div className="hidden max-h-screen h-full sm:flex flex-wrap">
              <div className="py-4 px-6 mb-3 bg-gray-50 dark:bg-gray-900/70 shadow-md pt-5 dark:shadow-gray-800/40 rounded min-w-[280px] max-w-[280px]">
                <h3 className="text-primary-500 font-bold uppercase mb-3">Latest Video</h3>
                <>{displayImageInfo()}</>
              </div>
            </div>
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    </div>
  );
}

<<<<<<< Updated upstream
function LatestVideoCard({ card }) {
  return (
    <div className="w-full">
      <div className="py-4 px-6">
        <h3 className="text-primary-500 font-bold uppercase">Latest Video</h3>
        <ChannelCard {...card} />
      </div>
    </div>
  );
}

=======
const displayImageInfo = () => {
  const imageUrl =
    'https://www.onyourmental.com/_next/image?url=https%3A%2F%2Fi.ytimg.com%2Fvi%2FjLm4u4T9yZQ%2Fmqdefault.jpg&w=640&q=75';
  const title = 'Firebase With MVVM';
  const description = 'In this video, you will learn about how to implement MVVM with Firebase';
  const date = 'August 14, 2023';
  const time = '3:00 PM'; // Add your desired time here

  return (
    <div>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-auto rounded-lg mb-3 shadow-md border-red-500 border-4"
      />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="mr-3 text-sm text-gray-600 dark:text-gray-300 mb-2">{description}</p>
      <div className="flex justify-between mb-3">
        <p className="text-xs text-gray-400 dark:text-gray-500">{time}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 text-right">{date}</p>
      </div>
    </div>
  );
};
>>>>>>> Stashed changes
