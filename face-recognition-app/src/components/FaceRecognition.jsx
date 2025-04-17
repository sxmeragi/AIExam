import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

const FaceRecognition = ({ onFaceRecognized }) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      ]);
      setLoading(false);
      startVideo();
    };

    loadModels();

    return () => {
      const video = videoRef.current;
      if (video) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Error starting video', err));
  };

  const handleRecognition = async () => {
    if (videoRef.current && !loading) {
      const video = videoRef.current;
      const detections = await faceapi.detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length > 0) {
        const labeledFaceDescriptors = await loadLabeledImages();
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
        const bestMatch = faceMatcher.findBestMatch(detections[0].descriptor);

        const role = bestMatch.label;
        const accuracy = (1 - bestMatch.distance) * 100;

        onFaceRecognized(role, accuracy);
      }
    }
  };

  const loadLabeledImages = async () => {
    const labels = ['director', 'worker', 'guest'];
    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`/labeled_images/${label}/${i}.jpg`);
          const detections = await faceapi.detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          descriptions.push(detections.descriptor);
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  };

  return (
    <div>
      <h2>Face Recognition</h2>
      {loading ? (
        <p>Loading models...</p>
      ) : (
        <>
          <video ref={videoRef} autoPlay muted width="100%" height="auto" />
          <button onClick={handleRecognition}>Recognize Face</button>
        </>
      )}
    </div>
  );
};

export default FaceRecognition;
