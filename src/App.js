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
                      data: null,
                      allData: data,
                      scroll: 18 };
    }

    componentDidMount() {
      var arr = [];
      [60, 502, 276, 120, 482, 484].map(r => {
        arr.push([data[r][0], data[r][1], data[r][2]]);
      });
      this.setState({ result: arr, isLoaded: true })
    }

    handleClick(id) {
      fetch('https://superheroapi.com/api/2965247393590510/' + id.toString())
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
        return  <>
                  <Row>
                    <Col xl={12}>
                        <p className="p-2"></p>
                        <h5 className="card-title m-0" style={{ fontSize: "1.5rem" }}>FEATURED CHARACTERS</h5>
                        <hr className="hr"/>
                        <p class="p-2 m-0"></p>
                    </Col>
                  </Row>
                  <Row>
                    { this.state.result.map( x => {
                      return  <Col xs={6} lg={2} className='p-2'>
                                <div className="border rounded h-100 shadow" onClick={ () => this.handleClick(x[0]) }>
                                  <Card className="img-container" style={{ backgroundImage: 'url('+ x[2] +')' }}>
                                  </Card>
                                  <p className="p-3" > {x[1]} </p>
                                </div>
                              </Col>
                    })}
                  </Row>
                  <Row>
                    <Col xl={12}>
                        <p className="p-2"></p>
                        <h5 className="card-title m-0" style={{ fontSize: "1.5rem" }}>CHARACTERS LIST</h5>
                        <hr className="hr"/>
                        <p class="p-2 m-0"></p>
                    </Col>
                  </Row>
                  <Row>
                    { this.state.allData.slice(0, this.state.scroll ).map( x => {
                      return  <Col xs={6} lg={2} className='p-2'>
                                <div className="border rounded h-100 shadow" onClick={ () => this.handleClick(x[0]) }>
                                  <Card className="img-container" style={{ backgroundImage: 'url('+ x[2] +')' }}>
                                  </Card>
                                  <p className="p-3" > {x[1]} </p>
                                </div>
                              </Col>
                    })}
                    <Col xl={12}>
                      <p className="p-1"></p>
                      <p className="p-2 text-center">
                          <button className="btn btn-md btn-primary" onClick={() => this.setState({ scroll: this.state.scroll + 18 }) }> Load More <i className="fas fa-sync-alt"></i> </button>
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Modal
                      size="xl"
                      show={this.state.show}
                      onHide={() => this.setState({ show: false })}
                      aria-labelledby="example-custom-modal-styling-title"
                      centered
                    >
                      <Modal.Body>
                        <Row>
                          <Col xs={3} lg={4}>
                            <Card className="border rounded shadow">
                              <img src={this.state.data?.image.url} width="100%" />
                            </Card>
                          </Col>
                          <Col xs={9} lg={7}>
                            <h5 className="card-title m-0" style={{ fontSize: "1.6rem" }}>{this.state.data?.name} ({this.state.data?.id})</h5>
                            <hr className="hr"/>
                            <p class="p-1 m-0"></p>
                            <Row>
                              <Col lg={6}>
                                <p className="p-1 m-0">
                                  <b><span style={{ fontSize: "13px"}}>Full Name</span></b><br/>
                                  <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.biography['full-name']}</h5>
                                </p>
                              </Col>
                              <Col lg={6}>
                                <p className="p-1 m-0">
                                  <b><span style={{ fontSize: "13px"}}>Alter Ego</span></b><br/>
                                  <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.biography['alter-egos']}</h5>
                                </p>
                              </Col>
                              <Col lg={12}>
                                <p className="p-1 m-0">
                                  <b><span style={{ fontSize: "13px"}}>Place of Birth</span></b><br/>
                                  <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.biography['place-of-birth']}</h5>
                                </p>
                              </Col>
                              <Col lg={6}>
                                <p className="p-1 m-0">
                                  <b><span style={{ fontSize: "13px"}}>Occupation</span></b><br/>
                                  <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.work.occupation}</h5>
                                </p>
                              </Col>
                              <Col lg={6}>
                                <p className="p-1 m-0">
                                  <b><span style={{ fontSize: "13px"}}>Bases (Top 3)</span></b><br/>
                                  <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.work.base.split(",").slice(0, 3).map(x => <li> {x} </li>)}</h5>
                                </p>
                              </Col>
                              <Col lg={12}>
                                <hr/>
                              </Col>
                              <Col lg={6}>
                                <p className="p-1 m-0">
                                  <b><span style={{ fontSize: "13px"}}>Publisher</span></b><br/>
                                  <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.biography.publisher}</h5>
                                </p>
                              </Col>
                              <Col lg={6}>
                                <p className="p-1 m-0">
                                  <b><span style={{ fontSize: "13px"}}>Aliases (Top 3)</span></b><br/>
                                  <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.biography.aliases.slice(0, 3).map(x => <li> {x} </li>) }</h5>
                                </p>
                              </Col>
                              <Col lg={12}>
                                <hr/>
                              </Col>
                              <Col xs={6} lg={2}>
                                <p className="p-1 m-0">
                                  <b><span style={{ fontSize: "13px"}}>Height</span></b><br/>
                                  <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.appearance.height[0]}"</h5>
                                </p>
                              </Col>
                              <Col xs={6} lg={2}>
                                <p className="p-1 m-0">
                                  <b><span style={{ fontSize: "13px"}}>Weight</span></b><br/>
                                  <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.appearance.weight[0]}</h5>
                                </p>
                              </Col>
                              <Col xs={6} lg={2}>
                                <p className="p-1 m-0">
                                  <b><span style={{ fontSize: "13px"}}>Race</span></b><br/>
                                  <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.appearance.race}</h5>
                                </p>
                              </Col>
                              <Col xs={6} lg={2}>
                                <p className="p-1 m-0">
                                  <b><span style={{ fontSize: "13px"}}>Gender</span></b><br/>
                                  <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.appearance.gender}</h5>
                                </p>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={11}>
                            <hr className="hr"/>
                          </Col>
                        </Row>
                      </Modal.Body>
                    </Modal>
                  </Row>
                </>
              }
            }
  }

export default App