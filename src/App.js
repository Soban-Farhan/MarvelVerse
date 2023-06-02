import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';

// Bootstrap
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'

// Hero Data
import { data } from "./data.js";
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
      fetch(proxyurl + 'https://superheroapi.com/api/2965247393590510/' + id.toString(), {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Origin': ''
        }
      })
      .then(res => res.json())
      .then((result) => {
        this.setState({ 
          data: result,
          modalLoad: true
        });
      })
      .catch((error) => console.error("Can’t access api. Error: " + error))
    }

    randomColor() {
      return Math.floor(Math.random()*16777215).toString(16);
    }

    render() {
      if(!this.state.isLoaded){
        return <div className="p-5 text-center m-0" style={{ fontSize: "1.6rem" }}> 
                  Loading 
                  <ThreeDots
                      type="ThreeDots"
                      color="#56b7a4"
                      width={50}
                      height={50}
                      />
                </div> 
      } else {
        return  <>
                  <Row>
                    <Col xl={12}>
                        <p className="p-2" />
                        <h5 className="card-title m-0 font-karla">FEATURED CHARACTERS</h5>
                        <hr className="hr"/>
                        <p className="p-2 m-0" />
                    </Col>
                  </Row>
                  <Row>
                    { this.state.result.map( x => {
                      return (
                        <Col xs={6} lg={2} className='p-2'>
                          <button onClick={ () => this.handleClick(x[0]) } className="w-100 h-100 p-0 text-left border-transparent m-0 rounded bg-transparent">
                            <div className="border rounded h-100 shadow">
                              <Card className="img-container" style={{ backgroundImage: 'url('+ x[2] +')' }} />
                              <p className="p-3" > {x[1]} </p>
                            </div>
                          </button>
                        </Col>
                      )
                    })}
                  </Row>
                  <p className="p-4" />
                  <Row>
                    <Col xl={12}>
                        <p className="p-2" />
                        <h5 className="card-title m-0 font-karla">CHARACTERS LIST</h5>
                        <hr className="hr"/>
                        <p className="p-2 m-0"/>
                    </Col>
                  </Row>
                  <Row>
                    { this.state.allData.slice(this.state.previous, this.state.next ).map( x => {
                      return (
                        <Col xs={6} lg={2} className='p-2'>
                          <button onClick={ () => this.handleClick(x[0]) } className="w-100 h-100 p-0 text-left border-transparent m-0 rounded bg-transparent">
                            <div className="border rounded h-100 shadow">
                              <Card className="img-container" style={{ backgroundImage: 'url('+ x[2] +')' }} />
                              <p className="p-3" > {x[1]} </p>
                            </div>
                          </button>
                        </Col>
                      )
                    }) }
                    <Col xl={12}>
                      <p className="p-1"/>
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
                          <div className="p-5 text-center m-0" style={{ fontSize: "1.6rem" }}> 
                            Loading 
                            <ThreeDots
                                type="ThreeDots"
                                color="#56b7a4"
                                width={50}
                                height={50}
                                />
                          </div> 
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
                                <p className="p-1 m-0"/>
                                <Row>
                                  <Col lg={6}>
                                    <div className="p-1 m-0">
                                      <strong><span style={{ fontSize: "13px"}}>Full Name</span></strong><br/>
                                      <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.biography['full-name']}</h5>
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="p-1 m-0">
                                      <strong><span style={{ fontSize: "13px"}}>Alter Ego</span></strong><br/>
                                      <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.biography['alter-egos']}</h5>
                                    </div>
                                  </Col>
                                  <Col lg={12}>
                                    <div className="p-1 m-0">
                                      <strong><span style={{ fontSize: "13px"}}>Place of Birth</span></strong><br/>
                                      <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.biography['place-of-birth']}</h5>
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="p-1 m-0">
                                      <strong><span style={{ fontSize: "13px"}}>Occupation</span></strong><br/>
                                      <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.work.occupation}</h5>
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="p-1 m-0">
                                      <strong><span style={{ fontSize: "13px"}}>Bases (Top 3)</span></strong><br/>
                                      <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.work.base.split(",").slice(0, 3).map(x => <li> {x} </li>)}</h5>
                                    </div>
                                  </Col>
                                  <Col lg={12}>
                                    <hr/>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="p-1 m-0">
                                      <strong><span style={{ fontSize: "13px"}}>Publisher</span></strong><br/>
                                      <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.biography.publisher}</h5>
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="p-1 m-0">
                                      <strong><span style={{ fontSize: "13px"}}>Aliases (Top 3)</span></strong><br/>
                                      <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.biography.aliases.slice(0, 3).map(x => <li> {x} </li>) }</h5>
                                    </div>
                                  </Col>
                                  <Col lg={12}>
                                    <hr/>
                                  </Col>
                                  <Col xs={6} lg={2}>
                                    <div className="p-1 m-0">
                                      <strong><span style={{ fontSize: "13px"}}>Height</span></strong><br/>
                                      <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.appearance.height[0]}"</h5>
                                    </div>
                                  </Col>
                                  <Col xs={6} lg={2}>
                                    <div className="p-1 m-0">
                                      <strong><span style={{ fontSize: "13px"}}>Weight</span></strong><br/>
                                      <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.appearance.weight[0]}</h5>
                                    </div>
                                  </Col>
                                  <Col xs={6} lg={2}>
                                    <div className="p-1 m-0">
                                      <strong><span style={{ fontSize: "13px"}}>Race</span></strong><br/>
                                      <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.appearance.race}</h5>
                                    </div>
                                  </Col>
                                  <Col xs={6} lg={2}>
                                    <div className="p-1 m-0">
                                      <strong><span style={{ fontSize: "13px"}}>Gender</span></strong><br/>
                                      <h5 className="card-title m-0" style={{ fontSize: "15px" }}>{this.state.data?.appearance.gender}</h5>
                                    </div>
                                  </Col>
                                  <Col lg={12}>
                                    <hr/>
                                  </Col>
                                  {/* {this.state.data?.powerstats[''] } */}
                                  {/* <Col xs={6}>
                                    <DonutChart 
                                      data={[{
                                        label: 'Give you up',
                                        value: 25
                                      },
                                      {
                                          label: '',
                                          value: 75,
                                          isEmpty: true
                                      }]}
                                      startAngle={-90}
                                      clickToggle={false}
                                    />
                                  </Col> */}
                                </Row>
                              </Col>
                            </Row>
                            <Row>
                            { Object.keys(this.state.data?.powerstats).map(x => { 
                              return (
                                <> 
                                { this.state.data?.powerstats[x] !== "null" ? 

                                    <Col xs={6} lg={4} className="text-left">
                                      <p className="p-3 font-karla-normal">
                                        <strong> {x.toUpperCase()}: </strong>
                                        <br/>
                                        <label className="font-karla-heavy" style={{
                                          color: "#" + this.randomColor()
                                        }}>
                                          { this.state.data?.powerstats[x] }
                                        </label>
                                        /100
                                      </p>
                                    </Col>
                                
                                  : null 
                                }
                                </>
                              )
                            }) }
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
