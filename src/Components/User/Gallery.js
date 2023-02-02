import React, { Component } from "react";
import Slider from "react-slick";
import Polaroid from "../../assets/User/Polaroid.png";
import Welcome from "../../assets/User/Welcome.png";
import About from "../../assets/User/Aboutus.png";
export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    return (
      <div>
        <Slider
          asNavFor={this.state.nav2}
          ref={(slider) => (this.slider1 = slider)}
        >
          <div>
            <img src={About} height={300} width={400} />
          </div>
          <div>
            <img src={Welcome} height={300} width={400} />
          </div>
          <div>
            <img src={Polaroid} height={300} width={400} />
          </div>
          <div>
            <img src={About} height={300} width={400} />
          </div>
          <div>
            <img src={About} height={300} width={400} />
          </div>
          <div>
            <img src={About} height={300} width={400} />
          </div>
        </Slider>

        <Slider
          asNavFor={this.state.nav1}
          ref={(slider) => (this.slider2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          <div>
            <img src={About} height={100} width={100} />
          </div>
          <div>
            <img src={Welcome} height={100} width={100} />
          </div>
          <div>
            <img src={Polaroid} height={100} width={100} />
          </div>
          <div>
            <img src={About} height={100} width={100} />
          </div>
          <div>
            <img src={About} height={100} width={100} />
          </div>
          <div>
            <img src={About} height={100} width={100} />
          </div>
        </Slider>
      </div>
    );
  }
}
