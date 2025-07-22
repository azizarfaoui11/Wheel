import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

function KickStream() {
useEffect(()=>{
    const chatIframe = document.querySelector('.chatroom-footer');
console.log('ggg',chatIframe)
},[])

  return (
    <div className="flex flex-col items-center justify-start bg-black space-y-8 min-h-screen pt-10 px-4">
      <div className="flex w-full max-w-screen-xl justify-between items-start space-x-4">
        {/* Stream Player */}
        <div className="relative w-3/4 aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://player.kick.com/Tox211"
            className="top-0 left-0 w-full h-full"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            title="Stream Player"
          ></iframe>
        </div>

        {/* Chat Frame */}
        <div className="relative w-1/4 aspect-[9/16] rounded-xl overflow-hidden shadow-lg">
  <iframe
    src="https://kick.com/popout/Tox211/chat"
    className="top-0 left-0 w-full h-full"
    frameBorder="0"
    scrolling="no"
    allowFullScreen
    title="Chat Room"
  ></iframe>
  <div
    className="absolute bottom-0 left-0 w-full h-16 bg-black"
    style={{ pointerEvents: 'none' }} // Ensures this overlay doesn't block the chat
  ></div>
</div>
      </div>



    </div>
  );
}

export default KickStream;
