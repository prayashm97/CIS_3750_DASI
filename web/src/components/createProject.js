import React from "react"
import Upload from '../components/Upload';
import { TextField } from "@material-ui/core";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

export class CreateProject extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currProject: {
                _id: "",
                timing: 3,
                slides: [],
                name: "",
            }
        }
    }
    
    componentDidMount() {
        if (this.props.project !== undefined) {
            this.setState({
                currProject: {
                    _id: this.props.project._id,
                    name: this.props.project.name,
                    slides: this.props.project.slides,
                    timing: this.props.project.timing,
                }
            })
        }
    }

    componentWillReceiveProps() {
        if (this.props.project !== this.state.currProject) {
            this.setState({
                currProject: {
                    _id: this.props.project._id,
                    name: this.props.project.name,
                    slides: this.props.project.slides,
                    timing: this.props.project.timing,
                }
            })
        }
    }

    handleChange = (name,value) => {
        let {currProject} = this.state;
        currProject[name] = value;
        this.setState({currProject: currProject});
    }

    handleSubmit = () => {
        let project = this.state.currProject;

        console.log(project);

        const query = JSON.stringify({
          query: `mutation {
              createScreen(input: { 
                name: "${project.name}",
                slides: ${JSON.stringify(project.slides)},
                timing: ${project.timing},
                doneBy: "5bec460d590441347c352dce"}) {
              _id name doneBy { _id } slides timing
            }
          }
          `
        });


        console.log(
          query
        )
        //If it is a new project
        if (project._id === "") {
            fetch(process.env.REACT_APP_GRAPHQL_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: query,
            })
            .then(res => res.json())
            .then(({data})=> {
            console.log(data);
            this.props.handleQuit();
            })
        } else {
            //call projectUpdate
        }
    }

    addImage = (images) => {
        let project = this.state.currProject;
        project.slides.push(...images)
        this.setState({
            currProject: project,
        })
        console.log(images);
    }

    render() {
        const {currProject} = this.state;

        return (
            <div style={styles.createContainer}>
                <div style={styles.pageContent}>
                    <div style={styles.projectNameInput}><TextField
                        id="projectName"
                        label="Project Name"
                        value={currProject.name}
                        onChange={event => this.handleChange('name', event.target.value)}
                        type="text"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        fullWidth
                        margin="normal"
                    /></div>
                    <div style={styles.projectEditor}>
                        <div style={styles.thumbnailContainer}>
                        {
                            currProject.slides.map((slide,index) => {
                                return <img style={styles.thumbnail} src={slide} alt={slide} key={index}/>
                            })
                        }
                        </div>
                        <div style={styles.uploadContainer}><Upload addImage={this.addImage} /></div>
                    </div>
                    <div style={styles.timerSelect}>
                        <FormControl>
                            <InputLabel htmlFor="timing-helper">Timing</InputLabel>
                            <Select
                                value={currProject.timing}
                                onChange={event => this.handleChange('timing',event.target.value)}
                                input={<Input name="timing" id="timing-helper" />}
                            >
                                <MenuItem value={3}>
                                <em>Default</em>
                                </MenuItem>
                                <MenuItem value={5}>5 Seconds</MenuItem>
                                <MenuItem value={8}>8 Seconds</MenuItem>
                                <MenuItem value={10}>10 Seconds</MenuItem>
                            </Select>
                            <FormHelperText>Default is 3 Seconds</FormHelperText>
                        </FormControl>
                    </div>
                    <div style={styles.buttonContainer}>
                        <Button onClick={this.handleSubmit} variant="outlined" color="primary">
                            Submit
                        </Button>
                        <Button onClick={this.props.handleQuit} variant="outlined" color="secondary">
                            Quit
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

  /*
  Example request for createScreen
  createScreen(input: {
  name: "testScreen",
  timing: "5"
  slides: ["https://www.telegraph.co.uk/content/dam/Pets/spark/royal-canin/happy-puppy.jpg?imwidth=450", "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn"],
  doneBy:"5bec460d590441347c352dce"}) {
    _id
    name
    doneBy {_id}
    slides
    timing
  }

    fetch(`http://localhost:3001/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mutation: `{ createScreen(input: {
        name: "${name}",
        slides: ${should be array of strings},
        // put timing here if you want, it defaults to 3 seconds
        doneBy:"${leave this as `5bec460d590441347c352dce`}"}) {
          _id
          name
          doneBy {_id}
          slides
          timing
        } }` }),
    })
    .then(res => res.json())
    .then(({data})=> {
      console.log(data)
    })

  */

const styles = {
    createContainer: {
        position: "absolute",
        top: 0, bottom: 0, right: 0, left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    pageContent: {
        width: "80%",
        height: "80%",
        marginTop: "50px"
    },
    projectEditor: {
        position: "relative",
        background: "#e3e3e3",
        border: "1px solid grey",
        boxShadow: "0 2px 5px 0",
        height: "250px",
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    projectNameInput: {
        width: "300px",
        marginBottom: "15px",
    },
    thumbnail: {
        width: "200px",
        backgroundSize: "contain",
        margin: "0 5px",
    },
    thumbnailContainer: {
        maxWidth: "calc(100% - 200px)",
        display: "inline-flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "no-wrap",
        overflowX: "scroll",
        padding: "5px",
    },
    uploadContainer: {
        display: "inline-block",
        padding: "0 5px"
    },
    timerSelect: {
        margin: "15px"
    },
}