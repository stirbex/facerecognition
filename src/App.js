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
      input: "",
      imageURL: "",
      box: {}
    };
  }

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
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
        <FaceRecognition imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default App;