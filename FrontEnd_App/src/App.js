import React, { Component } from "react";
import Web3 from "web3";
import { SIMP_STORAGE_ADDRESS, SIMP_STORAGE_ABI } from "./config.js";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./App.css";
import QRCode from 'qrcode.react';
class App extends Component {
  // const today = new Date().toISOString().slice(0, 10);
  // const [date, setDate] = useState(today);
  state = {
    result: "No result",
  };

  myFunction =() =>{
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");

  }

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
        msg: "Scan Successful",
        dis: false,
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };

  constructor() {
    super()
    this.state = {
      account:"No address associated",
      val:"",
      result: " ",
      dis: true,
      msg2: "",
      simpcontract: '',
      value:"",
      value2:"",
      hash:"",
      hash2:"",
      isverify:"",
      va:"",
      qrdata: "",
      alertmsg: "",
      date:""
    }
  }

  componentDidMount() {
    this.loadBlockchainData();
    // this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3("HTTP://127.0.0.1:7545");
    const simpstorage = new web3.eth.Contract(
      SIMP_STORAGE_ABI,
      SIMP_STORAGE_ADDRESS
    );
    this.setState({ simpcontract: simpstorage });
  }

  async sign(web3, text, addr) {
    await web3.eth.sign("0x" + this.toHex(text), addr).then((result) => {
      this.setState({
        signature: result.substr(2),
      });
    });
    this.state.r = this.state.signature.slice(0, 64);
    this.state.s = this.state.signature.slice(64, 128);
    this.state.v = this.state.signature.slice(128, 130);
    //this.state.v_dec=web3.utils.toDecimal(this.state.v)
    console.log(this.state.signature);
    console.log(this.state.r);
    console.log(this.state.s);
    console.log(this.state.v_dec);
  }

  async getHashQR(Aadhaar, simpstorage) {
    await simpstorage.methods
      .calculateHash(Aadhaar)
      .call()
      .then((res) => {
        this.setState({ hash: res });
      });

    // this.setState({value: value})
    // console.log(this.state.value)
  }
  
  parsePetitionList(str) {
    // return str
    var str2 = "";
    var x = str.split(",");
    for (var i = 0; i < x.length; i++) {
      str2 += "\nPetitioner: ";
      str2 += x[i];

      str2 += "\nName: ";
      str2 += x[i + 1];

      str2 += ", Votes received: ";
      str2 += x[i + 2];

      str2 += ", Voters: ";
      // if(x[i+3].length==0){
      //   str2+="None";
      //   str2+="\n";
      //   continue;
      // }
      str2 += x[i + 3];
      str2 += "\n";
      i += parseInt(x[i + 3]);
      if (parseInt(x[i + 3]) == 0) {
        i++;
      }
      i += 3;
      i++;
      str2 += "\n";
    }
    return str2;
  }

  toHex(str) {
    var hex = "";
    for (var i = 0; i < str.length; i++) {
      hex += "" + str.charCodeAt(i).toString(16);
    }
    return hex;
  }

  async getUserData(id, simpstorage){
    const value = await simpstorage.methods.getVaccinationRecord(id.toString()).call({from: this.state.account}).catch((error) => {alert("User Vaccination record doesn't exist/ Not Authorized")})
    console.log(value)

    if( value!=null) {
      const val=this.parseUserData(value.toString())
      this.setState({value: val.toString()})
      this.setState({qrdata: val.toString()})
    }
    else{
      this.setState({value: "not found"})
      this.setState({qrdata: "not found"})
    }
  }

  async getHash(Aadhaar, simpstorage) {
    const checkIfUserExists = await simpstorage.methods.userExists(Aadhaar).call({from: this.state.account}).catch((error) => {alert("wrong Aadhar")});
    
    if(checkIfUserExists==true || checkIfUserExists=="true"){
      const value = await simpstorage.methods
      .calculateHash(Aadhaar.toString())
      .call()
      .catch((error) => {
        alert("User Vaccination record doesn't exist");
      });
      this.setState({hash2: value})
      console.log(value);
    }else{
        alert("User is not registered")
    }
  }

  async getUserDataForOthers(id, simpstorage) {
    const checkIfUserExists = await simpstorage.methods.userExists(id).call({from: this.state.account}).catch((error) => {alert("wrong Aadhar")});
    if(checkIfUserExists==false)alert("User is not registered");

    const value = await simpstorage.methods
      .getVaccinationHash(id.toString())
      .call({from: this.state.account})
      .catch((error) => {
        alert("User Vaccination record doesn't exist");
      });

      console.log(value.toString());
    if (value != null) {
      this.setState({ value2: value });
      if (this.state.hash2 == this.state.value2) {
        this.setState({ isverify: "Hash Verified with Blockchain" });
      } else {
        this.setState({ isverify: "Hash DOES NOT Verify with Blockchain" });
      }
    }
  }
  parseUserData(str) {
    // return str
    var str2 = "";
    var x = str.split(",");
    for (var i = 0; i < x.length; i++) {
      if (i == 0) {
        str2 += "\nAadhaar/ID: ";
        str2 += x[i];
      } else if (i == 1) {
        str2 += "\nUser_address: ";
        str2 += x[i];
      } else if (i == 2) {
        str2 += "\nCountry: ";
        str2 += x[i];
      } else if (i == 3) {
        str2 += ", Name: ";
        str2 += x[i];
      } else if (i == 4) {
        str2 += ", Gender: ";
        str2 += x[i]
        console.log(x[i]);
      } else if (i == 5) {
        str2 += "\nCreated by: ";
        str2 += x[i];
      } else if (i == 6) {
        str2 += "\nHash: ";
        str2 += x[i];
      } else {
        if(x[i].length==0){
          str2 += "Vaccination status: Not yet vaccinated"
          break;
        }
        str2 += "\nVaccination: ";
        str2 += x[i];
        str2 += ",BatchID: ";
        str2 += x[i + 1];
        str2 += "\nAdded by: ";
        str2 += x[i + 2];
        str2 += ",AdministrationDate: ";
        str2 += x[i + 3];
        str2 += ", Location: ";
        str2 += x[i + 4];
        i += 4;
      }
    }

    return str2;
  }
  async getPetitionData(simpstorage) {
    const val = await simpstorage.methods.viewPetitions().call();
    console.log(val.length);
    console.log(val);
    if(val.length==0){
      this.setState({petitions: "No petitions"});
      return;
    }
    let val2 = "";
    for(let i=0; i<val.length; i++){
      val2 += this.parsePetitionList(val[i].toString());
    }
    this.setState({ petitions: val2 });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
  }


  async getVAData(simpstorage) {
    const check = await simpstorage.methods.checkIfVaccinationAuthority(this.state.account).call().catch((error)=>{alert("Only Vaccination Authorities are allowed to view")});
    if(check=='false' || check==false){
      alert("Only Vaccination Authorities are allowed to view");
    }else{
        const value = await simpstorage.methods.getVaccinationAuthorities().call();
        const val = this.parseList(value.toString());
        this.setState({ va: val });
    }

  }
  async getmsg() {
    this.setState({ msg2: "Vote Casted" });
  }
  parseList(str) {
    var str2 = "";
    for (var i = 0; i < str.length; i++) {
      if (str[i] == ",") {
        str2 += "\n";
      } else {
        str2 += str[i];
      }
    }
    return str2;
  }
  render() {
    return (
      <div className="App-header">
        <div className="bg-card" style={{ borderRadius: "4rem" }}>
          {/*<div className="image">*/}
          <img
            className="image"
            src="./image.jpg"
            style={{ borderRadius: "90rem", width: "30rem", height: "30rem" }}
          />
          <div className="vl" />
         
          {/*</div>*/}
          {/*<div className="tabs">*/}
          <Tabs className="tabs">
            <TabList style={{}}>
              <Tab className="tab active"><b>Register user</b></Tab>
              <Tab className="tab"><b>Register Vaccination</b></Tab>
              <Tab className="tab"><b>Get Record</b></Tab>
              <Tab className="tab"><b>Get Hash/ Verify</b></Tab>
              <Tab className="tab"><b>Vote</b></Tab>
              <Tab className="tab"><b>Add Petition</b></Tab>
            </TabList><br/><br/><br/>

            <div class="registration-heading"><b>USING ADDRESS: {this.state.account}</b></div>
            <TabPanel style={{}}>
              {/*  // function registerUser(string memory _id, string memory _name, bool _gender, string memory _nationality,*/}
              {/*//  address _user_address) public onlyVaccinationAuthority{*/}
              <div>
                <h1 className="green"> Welcome! </h1>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const accNum = new FormData(event.target).get("accountNum");
                    this.state.account = accNum;
                    this.setState({ account: accNum });
                    this.handleSubmit(event);
                  }}
                >
                <input
                    id="acnum"
                    className="wrapbox"
                    name="accountNum"
                    type="accnum"
                    defaultValue={this.props.username}
                    require
                    style={{background: "#ffffff" ,fontSize:"20px"}}
                  />
                 
                    
                  <input
                    type="submit"
                    hidden=""
                    value="Use Address"
                    className="button1"
                    style={{
                      width: "8rem",
                    
                      marginLeft: "1rem",
                      fontSize:"20px"
                    }}
                  />
                </form>
                <h4 class="registration-heading">USER REGISTRATION</h4>
               

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const Aadhaar = new FormData(event.target).get("Aadhaar");
                    const name = new FormData(event.target).get("name");
                    const countryName = new FormData(event.target).get(
                      "countryName"
                      );
                      const gender = new FormData(event.target).get("gender");
                      console.log(gender);
                      this.state.alertmsg = name + " has been registered with Aadhaar Card number " + Aadhaar;
                    // if(gender=="0" || gender==0)gender="Male";
                    // else gender = "Female";
                    const addr = new FormData(event.target).get("addr");

                    this.state.simpcontract.methods
                      .registerUser(Aadhaar, name, gender, countryName, addr)
                      .send({ from: this.state.account, gas: 900000 })
                      .catch((error) => {
                        this.setState({
                          alertmsg: "",
                          err2: "User already exists/only Authority is allowed to register",
                        });
                      });
                    if(this.state.alertmsg.length>0)alert(this.state.alertmsg);
                    this.loadBlockchainData();
                    this.handleSubmit(event);
                  }}
                >
                <input
                id="Aadhaar" 
                className="wrapbox"
                name="Aadhaar"
                type="text"
                placeholder="AADHAR NO."
                required
                style={{background: "#ffffff", fontSize:"20px"}}
                pattern="[0-9]{12}"
              />
                  <input
                    id="name" 
                    className="wrapbox"
                    name="name"
                    type="text"
                    placeholder="FULL NAME"
                    required
                    style={{background: "#ffffff",marginLeft:"30px",fontSize:"20px"}}
                  /><br/>
                  <br/>
                  {/*<input id="gender" name ="gender" type="radio" placeholder="gender" required style={{borderRadius:"1rem",background:"#ffffff"}}  />*/}
                  <select id="gender" name="gender" 
                  className="space">
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                  <input
                    id="countryName" 
                    className="wrapbox"
                    name="countryName"
                    type="country"
                    placeholder="COUNTRY NAME"
                    required
                    style={{ background: "#ffffff",marginLeft:"30px" ,fontSize:"20px",width:"425px"}}
                  /><br/><br/>
                  <input
                    id="addr" 
                    className="wrapbox"
                    name="addr"
                    type="text"
                    placeholder=" ADDRESS"
                    required
                    style={{background: "#ffffff",fontSize:"20px",width:"415px",  }}
                  />
                  <input
                    type="submit" 
                    className="wrapbox"
                    hidden=""
                    style={{
                      width: "8rem",
                      color: "#ffffff",
                      marginLeft: "1rem",
                      fontSize:"20px"
                    }}
                  />
                </form>
                <p>{this.state.err2}</p>
              </div>
            </TabPanel>
            <TabPanel style={{}}>
              {/*function addVaccination(string memory user_id, string memory _vacName, string memory _batchID, string memory location, string memory date) public onlyVaccinationAuthority{*/}

              <div>
                <h2 className="green"> Register Vaccination </h2>
                <h1 class="registration-heading"> Enter Vaccination Details:</h1>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();

                    const Aadhaar = new FormData(event.target).get("Aadhaar");
                    // const check = this.state.simpcontract.methods
                    // .userExists(Aadhaar.toString())
                    // .send({ from: this.state.account, gas: 900000 })
                    // .catch((error) => {alert("no bro")});
                    // console.log(check);
                    // if(check=='true' || check==true){
                      const vacName = new FormData(event.target).get("vacName");
                      const batchID = new FormData(event.target).get("batchID");
                      const _location = new FormData(event.target).get(
                      "_location"
                      );
                      const date = new FormData(event.target).get("date");
                      console.log(Aadhaar);
                      console.log(vacName);
                      console.log(batchID);
                      console.log(_location);
                      console.log(date);
                      this.state.simpcontract.methods
                      .addVaccination(
                        Aadhaar.toString(),
                        vacName.toString(),
                        batchID.toString(),
                        _location.toString(),
                        date.toString()
                        )
                        .send({ from: this.state.account, gas: 900000 })
                        .catch((error) => {
                          alert("Only Vaccination Authorities are allowed");
                        });
                        // Only Vaccination Authorities are allowed
                      // }else{
                        // alert("User doesn't exits")
                      // }
                    // alert("user with " + Aadhaar + "vaccinated");
                    this.loadBlockchainData();
                    this.handleSubmit(event);
                  }}
                >
                  <input
                    id="Aadhaar"
                    className="wrapbox"
                    name="Aadhaar"
                    type="text"
                    placeholder="AADHAR NO."
                    required
                    style={{ background: "#ffffff",fontSize:"20px" }}
                    pattern="[0-9]{12}"
                  />
                  <input
                    id="vacName"
                    className="wrapbox"
                    name="vacName"
                    type="text"
                    placeholder="VACCINATION NAME"
                    required
                    style={{background: "#ffffff",fontSize:"20px",marginLeft:"30px" }} 
                  /><br/><br/>
                  <input
                    id="batchID"
                    className="wrapbox"
                    name="batchID"
                    type="text"
                    placeholder="BATCH ID" 
                    pattern="[0-9]{4}"
                    required
                    style={{ background: "#ffffff",fontSize:"20px"}}
                  />
                  <input
                    id="_location"
                    className="wrapbox"
                    name="_location"
                    type="text"
                    placeholder="LOCATION"
                    required
                    style={{ background: "#ffffff",fontSize:"20px",marginLeft:"30px" }}
                  /><br/><br/>
                  <input className="wrapbox" id="date" name ="date" type="date" placeholder="date" required style={{borderRadius:"1rem",background:"#ffffff"}}  />
                  <input
                    type="submit"
                    className="button1"
                    hidden=""
                    style={{
                      width: "8rem",
                    
                      marginLeft: "1rem",
                      fontSize:"20px"
                    }}
                  />
                </form>
              </div>
            </TabPanel>
            <TabPanel style={{}}>
              <div>
              <h1 className="green">Only Vaccination Authority/User</h1>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                      const userId = new FormData(event.target).get("getName");
                      this.getUserData(userId, this.state.simpcontract)
                      .catch((error) => {
                        this.setState({
                          err: "You need to login first",
                        });
                        alert(this.state.err)
                      });
                    // this.loadBlockchainData()
                  }}
                >
                  <input
                    type="text"
                    className="wrapbox"
                    id="getName"
                    name="getName"
                    placeholder="AADHAR NO."
                    required
                    style={{ background: "#ffffff",fontSize:"20px" }}
                    pattern="[0-9]{12}"
                  />
                  <input
                    type="submit"
                    className="button1"
                    hidden=""
                    value="Get"
                    style={{
                      width: "8rem",
                    
                      marginLeft: "1rem",
                      fontSize:"20px"
                    }}
                  />
                </form><br/>
                {/* <p style={{ whiteSpace: "pre-wrap" }}>{this.state.value}</p> */}
                <div className="popup" onClick={this.myFunction} >Click to view details!
                <span style={{ whiteSpace: 'pre-wrap' }} id="myPopup" className="popuptext">{this.state.value} </span></div>
                <div></div>
                <div>
                    <QRCode 
                    style={{whiteSpace: 'pre-wrap',}} 
                    value={this.state.qrdata} 
                    size={128}
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="L"
                    
                    />
                  
                    <button className="download" onClick={() =>{
                        const canvas = document.querySelector('canvas');
                        const pngUrl = canvas.toDataURL('image/png', "image/octet-stream");
                        const downloadLink = document.createElement('a');
                        downloadLink.href = pngUrl;
                        downloadLink.download = 'qrcode.png';
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                    }}>Download QR Code</button>
                    
                  
                </div>
              </div>
              <div style={{ marginTop: "18rem" }}></div>
            </TabPanel>
            <TabPanel style={{}}>
              <div>
                <div className="sub-bg-card">
                  <div
                    style={{
                      paddingLeft: "5vw",
                      marginRight: "0vw",
                      width: "55vw",
                      flex: 1,
                    }}
                  >
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        this.getHashQR(
                          this.state.result,
                          this.state.simpcontract
                        );
                        // this.loadBlockchainData()
                        console.log("here");
                        console.log(this.state.value);
                      }}
                    >
                      {/*<input type="text" id="getName" name="getName" placeholder="Domain Name"required style={{borderRadius:"1rem",background:"#ffffff"}}/>*/}

                      
                    </form>
                  </div>
                  <div
                  style={{ paddingRight: "10vw", width: "100px", flex: 1 }}
                ><br/><br/><br/>
                  <h3 className="registration-heading" style={{marginLeft:"-250px"}}>Enter the following details:</h3>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();

                      const Aadhaar = new FormData(event.target).get("Aadhaar");

                      this.getHash(Aadhaar.toString(), this.state.simpcontract);
                    }}
                  >
                    <input
                      id="Aadhaar"
                      className="wrapbox"
                      name="Aadhaar"
                      type="number"
                      placeholder="AADHAR NO."
                      required
                      style={{ borderRadius: "1rem",background: "#ffffff",fontSize:"20px",marginLeft:"-250px"}}
                      pattern="[0-9]{12}"
                      />

                    <input
                      type="submit"
                      className="button1"
                      hidden=""
                      style={{
                        borderRadius: "1rem",
                        width: "8rem",
                        
                        marginLeft: "1rem",
                        fontSize:"20px"
                      }}
                    />
                  </form>
                </div>
              </div>
              <div>
                {/* <p>QR Hash:{this.state.hash}</p> */}
                <p style={{ marginLeft:"44px"}}><b>Hash: {this.state.hash2}</b></p>
                <h3 className="registration-heading">Verify Results With Blockchain</h3>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const userId = new FormData(event.target).get("getName");
                    this.getUserDataForOthers(
                      userId,
                      this.state.simpcontract
                    );
                    // this.loadBlockchainData()
                  }}
                >
                  <input
                    type="text"
                    className="wrapbox"
                    id="getName"
                    name="getName"
                    placeholder="AADHAR NO."
                    required
                    style={{ borderRadius: "1rem",borderRadius: "1rem",background: "#ffffff",fontSize:"20px" }}
                    pattern="[0-9]{12}"
                    />
                  <input
                    type="submit"
                    className="button1"
                    hidden=""
                    value="Get"
                    style={{
                      borderRadius: "1rem",
                      width: "8rem",
                     
                      marginLeft: "1rem",
                      fontSize:"20px"
                    }}
                  />
                </form>
              </div>
              <p>Hash Vaccination Verification: {this.state.isverify}</p>
            </div>
              {/*<div style={{marginTop:"20rem"}}></div>*/}
            </TabPanel>
            <TabPanel style={{}}>
              <div>
                <h1 className="registration-heading">Vote for a Petition:</h1>
               

                <form
                  onSubmit={(event) => {
                    event.preventDefault();

                    const addr = new FormData(event.target).get("addr");

                    this.state.simpcontract.methods
                      .vote(addr)
                      .send({ from: this.state.account, gas: 900000 })
                      .catch((error) => {
                        alert(
                          "You've already voted for them/n OR They're already added to authorities"
                        );
                      });
                    this.getmsg();
                  }}
                >
                  <input
                    id="addr"
                    className="wrapbox"
                    name="addr"
                    type="text"
                    placeholder="ENTER ADDRESS"
                    required
                    style={{ background: "#ffffff",fontSize:"20px"}}
                  />
                  <input
                    type="submit"
                    className="button1"
                    hidden=""
                    style={{
                      width: "8rem",
                     
                      marginLeft: "1rem",
                      fontSize:"20px"
                    }}
                  />
                </form>
                <p>{this.state.msg2}</p>
                {/*see VAs*/}
                <div>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      this.getVAData(this.state.simpcontract).catch((error)=>{alert("Login first")});
                      this.state.va = "";
                    }}
                  >
                    <input
                      type="submit"
                      className="button1"
                      hidden=""
                      value="VIEW AUTHORITIES"
                      style={{
                        width: "13rem",
                       
                        marginLeft: "1rem",
                        fontSize:"20px"
                      }}
                    />
                  </form>
                  <p >{this.state.va}</p>
                </div>
              </div>

              <div style={{ marginTop: "18rem" }}></div>
            </TabPanel>
            <TabPanel>
              <div>
                <h1 className="green">Register as Vaccinaton Authority:</h1>
               
                <p>Click to submit petition:</p>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();

                    const name = new FormData(event.target).get("name");

                    this.setState({ err: "Done!" });
                    this.state.simpcontract.methods
                      .submitPetition(name)
                      .send({ from: this.state.account, gas: 900000 })
                      .catch((error) => {
                        this.setState({
                          err: "You already have a pending a petition",
                        });
                      });

                    this.loadBlockchainData();
                    this.handleSubmit(event);
                  }}
                >
                  <input
                    id="name"
                    className="wrapbox"
                    name="name"
                    type="text"
                    placeholder="ENTER NAME"
                    required
                    style={{ fontSize:"20px", background: "#ffffff" }}
                  />

                  <input
                    type="submit"
                    className="button1"
                    hidden=""
                    style={{
                      width: "8rem",
                      
                      marginLeft: "1rem",
                      fontSize:"20px"
                    }}
                  />
                </form>
                <p>{this.state.err}</p>
                {/*see petitions*/}
                <div>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();

                      this.getPetitionData(this.state.simpcontract);
                    }}
                  >
                    <input
                      type="submit"
                      // className="wrapbox"
                      hidden=""
                      value="VIEW PETITIONS"
                      style={{
                        width: "13rem",
                        color: "#ffffff",
                        marginLeft: "1rem",
                        fontSize:"20px"
                      }}
                      className="wrapbox popup" onClick={this.myFunction}
                    />
                  </form>
                  <div></div>
                  <div className="popup" onClick={this.myFunction} style={{marginRight:"150px"}}>
                <span style={{ whiteSpace: 'pre-wrap' }} id="myPopup" className="popuptext">{this.state.petitions} </span></div>
                <div>
                </div>
                  
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default App;
