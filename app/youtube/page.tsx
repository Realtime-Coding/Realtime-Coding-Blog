'use client'

import React, { useState } from 'react';
import ChannelCard from './ChannelCard';
import './channels.css';
import { DATA } from './databank';
import Image from '@/components/Image'
import logo from '../../public/static/images/logo.png'
import { genPageMetadata } from 'app/seo'
const metadata = genPageMetadata({ title: 'Youtube' })

function CourseAccordion({ item, index, openIndex, toggleAccordion, currentPage, itemsPerPage, setCurrentPage }) {
  const isOpen = index === openIndex;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(item.items.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={`rounded border ${ isOpen ? 'border-primary' : 'border-neutral-200' }
       bg-white dark:border-neutral-600 dark:bg-gray-900/70`}
      style={{ overflow: 'hidden'}}
    >
      <h2 className="mb-0" id={`heading-${index}`}>
        <button 
          className={`group relative font-bold flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-primary-500 transition overflow-anchor-none hover:z-[2] focus:z-[3] focus:outline-none dark:bg-gray-900/70 dark:text-primary-500 [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary-500 [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-gray-900/70 dark:[&:not([data-te-collapse-collapsed])]:text-primary-500 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`}
          type="button"
          style={{ color: '#e75d60' }} 
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
            className="text-primary-500 px-3 py-1 bg-primary text-primary rounded-md"
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            style={{ color: '#e75d60' }} 
            disabled={currentPage === 0}
          >
            Previous Page
          </button>
          <div className="flex overflow-x-auto">
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`px-3 py-1 ml-3 rounded-md ${
                  currentPage === pageNumber - 1 ? 'bg-primary-500 text-white'  : 'bg-gray-200 text-gray-600'
                }`}
                onClick={() => setCurrentPage(pageNumber - 1)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          <button
            className="text-primary-500 px-3 py-1 ml-3 bg-primary text-primary rounded-md" 
            style={{ color: '#e75d60' }} 
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


export default function Channel() {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Number of items to display per page

  const latestVideosWithPlaylistTitle = DATA.flatMap((parent) =>
  parent.items
    .filter((child) => child.latest === true)
    .map((child) => ({ parentTitle: parent.title, childItem: child }))
  );

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    setCurrentPage(0); // Reset the page when toggling accordion
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="flex sm:space-x-24 container mx-auto">
          <div id="accordionExample" className="w-full mb-8">
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
          <div className="max-h-screen h-full sm:flex flex-wrap flex justify-center">
            <div className="mb-8 shadow-md border-red-50 border-1 bg-gray-50 dark:bg-gray-900/70 shadow-md pt-5 dark:shadow-gray-800/40 rounded min-w-[280px] max-w-[280px]">
              <LatestVideoCard card={latestVideosWithPlaylistTitle}/>
            </div>
            <div>
              <ChannelSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LatestVideoCard(props: any) {
  const firstCard = props.card && props.card[0]; // Access the first element of the array
  if (!firstCard) {
    return <div>No latest video available.</div>; // Handle the case when the card object is missing or incomplete
  }
  const { parentTitle, childItem } = firstCard;
  const { title, imgSrc, url, description, date: videoDate } = childItem;

  return (
    <div className="w-full">
      <div className="py-4 px-6">
        <h3 className="ftext-primary-500 font-bold uppercase mb-3" style={{ color: '#e75d60' }}>Latest Video</h3>
        <div>
        <Image
              alt={title}
              src={imgSrc}
              className="w-full h-auto rounded-lg mb-3 shadow-md border-red-200 border-2"
              width={544}
              height={306}
            />
            
          <h2 className="text-xl font-semibold mb-3">{title}</h2>
          <p className="mr-3 text-sm text-gray-600 dark:text-gray-300 mb-2">{description}</p>
          <div className="flex justify-between mb-3">
            <p className="text-[11px] font-bold text-primary dark:text-gray-500" style={{ color: '#e75d60' }} >{parentTitle}</p>
            <p className="text-[9px] text-gray-400 dark:text-gray-500 text-right">{videoDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelSection() {
  const subscribeUrl = "https://www.youtube.com/@realtimecoding"; 
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
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#e75d60' }} >{"Realtime Coding"}</h2>
            <p className="mr-3 text-sm text-gray-600 dark:text-gray-300 w-40 mb-4">{"Sharing is caring and a better way to learn new things then to transform that knowledge to learners."}</p>
            <div className="flex justify-between mb-3">
              <a href={subscribeUrl} target="_blank" rel="noopener noreferrer">
                <p className="text-primary-500 text-[12px] font-bold" style={{ color: '#e75d60' }} >Subscribe</p>
              </a>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">{"Since 2019"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


