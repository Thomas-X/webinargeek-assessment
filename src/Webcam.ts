import {MutableRefObject} from "react";

class Webcam {
    static constraints: MediaStreamConstraints = {
        video: true,
        audio: false
    }

    async getDevices() {
        console.log(await navigator.mediaDevices.enumerateDevices())
    }

    async getUserMedia(videoRef: MutableRefObject<HTMLVideoElement | null>): Promise<{ stream: MediaStream, tracks: MediaStreamTrack[] }> {
        const stream = await navigator.mediaDevices.getUserMedia(Webcam.constraints)
        const tracks = stream.getVideoTracks();
        console.log(tracks)
        console.log(`Using video device ${tracks[0].label}`)
        stream.onremovetrack = () => console.log("Video stream ended")
        return {stream, tracks};
    }

    async enableWebcam(videoRef: MutableRefObject<HTMLVideoElement | null>, stream: MediaStream) {
        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;
    }

    async disableWebcam(videoRef: MutableRefObject<HTMLVideoElement | null>, stream: MediaStream, tracks: MediaStreamTrack[]) {
        if (!videoRef.current) return;
        videoRef.current.srcObject = null;
        for (const track of stream.getTracks()) {
            track.stop()
        }
    }
}

export default new Webcam()