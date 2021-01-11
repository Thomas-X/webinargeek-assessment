import React, {MutableRefObject, useEffect, useRef} from 'react';
import webcam from "./Webcam";
import {rootStore} from "./stores/rootStore";
import styled from "styled-components";
import {Title} from "./components/Title";

interface Props {

}

export const Player: React.FC = (props: Props) => {
    const permissionsMessage = rootStore(state => state.permissionsMessage);
    const setPermissionsMessage = rootStore(state => state.setPermissionsMessage);
    const webcamEnabled = rootStore(state => state.webcam)
    const setWebcam = rootStore(state => state.setWebcam);
    const videoPlayer = useRef(null);
    useEffect(() => {
        (async () => {
            if (!videoPlayer || !videoPlayer.current) return;
            let stream, tracks;
            try {
                let userMedia = await webcam.getUserMedia(videoPlayer)
                stream = userMedia.stream;
                tracks = userMedia.tracks;

                if (!stream) return;
                if (webcamEnabled) {
                    try {
                        await webcam.enableWebcam(videoPlayer, stream);
                    } catch (e) {
                        console.log('something went wrong when enabling webcam', e)
                    }
                } else {
                    try {
                        await webcam.disableWebcam(videoPlayer, stream, tracks);
                    } catch (e) {
                        console.log('something went wrong when disabling webcam', e)
                    }
                }
            } catch (e) {
                if (e.name === "NotAllowedError") {
                    setWebcam(false)
                    setPermissionsMessage("You need to allow the use of your camera")
                }
                console.log(e)
            }
        })()
    }, [videoPlayer, webcamEnabled])

    return (
        <>
            {(!permissionsMessage || permissionsMessage.length > 0) && <Title>{permissionsMessage}</Title>}
            <Video autoPlay={true} ref={videoPlayer}>
            </Video>
        </>
    )
}

const Video = styled.video<{ autoPlay: boolean }>`
  width: 500px;
  height: 500px;
`;