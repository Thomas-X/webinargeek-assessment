import React, {useCallback, useEffect, useMemo} from 'react';
import webcam from "./Webcam"
import {Title} from "./components/Title";
import styled from "styled-components";
import {Player} from "./Player";
import {rootStore} from "./stores/rootStore";

function App() {
    const toggleWebcam = rootStore(state => state.toggleWebcam)
    const webcamEnabled = rootStore(state => state.webcam)
    const onToggleWebcam = useCallback(() => {
        toggleWebcam();
    }, [toggleWebcam])
    const webcamText = useMemo(() => webcamEnabled ? "disable" : "enable", [webcamEnabled])
    return (
        <Root>
            <Container>
                <Title>
                    Webinargeek assessment
                </Title>
                <div>
                    <Button onClick={onToggleWebcam}>
                        {webcamText} webcam
                    </Button>
                </div>
            </Container>
            <Container>
                <Player/>
            </Container>
        </Root>
    );
}

// should normalize this back to button
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  background-color: indianred;
  color: white;
  padding: 1rem;
  margin: 0 1rem;
  flex-grow: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 1rem;
`;

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default App;
