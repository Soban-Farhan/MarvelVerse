import React, { Component } from 'react';
// import Carousel from 'react-bootstrap/Carousel'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import {data} from "./data.js";
import "./App.css"

  class App extends Component {
    constructor() {
      super();
      this.state = {  result: null, 
                      isLoaded: false,
                      show: false,
                      data: null,
                      modalLoad: false,
                      allData: data,
                      previous: 0,
                      next: 12 };
    }

    componentDidMount() {
      var arr = [];
      [60, 502, 276, 120, 482, 484].map(r => {
        return arr.push([data[r][0], data[r][1], data[r][2]]);
      });

      this.setState({ result: arr, isLoaded: true })
    }

    handleClick(id) {
      
      this.setState({ 
        modalLoad: false,
        show: true
      });

      const proxyurl = "https://cors-anywhere.herokuapp.com/"
      fetch(proxyurl + 'https://superheroapi.com/api/1588223984659099/' + id.toString(), {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Origin': ''
        }
      })
      .then(res => res.json())
      .then((result) => {
        console.log('proxyurl', proxyurl);
        this.setState({ 
          data: result,
          modalLoad: true
        });
      })
      .catch((error) => console.error("Can’t access api. Error: " + error))
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
                    { this.state.allData.slice(this.state.previous, this.state.next ).map( x => {
                      return (
                        <Col xs={6} lg={2} className='p-2'>
                          <div className="border rounded h-100 shadow" onClick={ () => this.handleClick(x[0]) }>
                            <Card className="img-container" style={{ backgroundImage: 'url('+ x[2] +')' }}>
                            </Card>
                            <p className="p-3" > {x[1]} </p>
                          </div>
                        </Col>
                      )
                    })}
                    <Col xl={12}>
                      <p className="p-1"></p>
                      <Row>
                        <Col xs={6}>
                          <p className="p-2 text-center">
                            { this.state.previous > 0 ? <button className="btn btn-md btn-primary" onClick={() => this.setState({ previous: this.state.previous -12, next: this.state.next - 12 }) }> <i className="fas fa-angle-left"></i> Previous </button> : null }
                              
                          </p>
                        </Col>
                        <Col xs={6} className="text-right">
                          <p className="p-2 text-center">
                          { this.state.next < data.length ? <button className="btn btn-md btn-primary" onClick={() => this.setState({ previous: this.state.next, next: this.state.next + 12 }) }> Next <i className="fas fa-angle-right"></i> </button> : null }
                          </p>
                        </Col>
                      </Row>
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
                        { !this.state.modalLoad ? 
                          <p> Loading </p> 
                        :  <>
                            <Row>
                              <Col xs={3} lg={4}>
                                <Card className="border rounded shadow">
                                  <img src={this.state.data?.image.url} width="100%" alt="" />
                                </Card>
                              </Col>
                              <Col xs={9} lg={7}>
                                <h5 className="card-title m-0" style={{ fontSize: "1.6rem" }}>{this.state.data?.name} {/* ({this.state.data?.id}) */}</h5>
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
                                  <Col lg={12}>
                                    <hr/>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </>
                        }
                      </Modal.Body>
                    </Modal>
                  </Row>
                </>
              }
            }
  }

export default App
