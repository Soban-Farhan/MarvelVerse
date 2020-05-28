import React, { Component, useState } from 'react';
// import Carousel from 'react-bootstrap/Carousel'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import {data} from "./data.js";
import "./App.css"

  // function getRandomInt(max) {
  //   return Math.floor(Math.random() * Math.floor(max));
  // }

  // function App() {
    
  //   return (
  //     // <div className="App">
  //     //   <header className="App-header">
  //     //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
  //     //     <p>
  //     //       Edit <code>src/App.js</code> and save to reload.
  //     //     </p>
  //     //     <a
  //     //       className="App-link"
  //     //       href="https://reactjs.org"
  //     //       target="_blank"
  //     //       rel="noopener noreferrer"
  //     //     >
  //     //       Learn React
  //     //     </a>
  //     //     <LetterSelect />
  //     //   </header>
  //     // </div>
  //     // <ControlledCarousel />
  //     <Data />
  //   );
  // }

  // function ControlledCarousel() {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };

//   let test = []
//   var data = fetch("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=f275e6f3ee0310802f431faa972c784a&hash=34e556375776ba968545cf6e5e6de0dd&offset=" + getRandomInt(1489).toString() )
//                 .then(res => res.json())
//                 .then((result) => {
//                   for (let index = 0; index < 3; index++) {
//                     test.push(result.data.results[index].thumbnail.path + "." + result.data.results[index].thumbnail.extension)
//                   }
//                 })
//   return (
//     <ul>
//       {test.map(x => {
//           return <li>
//             {x}
//           </li>
//       })}
//     </ul>
//     // <Carousel activeIndex={index} onSelect={handleSelect}>,
//     //    <Carousel.Item>
//     //     <img
//     //       className="d-block w-100"
//     //       src=""
//     //       alt="First slide"
//     //     />
//     //      <Carousel.Caption>
//     //       <h3>First slide label</h3>
//     //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//     //     </Carousel.Caption> 
//     //   </Carousel.Item>
//     //   <Carousel.Item>
//     //     <img
//     //       className="d-block w-100"
//     //       src="holder.js/800x400?text=Second slide&bg=282c34"
//     //       alt="Second slide"
//     //     />
//     //   </Carousel.Item>
//     //   <Carousel.Item>
//     //     <img
//     //       className="d-block w-100"
//     //       src="holder.js/800x400?text=Third slide&bg=20232a"
//     //       alt="Third slide"
//     //     />
//     //   </Carousel.Item>
//     // </Carousel>
//   );
// }

  class App extends Component {
    constructor() {
      super();
      this.state = {  result: null, 
                      isLoaded: false,
                      show: false,
                      data: null };
    }

    componentDidMount() {
      var arr = [];
      [60, 507, 280, 123, 487, 489].map(r => {
        arr.push([data[r][0], data[r][1], data[r][2]]);
      });
      this.setState({ result: arr, isLoaded: true })
    }

    async handleClick(id) {
      await fetch('https://superheroapi.com/api/2965247393590510/' + id.toString())
      .then(res => res.json())
      .then((result) => {
        this.setState({ 
          show: true, 
          data: result,
        });
      })
      
    }

    render() {
      if(!this.state.isLoaded){
        return <div> Loading..... </div>
      } else {
        return  <Row>
                  { this.state.result.map( x => {
                    return  <Col xs={6} lg={2}>
                              <div onClick={ () => this.handleClick(x[0]) }>
                                <Card className="img-container" style={{ backgroundImage: 'url('+ x[2] +')' }}>
                                </Card>
                                <p className="p-2" > {x[1]} </p>
                              </div>
                            </Col>
                  })}
                    <Modal
                      size="xl"
                      show={this.state.show}
                      onHide={() => this.setState({ show: false })}
                      dialogClassName="modal-90w"
                      aria-labelledby="example-custom-modal-styling-title"
                    >
                      <Modal.Header closeButton>
                      </Modal.Header>
                      <Modal.Body>
                        <p>
                          {this.state.data?.id}
                        </p>
                      </Modal.Body>
                    </Modal>
                </Row>
              }
            }
  }

export default App