'use client'

import './channels.css'
import './channel.min.css'

export default function Channels(props: any) {
  const openURL = (link: string | URL | undefined) => {
    window.open(link, '_blank')
  }

  return (
    <div
      className="rounded-lg bg-gradient-to-b from-gray-900 to-ORMblue p-1 shadow-lg channel-card cursor-pointer"
      onClick={() => openURL(props.url)}
    >
      <div className="mt-1 img-box ">
        <img
          alt="New Perspective On Life | On Your Mental Podcast ft. Ryan Ewart"
          src={props.imgSrc}
          className=" h-fit w-full object-cover img"
        />
      </div>
      <div className="p-2">
        <h2 className="text-md text-gray-300 mb-1 font-medium leading-5 tracking-tight">
          {props.description}
        </h2>
        <p className="prose mb-1 text-sm text-gray-300">{props.date}</p>
      </div>
    </div>
  )
}
