import create from "zustand";

type State = {
    permissionsMessage: string | null,
    webcam: boolean,
    setWebcam: (v: boolean) => void,
    toggleWebcam: () => void,
    setPermissionsMessage: (permissionsMessage: string) => void
}

export const rootStore = create<State>(set => ({
    permissionsMessage: null,
    webcam: false,
    setWebcam: (v) => set(state => ({webcam: v})),
    toggleWebcam: () => set(state => ({webcam: !state.webcam})),
    setPermissionsMessage: (permissionsMessage) => set(state => ({permissionsMessage}))
}))