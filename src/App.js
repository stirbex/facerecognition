import React, { Component } from "react";
import ReactDOM from "react-dom";
import Navigation from "../src/components/Navigation/Navigation";
import Logo from "../src/components/Logo/Logo";
import "./App.css";
import ImageLinkForm from "../src/components/ImageLinkForm/ImageLinkForm";
import Rank from "../src/components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "../src/components/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "f9ec0fe1211144a0bc3ee7c4b5a5fb0d"
});

const particleOptions = {
  particles: {
    number: {
      value: 300,
      density: {
        enable: true,
        color: "red",
        value_area: 800,
        blur: 5
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ""
    };
  }

  onInputChange = event => {
    console.log(event.target.value);
  };

  onSubmit = () => {
    console.log("click");
    app.models
      .predict(
        "a403429f2ddf4b49b307e318f00e528b",
        "https://samples.clarifai.com/face-det1.jpg"
      )
      .then(
        function(response) {
          console.log(response);
        },
        function(err) {
          // there was an error
        }
      );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />

        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onSubmit}
        />
        <FaceRecognition />
      </div>
    );
  }
}

export default App;
