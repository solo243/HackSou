import React from "react";

function SocialWall() {
    return (
        <div className="bg h-screen w-full object-cover overflow-x-hidden">

            <div className="relative h-screen w-full  scrollbar-none ">
                {/* The iframe */}
                <iframe
                    src="https://my.walls.io/souivathonwall?nobackground=1&show_header=0&show_post_info=1&accessibility=0"
                    className="h-screen w-full scrollbar-none scrollbar-hide overflow-hidden "
                    frameBorder="0"
                    allowFullScreen
                    title="Social Wall"
                ></iframe>
                {/* Overlay to hide the marker */}
                {/* <iframe allowfullscreen id="wallsio-iframe" src="" style="border:0;height:800px;width:100%" loading="lazy" allow="camera" title="SOUIVATHON"></iframe> */}

            </div>
        </div>
    );
}

export default SocialWall;
