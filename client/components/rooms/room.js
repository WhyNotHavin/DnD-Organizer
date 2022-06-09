import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import firebaseDB from "../../../server/db";
const Room = () => {
  const [state, setState] = useState({
    webcamVideo: null,
    remoteVideo: null,
    callInput: "callInput",
  });
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  const pc = new RTCPeerConnection(servers);
  let localStream = null;
  let remoteStream = null;

  const webcamButton = async () => {
    console.log("this ran");
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    // Show stream in HTML video
    let set = await React.createRef(localStream);
    setState({ ...state, webcamVideo: localStream });
    console.log(state);
  };
  remoteStream = new MediaStream();

  // Pull tracks from remote stream, add to video stream
  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
    setState({ ...state, remoteVideo: remoteStream });
  };

  const callButton = async () => {
    // Reference firebaseDB collections for signaling
    const callDoc = firebaseDB.collection("calls").doc();
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    setState({ ...state, callInput: callDoc.id });

    // Get candidates for caller, save to db
    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // Create offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    // Listen for remote answer
    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    // Listen for remote ICE candidates
    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  const answerButton = async () => {
    const callId = state.callInput;
    const callDoc = firebaseDB.collection("calls").doc(callId);
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    // Fetch data, then set the offer & answer

    const callData = (await callDoc.get()).data();

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });

    // Listen to offer candidates

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change);
        if (change.type === "added") {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  return (
    <div>
      <h2>1. Start your Webcam</h2>
      <div className="videos">
        <span>
          <h3>Local Stream</h3>
          <div>
            {state.webcamVideo ? <video ref={state.webcamVideo} /> : <></>}
          </div>
          <video
            id="webcamVideo"
            url={state.webcamVideo}
            autoPlay
            playsInline
          ></video>
        </span>
        <span>
          <h3>Remote Stream</h3>
          <video id="remoteVideo" autoPlay playsInline></video>
        </span>
      </div>
      <button id="webcamButton" onClick={webcamButton}>
        Start webcam
      </button>
      <h2>2. Create a new Call</h2>
      <button id="callButton" disabled onClick={callButton}>
        Create Call (offer)
      </button>

      <h2>3. Join a Call</h2>
      <p>Answer the call from a different browser window or device</p>

      <input id={state.callInput} onClick={answerButton} />
      <button id="answerButton" disabled>
        Answer
      </button>

      <h2>4. Hangup</h2>

      <button id="hangupButton" disabled>
        Hangup
      </button>
    </div>
  );
};

export default connect()(Room);

// const [state, setState] = useState({
//   webcamVideo: {},
//   remoteVideo: {},
//   callButton: { disabled: null },
//   answerButton: { disabled: null },
//   webcamButton: { disabled: null },
// });

// const servers = {
//   iceServers: [
//     {
//       urls: [
//         "stun:stun1.l.google.com:19302",
//         "stun:stun2.l.google.com:19302",
//       ], // free stun server
//     },
//   ],
//   iceCandidatePoolSize: 10,
// };

// // global states
// const pc = new RTCPeerConnection(servers);
// let localStream = null;
// let remoteStream = null;

// const handleWebcam = async () => {
//   // setting local stream to the video from our camera
//   localStream = await navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true,
//   });

//   // initalizing the remote server to the mediastream
//   remoteStream = new MediaStream();

//   // Pushing tracks from local stream to peerConnection
//   localStream.getTracks().forEach((track) => {
//     pc.addTrack(track, localStream);
//   });

//   pc.ontrack = (event) => {
//     event.streams[0].getTracks((track) => {
//       remoteStream.addTrack(track);
//     });
//   };

//   // displaying the video data from the stream to the webpage

//   setState({
//     ...state,
//     webcamVideo: localStream,
//     remoteVideo: remoteStream,
//     callButton: { disabled: false },
//     answerButton: { disabled: false },
//     webcamButton: { disabled: true },
//   });
// };
