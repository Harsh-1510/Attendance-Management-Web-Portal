import React from "react";
import Lottie from "react-lottie";
import Auth from "./lottieFiles/Auth.json";

export default function home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Auth,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <br />
      <br />
      <br /> <br />
      <div class="flex-container">
        <div class="flex-item-left">
          <div>
            <Lottie options={defaultOptions} height={200} width={200} />
          </div>
          <div style={{ fontSize: "60%" }}>
            Automated Attendence <br />
            using ML
          </div>
        </div>
        <div class="flex-item-center" style={{ margin: "auto" }}>
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img
                  src="https://puchd.ac.in/asset/pu-logo.png"
                  alt="Avatar"
                  style={{ width: "200px", height: "200px" }}
                />
                <br />
                <strong>Panjab University</strong>
              </div>
              <div class="flip-card-back">
                <p>A university stands for humanism, for tolerance, for reason,
                  for the adventure of ideas and for the search of truth.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-item-right" style={{ margin: "auto" }}>
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/9/94/UIET_logo.png"
                  alt="Avatar"
                  style={{ width: "200px", height: "200px" }}
                />
                <br />
                <strong>UIET</strong>
              </div>
              <div class="flip-card-back">
                <p>
                To be the Front runner in Engineering Education and Research.
                
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
